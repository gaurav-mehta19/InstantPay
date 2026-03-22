import prisma from "@repo/db/client";
import { TransactionStateMachine } from "../core/transaction-state-machine";

export class WebhookRepository {
  async processOnRampCapture(params: {
    token: string;
    userId: string;
    amountInPaise: number;
    maxProcessingAgeMinutes: number;
  }) {
    return prisma.$transaction(async (tx) => {
      const transaction = await tx.onRampTransaction.findUnique({
        where: { token: params.token },
      });

      if (!transaction) {
        return { status: "NOT_FOUND" as const };
      }

      if (transaction.status === "Success") {
        return { status: "ALREADY_PROCESSED" as const };
      }

      if (
        !TransactionStateMachine.canTransition(transaction.status, "Success")
      ) {
        return { status: "INVALID_STATE" as const };
      }

      const createdAtMs = transaction.createdAt.getTime();
      const nowMs = Date.now();
      const ageMinutes = (nowMs - createdAtMs) / (1000 * 60);
      if (ageMinutes > params.maxProcessingAgeMinutes) {
        await tx.onRampTransaction.update({
          where: { token: params.token },
          data: { status: "Failed" },
        });
        return { status: "EXPIRED" as const };
      }

      if (
        transaction.userId !== params.userId ||
        transaction.amount !== params.amountInPaise
      ) {
        return { status: "PAYLOAD_MISMATCH" as const };
      }

      await tx.balance.upsert({
        where: { userId: params.userId },
        update: {
          amount: {
            increment: params.amountInPaise,
          },
        },
        create: {
          userId: params.userId,
          amount: params.amountInPaise,
          locked: 0,
        },
      });

      const updated = await tx.onRampTransaction.updateMany({
        where: {
          token: params.token,
          status: "Processing",
        },
        data: {
          status: "Success",
        },
      });

      if (updated.count === 0) {
        return { status: "ALREADY_PROCESSED" as const };
      }

      return { status: "CAPTURED" as const };
    });
  }
}
