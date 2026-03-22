import prisma from "@repo/db/client";
import type { Prisma, PrismaClient } from "@prisma/client";
import type { TransactionStatus } from "../core/transaction-state-machine";

type DbClient = PrismaClient | Prisma.TransactionClient;

export class TransactionRepository {
  async expireStaleOnRampTransactions(
    params: { maxAgeMinutes: number; userId?: string },
    db: DbClient = prisma,
  ) {
    const cutoff = new Date(Date.now() - params.maxAgeMinutes * 60 * 1000);
    return db.onRampTransaction.updateMany({
      where: {
        status: "Processing",
        createdAt: { lt: cutoff },
        ...(params.userId ? { userId: params.userId } : {}),
      },
      data: { status: "Failed" },
    });
  }

  async findOnRampByToken(token: string, db: DbClient = prisma) {
    return db.onRampTransaction.findUnique({ where: { token } });
  }

  async createOnRamp(params: {
    token: string;
    amountInPaise: number;
    provider: string;
    userId: string;
    status: TransactionStatus;
  }) {
    return prisma.onRampTransaction.create({
      data: {
        token: params.token,
        amount: params.amountInPaise,
        provider: params.provider,
        userId: params.userId,
        status: params.status,
      },
    });
  }

  async updateOnRampStatus(
    token: string,
    status: TransactionStatus,
    db: DbClient = prisma,
  ) {
    return db.onRampTransaction.update({
      where: { token },
      data: { status },
    });
  }

  async findP2PByTransferKey(transferKey: string, db: DbClient = prisma) {
    return db.p2PTransaction.findUnique({ where: { transferKey } });
  }

  async createP2P(
    params: {
      fromUserId: string;
      toUserId: string;
      amountInPaise: number;
      status: TransactionStatus;
      transferKey: string;
    },
    db: DbClient = prisma,
  ) {
    return db.p2PTransaction.create({
      data: {
        fromUserId: params.fromUserId,
        toUserId: params.toUserId,
        amount: params.amountInPaise,
        status: params.status,
        transferKey: params.transferKey,
      },
    });
  }
}
