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

    const onRampTransactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: session.user.id,
            status: "Success"
        },
        select: {
            amount: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const p2pTransactions = await prisma.p2PTransaction.findMany({
        where: {
            OR: [
                { fromUserId: session.user.id },
            ],
            status: "Success"
        },
        select: {
            amount: true,
            createdAt: true,
            fromUserId: true,
            toUserId: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const allTransactions = [
        ...onRampTransactions.map(t => ({
            date: t.createdAt,
            amount: t.amount / 100,
            type: 'onramp'
        })),
        ...p2pTransactions.map(t => ({
            date: t.createdAt,
            amount: t.amount / 100,
            type: 'p2p'
        }))
    ].sort((a, b) => a.date.getTime() - b.date.getTime());

    let runningBalance = 0;
    const balanceHistory: { date: Date; amount: number }[] = [];

    allTransactions.forEach(transaction => {
        runningBalance += transaction.amount;
        balanceHistory.push({
            date: transaction.date,
            amount: runningBalance
        });
    });

    return balanceHistory.length > 0 ? balanceHistory : [{ date: new Date(), amount: 0 }];
}
