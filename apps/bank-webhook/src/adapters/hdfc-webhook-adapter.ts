import type { Request } from "express";
import { err, ok, type Result } from "../core/result";
import { parseWebhookPayload } from "../schemas/webhook";

export type AdaptWebhookError = "INVALID_PAYLOAD";

export interface HdfcWebhookCommand {
  token: string;
  userId: string;
  amountInPaise: number;
  signature: string | undefined;
  idempotencyKey: string;
}

export class HdfcWebhookAdapter {
  adapt(req: Request): Result<HdfcWebhookCommand, AdaptWebhookError> {
    const payload = parseWebhookPayload(req.body);
    if (!payload) {
      return err("INVALID_PAYLOAD");
    }

    const signatureHeader = req.header("x-webhook-signature") ?? undefined;
    const idempotencyKey = req.header("x-idempotency-key") ?? payload.token;

    return ok({
      token: payload.token,
      userId: payload.userId,
      amountInPaise: payload.amountInPaise,
      signature: signatureHeader,
      idempotencyKey,
    });
  }
}
