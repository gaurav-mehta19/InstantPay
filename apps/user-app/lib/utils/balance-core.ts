import { unstable_cache } from "next/cache";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth/next";
import { NEXT_AUTH } from "../auth";
import { balanceTag, transactionsTag } from "../server/core/cache-tags";

async function getCachedBalance(userId: string): Promise<number> {
  return unstable_cache(
    async () => {
      const balance = await prisma.balance.findUnique({
        where: { userId },
      });

      return balance ? balance.amount : 0;
    },
    ["balance", userId],
    { revalidate: 15, tags: [balanceTag(userId)] },
  )();
}

async function getLiveBalance(userId: string): Promise<number> {
  const balance = await prisma.balance.findUnique({
    where: { userId },
  });

  return balance ? balance.amount : 0;
}

type CachedBalanceHistoryPoint = {
  timeMs: number;
  amount: number;
};

async function getCachedBalanceHistory(
  userId: string,
): Promise<CachedBalanceHistoryPoint[]> {
  return unstable_cache(
    async () => {
      const currentBalance = await prisma.balance.findUnique({
        where: { userId },
      });

      const actualBalance = currentBalance ? currentBalance.amount / 100 : 0;

      const onRampTransactions = await prisma.onRampTransaction.findMany({
        where: {
          userId,
          status: "Success",
        },
        select: {
          amount: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const p2pTransactions = await prisma.p2PTransaction.findMany({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
          status: "Success",
        },
        select: {
          amount: true,
          createdAt: true,
          fromUserId: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const p2pTransactionMap = new Map<
        string,
        { timeMs: number; amount: number }
      >();

      p2pTransactions.forEach((t) => {
        const timestamp = t.createdAt.getTime();
        const amount = Math.abs(t.amount);
        const transferKey = `${timestamp}_${amount}`;

        if (!p2pTransactionMap.has(transferKey)) {
          const userIsSender = t.fromUserId === userId;
          p2pTransactionMap.set(transferKey, {
            timeMs: timestamp,
            amount: userIsSender ? -(t.amount / 100) : t.amount / 100,
          });
        }
      });

      const allTransactions = [
        ...onRampTransactions.map((t) => ({
          timeMs: t.createdAt.getTime(),
          amount: t.amount / 100,
        })),
        ...Array.from(p2pTransactionMap.values()),
      ];

      const uniqueTransactions = allTransactions.sort(
        (a, b) => a.timeMs - b.timeMs,
      );

      if (uniqueTransactions.length === 0) {
        return [{ timeMs: Date.now(), amount: actualBalance }];
      }

      let runningBalance = 0;
      const balanceHistory: CachedBalanceHistoryPoint[] = [];

      uniqueTransactions.forEach((transaction) => {
        runningBalance += transaction.amount;
        balanceHistory.push({
          timeMs: transaction.timeMs,
          amount: Math.round(runningBalance * 100) / 100,
        });
      });

      const lastCalculatedEntry = balanceHistory[balanceHistory.length - 1];
      if (
        lastCalculatedEntry &&
        Math.abs(lastCalculatedEntry.amount - actualBalance) > 0.01
      ) {
        balanceHistory.push({
          timeMs: Date.now(),
          amount: actualBalance,
        });
      }

      return balanceHistory;
    },
    ["balance-history", userId],
    { revalidate: 30, tags: [balanceTag(userId), transactionsTag(userId)] },
  )();
}

async function getLiveBalanceHistory(
  userId: string,
): Promise<CachedBalanceHistoryPoint[]> {
  const currentBalance = await prisma.balance.findUnique({
    where: { userId },
  });

  const actualBalance = currentBalance ? currentBalance.amount / 100 : 0;

  const onRampTransactions = await prisma.onRampTransaction.findMany({
    where: {
      userId,
      status: "Success",
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const p2pTransactions = await prisma.p2PTransaction.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
      status: "Success",
    },
    select: {
      amount: true,
      createdAt: true,
      fromUserId: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const p2pTransactionMap = new Map<string, { timeMs: number; amount: number }>();

  p2pTransactions.forEach((t) => {
    const timestamp = t.createdAt.getTime();
    const amount = Math.abs(t.amount);
    const transferKey = `${timestamp}_${amount}`;

    if (!p2pTransactionMap.has(transferKey)) {
      const userIsSender = t.fromUserId === userId;
      p2pTransactionMap.set(transferKey, {
        timeMs: timestamp,
        amount: userIsSender ? -(t.amount / 100) : t.amount / 100,
      });
    }
  });

  const allTransactions = [
    ...onRampTransactions.map((t) => ({
      timeMs: t.createdAt.getTime(),
      amount: t.amount / 100,
    })),
    ...Array.from(p2pTransactionMap.values()),
  ];

  const uniqueTransactions = allTransactions.sort((a, b) => a.timeMs - b.timeMs);

  if (uniqueTransactions.length === 0) {
    return [{ timeMs: Date.now(), amount: actualBalance }];
  }

  let runningBalance = 0;
  const balanceHistory: CachedBalanceHistoryPoint[] = [];

  uniqueTransactions.forEach((transaction) => {
    runningBalance += transaction.amount;
    balanceHistory.push({
      timeMs: transaction.timeMs,
      amount: Math.round(runningBalance * 100) / 100,
    });
  });

  const lastCalculatedEntry = balanceHistory[balanceHistory.length - 1];
  if (
    lastCalculatedEntry &&
    Math.abs(lastCalculatedEntry.amount - actualBalance) > 0.01
  ) {
    balanceHistory.push({
      timeMs: Date.now(),
      amount: actualBalance,
    });
  }

  return balanceHistory;
}

export async function getBalance(options?: { bypassCache?: boolean }) {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;

  if (!session?.user?.id) {
    throw new Error("User not authenticated.");
  }

  if (options?.bypassCache) {
    return getLiveBalance(session.user.id);
  }

  return getCachedBalance(session.user.id);
}

export async function getBalanceHistory(options?: { bypassCache?: boolean }) {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;

  if (!session?.user?.id) {
    return [];
  }

  const rows = options?.bypassCache
    ? await getLiveBalanceHistory(session.user.id)
    : await getCachedBalanceHistory(session.user.id);

  return rows.map((row) => ({
    date: new Date(row.timeMs),
    amount: row.amount,
  }));
}
