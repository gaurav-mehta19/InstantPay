import { err, ok, type Result } from "../core/result";
import { WebhookRepository } from "../repositories/webhook-repository";
import type { SignatureStrategy } from "../strategies/signature-strategy";

export type ProcessWebhookError =
  | "INVALID_SIGNATURE"
  | "NOT_FOUND"
  | "EXPIRED"
  | "INVALID_STATE"
  | "PAYLOAD_MISMATCH"
  | "INTERNAL_ERROR";

export class WebhookProcessor {
  constructor(
    private readonly repository: WebhookRepository,
    private readonly signatureStrategy: SignatureStrategy,
    private readonly maxProcessingAgeMinutes: number,
  ) {}

  async process(command: {
    token: string;
    userId: string;
    amountInPaise: number;
    signature: string | undefined;
  }): Promise<Result<{ message: string }, ProcessWebhookError>> {
    const validSignature = this.signatureStrategy.verify(
      command,
      command.signature,
    );
    if (!validSignature) {
      return err("INVALID_SIGNATURE");
    }

    try {
      const result = await this.repository.processOnRampCapture({
        token: command.token,
        userId: command.userId,
        amountInPaise: command.amountInPaise,
        maxProcessingAgeMinutes: this.maxProcessingAgeMinutes,
      });

      switch (result.status) {
        case "NOT_FOUND":
          return err("NOT_FOUND");
        case "EXPIRED":
          return err("EXPIRED");
        case "INVALID_STATE":
          return err("INVALID_STATE");
        case "PAYLOAD_MISMATCH":
          return err("PAYLOAD_MISMATCH");
        case "ALREADY_PROCESSED":
          return ok({ message: "Already processed" });
        case "CAPTURED":
          return ok({ message: "Captured" });
        default:
          return err("INTERNAL_ERROR");
      }
    } catch {
      return err("INTERNAL_ERROR");
    }
  }
}
