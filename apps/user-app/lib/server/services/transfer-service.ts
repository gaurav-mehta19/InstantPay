import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";
import { Money } from "../core/money";
import { err, ok, type Result } from "../core/result";
import {
  transferInputSchema,
  type TransferInput,
} from "../schemas/transaction";
import { BalanceRepository } from "../repositories/balance-repository";
import { TransactionRepository } from "../repositories/transaction-repository";
import { UserRepository } from "../repositories/user-repository";

export type TransferError =
  | "UNAUTHENTICATED"
  | "INVALID_INPUT"
  | "SELF_TRANSFER_NOT_ALLOWED"
  | "USER_NOT_FOUND"
  | "INSUFFICIENT_BALANCE"
  | "INTERNAL_ERROR";

export class TransferService {
  private readonly userRepo: UserRepository;
  private readonly balanceRepo: BalanceRepository;
  private readonly transactionRepo: TransactionRepository;

  constructor(
    userRepo = new UserRepository(),
    balanceRepo = new BalanceRepository(),
    transactionRepo = new TransactionRepository(),
  ) {
    this.userRepo = userRepo;
    this.balanceRepo = balanceRepo;
    this.transactionRepo = transactionRepo;
  }

  async transfer(
    fromUserId: string | undefined,
    input: TransferInput,
  ): Promise<Result<{ message: string }, TransferError>> {
    if (!fromUserId) {
      return err("UNAUTHENTICATED");
    }

    const parsed = transferInputSchema.safeParse(input);
    if (!parsed.success) {
      return err("INVALID_INPUT");
    }

    const recipient = await this.userRepo.findByPhone(parsed.data.toPhone);
    if (!recipient) {
      return err("USER_NOT_FOUND");
    }

    if (recipient.id === fromUserId) {
      return err("SELF_TRANSFER_NOT_ALLOWED");
    }

    const transferKey = this.buildTransferKey(
      fromUserId,
      recipient.id,
      parsed.data.amountInPaise,
      parsed.data.idempotencyKey,
    );

    try {
      await prisma.$transaction(async (tx) => {
        await this.balanceRepo.ensureBalanceExists(recipient.id, tx);
        await this.balanceRepo.ensureBalanceExists(fromUserId, tx);

        const existing = await this.transactionRepo.findP2PByTransferKey(
          transferKey,
          tx,
        );
        if (existing) {
          return;
        }

        const amount = Money.fromPaise(parsed.data.amountInPaise);
        const debited = await this.balanceRepo.decrementIfSufficient(
          fromUserId,
          amount.paise,
          tx,
        );
        if (!debited) {
          throw new Error("INSUFFICIENT_BALANCE");
        }
        await this.balanceRepo.increment(recipient.id, amount.paise, tx);

        await this.transactionRepo.createP2P(
          {
            fromUserId,
            toUserId: recipient.id,
            amountInPaise: amount.paise,
            status: "Success",
            transferKey,
          },
          tx,
        );
      }, { maxWait: 5_000, timeout: 15_000 });

      return ok({ message: "Transaction successful" });
    } catch (error) {
      // Keep detailed error only in server logs for debugging.
      // eslint-disable-next-line no-console
      console.error("P2P transfer failed:", error);
      if (error instanceof Error && error.message === "INSUFFICIENT_BALANCE") {
        return err("INSUFFICIENT_BALANCE");
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2028"
      ) {
        return err("INTERNAL_ERROR");
      }
      return err("INTERNAL_ERROR");
    }
  }

  private buildTransferKey(
    fromUserId: string,
    toUserId: string,
    amountInPaise: number,
    idempotencyKey?: string,
  ): string {
    const key = idempotencyKey ?? `${fromUserId}:${toUserId}:${amountInPaise}`;
    return `transfer:${key}`;
  }
}
