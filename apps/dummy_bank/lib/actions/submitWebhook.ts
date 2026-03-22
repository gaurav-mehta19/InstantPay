"use server";

import { createHmac } from "crypto";
import axios from "axios";

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

  const signature = createHmac("sha256", webhookSecret)
    .update(`${command.token}:${command.userId}:${command.amountInPaise}`)
    .digest("hex");

  try {
    await axios.post(
      webhookUrl,
      {
        token: command.token,
        user_identifier: command.userId,
        amount: command.amountInPaise,
      },
      {
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
    if (axios.isAxiosError(error)) {
      return {
        ok: false,
        message: `Webhook failed with status ${error.response?.status ?? "unknown"}`,
      };
    }

    return {
      ok: false,
      message: "Webhook failed",
    };
  }
}
