"use server";

import { createHmac } from "crypto";
import axios from "axios";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const VERCEL_FUNCTION_BUDGET_MS = 9_000;

export async function submitWebhook(command: {
  token: string;
  userId: string;
  amountInPaise: number;
}) {
  const webhookUrl = process.env.BANK_WEBHOOK_URL;
  const webhookSecret = process.env.WEBHOOK_SIGNING_SECRET;

  if (!webhookUrl || !webhookSecret) {
    return {
      ok: false,
      message: "Webhook configuration missing",
    };
  }

  const timeoutMs = Number(process.env.BANK_WEBHOOK_TIMEOUT_MS ?? 2_500);
  const retryCount = Number(process.env.BANK_WEBHOOK_RETRY_COUNT ?? 2);
  const retryDelayMs = Number(process.env.BANK_WEBHOOK_RETRY_DELAY_MS ?? 500);
  const startedAt = Date.now();

  const signature = createHmac("sha256", webhookSecret)
    .update(`${command.token}:${command.userId}:${command.amountInPaise}`)
    .digest("hex");

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const elapsed = Date.now() - startedAt;
    const remainingBudget = VERCEL_FUNCTION_BUDGET_MS - elapsed;
    if (remainingBudget <= 400) {
      return {
        ok: false,
        message:
          "Webhook server is waking up. Please retry once in 5-10 seconds.",
      };
    }

    const requestTimeout = Math.max(
      400,
      Math.min(timeoutMs, remainingBudget - 200),
    );

    try {
      await axios.post(
        webhookUrl,
        {
          token: command.token,
          user_identifier: command.userId,
          amount: command.amountInPaise,
        },
        {
          timeout: requestTimeout,
          headers: {
            "content-type": "application/json",
            "x-webhook-signature": signature,
            "x-idempotency-key": command.token,
          },
        },
      );

      return {
        ok: true,
        message: "Webhook submitted",
      };
    } catch (error) {
      const canRetry =
        attempt < retryCount &&
        axios.isAxiosError(error) &&
        (!error.response || error.response.status >= 500);

      if (canRetry) {
        const elapsedAfterError = Date.now() - startedAt;
        const remainingAfterError = VERCEL_FUNCTION_BUDGET_MS - elapsedAfterError;
        const waitMs = Math.max(
          0,
          Math.min(retryDelayMs, remainingAfterError - 200),
        );
        if (waitMs > 0) {
          await sleep(waitMs);
        }
        continue;
      }

      if (axios.isAxiosError(error)) {
        return {
          ok: false,
          message: `Webhook failed with status ${error.response?.status ?? "timeout"}`,
        };
      }

      return {
        ok: false,
        message: "Webhook failed",
      };
    }
  }

  return {
    ok: false,
    message: "Webhook failed",
  };
}
