import prisma from "@repo/db/client";
import type { Prisma, PrismaClient } from "@prisma/client";

type DbClient = PrismaClient | Prisma.TransactionClient;

export class BalanceRepository {
  async ensureBalanceExists(
    userId: string,
    db: DbClient = prisma,
  ): Promise<void> {
    const existing = await db.balance.findUnique({ where: { userId } });
    if (!existing) {
      await db.balance.create({
        data: {
          userId,
          amount: 0,
          locked: 0,
        },
      });
    }
  }

  async findByUserId(userId: string, db: DbClient = prisma) {
    return db.balance.findUnique({ where: { userId } });
  }

  async increment(
    userId: string,
    amountInPaise: number,
    db: DbClient = prisma,
  ): Promise<void> {
    await db.balance.update({
      where: { userId },
      data: {
        amount: {
          increment: amountInPaise,
        },
      },
    });
  }

  async decrement(
    userId: string,
    amountInPaise: number,
    db: DbClient = prisma,
  ): Promise<void> {
    await db.balance.update({
      where: { userId },
      data: {
        amount: {
          decrement: amountInPaise,
        },
      },
    });
  }

  async decrementIfSufficient(
    userId: string,
    amountInPaise: number,
    db: DbClient = prisma,
  ): Promise<boolean> {
    const updated = await db.balance.updateMany({
      where: {
        userId,
        amount: { gte: amountInPaise },
      },
      data: {
        amount: {
          decrement: amountInPaise,
        },
      },
    });

    return updated.count > 0;
  }
}
