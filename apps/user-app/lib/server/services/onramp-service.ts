import { createHash, randomBytes } from "crypto";
import { Money } from "../core/money";
import { err, ok, type Result } from "../core/result";
import { onRampInputSchema, type OnRampInput } from "../schemas/transaction";
import { TransactionRepository } from "../repositories/transaction-repository";
import { BankProviderResolver } from "../strategies/bank-provider-strategy";

export type OnRampError =
  | "UNAUTHENTICATED"
  | "INVALID_INPUT"
  | "UNSUPPORTED_PROVIDER"
  | "INTERNAL_ERROR";

export class OnRampService {
  constructor(
    private readonly transactionRepo = new TransactionRepository(),
    private readonly providerResolver = new BankProviderResolver(),
  ) {}

  async createTransaction(
    userId: string | undefined,
    input: OnRampInput,
  ): Promise<Result<{ token: string; message: string }, OnRampError>> {
    if (!userId) {
      return err("UNAUTHENTICATED");
    }

    const parsed = onRampInputSchema.safeParse(input);
    if (!parsed.success) {
      return err("INVALID_INPUT");
    }

    const normalizedProvider = this.providerResolver.resolve(
      parsed.data.provider,
    );
    if (!normalizedProvider) {
      return err("UNSUPPORTED_PROVIDER");
    }

    try {
      const safeAmount = Money.fromPaise(parsed.data.amountInPaise);
      const token = this.buildToken(userId, parsed.data.idempotencyKey);

      const existing = await this.transactionRepo.findOnRampByToken(token);
      if (existing) {
        return ok({
          token,
          message:
            "On Ramp Transaction already exists for this idempotency key",
        });
      }

      await this.transactionRepo.createOnRamp({
        token,
        amountInPaise: safeAmount.paise,
        provider: normalizedProvider,
        userId,
        status: "Processing",
      });

      return ok({
        token,
        message: "On Ramp Transaction created",
      });
    } catch {
      return err("INTERNAL_ERROR");
    }
  }

  private buildToken(userId: string, idempotencyKey?: string): string {
    if (!idempotencyKey) {
      return randomBytes(32).toString("hex");
    }

    return createHash("sha256")
      .update(`${userId}:${idempotencyKey}`)
      .digest("hex");
  }
}
