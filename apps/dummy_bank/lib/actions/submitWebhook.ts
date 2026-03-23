"use server";

import { createHmac } from "crypto";
import axios from "axios";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const timeoutMs = Number(process.env.BANK_WEBHOOK_TIMEOUT_MS ?? 60_000);
  const retryCount = Number(process.env.BANK_WEBHOOK_RETRY_COUNT ?? 2);
  const retryDelayMs = Number(process.env.BANK_WEBHOOK_RETRY_DELAY_MS ?? 2_500);

  const signature = createHmac("sha256", webhookSecret)
    .update(`${command.token}:${command.userId}:${command.amountInPaise}`)
    .digest("hex");

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    try {
      await axios.post(
        webhookUrl,
        {
          token: command.token,
          user_identifier: command.userId,
          amount: command.amountInPaise,
        },
        {
          timeout: timeoutMs,
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
        await sleep(retryDelayMs);
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
