import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";

export async function getBalance() {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user?.id) {
        throw new Error("User not authenticated.");
    }

    const userId = session.user.id;

    const balance = await prisma.balance.findUnique({
        where: { userId },
    });

    return balance ? balance.amount : 0;
}

export async function getBalanceHistory() {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user?.id) {
        return [];
    }

    // Get current actual balance and all transactions in parallel
    const [currentBalance, onRampTransactions, p2pTransactions] = await Promise.all([
        prisma.balance.findUnique({
            where: { userId: session.user.id },
            select: { amount: true }
        }),
        prisma.onRampTransaction.findMany({
            where: {
                userId: session.user.id,
                status: "Success"
            },
            select: {
                id: true,
                amount: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'asc' }
        }),
        prisma.p2PTransaction.findMany({
            where: {
                OR: [
                    { fromUserId: session.user.id },
                    { toUserId: session.user.id }
                ],
                status: "Success"
            },
            select: {
                amount: true,
                createdAt: true,
                fromUserId: true,
            },
            orderBy: { createdAt: 'asc' }
        })
    ]);

    const actualBalance = currentBalance ? currentBalance.amount / 100 : 0;

    if (onRampTransactions.length === 0 && p2pTransactions.length === 0) {
        return [{ date: new Date(), amount: actualBalance }];
    }

    // Create unified transaction array with simplified logic
    const transactions: Array<{ date: Date; amount: number }> = [];

    // Add OnRamp transactions
    onRampTransactions.forEach(t => {
        transactions.push({
            date: t.createdAt,
            amount: t.amount / 100
        });
    });

    // Add P2P transactions (simplified - no complex deduplication)
    p2pTransactions.forEach(t => {
        const isOutgoing = t.fromUserId === session.user.id;
        transactions.push({
            date: t.createdAt,
            amount: isOutgoing ? -(t.amount / 100) : (t.amount / 100)
        });
    });

    // Sort by date
    transactions.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Calculate running balance
    let runningBalance = 0;
    const balanceHistory = transactions.map(transaction => {
        runningBalance += transaction.amount;
        return {
            date: transaction.date,
            amount: Math.round(runningBalance * 100) / 100
        };
    });

    // Ensure current balance accuracy
    if (balanceHistory.length > 0) {
        const lastEntry = balanceHistory[balanceHistory.length - 1];
        if (lastEntry && Math.abs(lastEntry.amount - actualBalance) > 0.01) {
            balanceHistory.push({
                date: new Date(),
                amount: actualBalance
            });
        }
    }

    return balanceHistory;
}
