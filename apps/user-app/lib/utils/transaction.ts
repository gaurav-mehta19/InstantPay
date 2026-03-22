import { unstable_cache } from "next/cache";
import { getServerSession } from "next-auth/next";
import prisma from "@repo/db/client";
import { NEXT_AUTH } from "../auth";
import { transactionsTag } from "../server/core/cache-tags";
import { TransactionRepository } from "../server/repositories/transaction-repository";

const transactionRepo = new TransactionRepository();
const configuredMaxAge = Number(process.env.WEBHOOK_MAX_PROCESSING_AGE_MINUTES);
const ONRAMP_MAX_PROCESSING_AGE_MINUTES =
  Number.isFinite(configuredMaxAge) && configuredMaxAge > 0
    ? configuredMaxAge
    : 30;

type CachedP2PRow = {
  timeMs: number;
  amount: number;
  status: string;
  id: string;
  toUserId: string;
  fromUserId: string;
  direction: "send" | "receive";
  toUserName: string;
  toUserPhone: string;
};

type CachedOnRampRow = {
  timeMs: number;
  amount: number;
  status: string;
  provider: string;
  id: string;
};

async function getCachedP2PRows(userId: string): Promise<CachedP2PRow[]> {
  return unstable_cache(
    async () => {
      const p2pTransaction = await prisma.p2PTransaction.findMany({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          createdAt: true,
          amount: true,
          status: true,
          fromUserId: true,
          toUserId: true,
          toUser: {
            select: {
              name: true,
              phone: true,
            },
          },
          fromUser: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
      });

      return p2pTransaction.map((t) => {
        const isCurrentUserSender = t.fromUserId === userId;
        const otherUser = isCurrentUserSender ? t.toUser : t.fromUser;

        return {
          timeMs: t.createdAt.getTime(),
          amount: t.amount,
          status: t.status,
          id: t.id,
          toUserId: t.toUserId,
          fromUserId: t.fromUserId,
          direction: isCurrentUserSender
            ? ("send" as const)
            : ("receive" as const),
          toUserName: otherUser?.name || "Unknown",
          toUserPhone: otherUser?.phone || "Unknown",
        };
      });
    },
    ["transactions", "p2p", userId],
    { revalidate: 20, tags: [transactionsTag(userId)] },
  )();
}

async function getCachedOnRampRows(userId: string): Promise<CachedOnRampRow[]> {
  return unstable_cache(
    async () => {
      await transactionRepo.expireStaleOnRampTransactions({
        userId,
        maxAgeMinutes: ONRAMP_MAX_PROCESSING_AGE_MINUTES,
      });

      const transaction = await prisma.onRampTransaction.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return transaction.map((t) => ({
        timeMs: t.createdAt.getTime(),
        amount: t.amount,
        status: t.status,
        provider: t.provider,
        id: t.id,
      }));
    },
    ["transactions", "onramp", userId],
    { revalidate: 20, tags: [transactionsTag(userId)] },
  )();
}

export async function getP2Ptransaction() {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  const rows = await getCachedP2PRows(userId);
  return rows.map((row) => ({
    ...row,
    time: new Date(row.timeMs),
  }));
}

export async function getTransaction() {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  const rows = await getCachedOnRampRows(userId);
  return rows.map((row) => ({
    ...row,
    time: new Date(row.timeMs),
  }));
}
