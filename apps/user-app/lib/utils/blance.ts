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

    // Get current actual balance from the balance table
    const currentBalance = await prisma.balance.findUnique({
        where: { userId: session.user.id },
    });

    const actualBalance = currentBalance ? currentBalance.amount / 100 : 0;

    const onRampTransactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: session.user.id,
            status: "Success"
        },
        select: {
            id: true,
            amount: true,
            createdAt: true,
            userId: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    // Get P2P transactions where user is involved (either sender or receiver)
    const p2pTransactions = await prisma.p2PTransaction.findMany({
        where: {
            OR: [
                { fromUserId: session.user.id },
                { toUserId: session.user.id }
            ],
            status: "Success"
        },
        select: {
            id: true,  // Add ID to prevent duplicates
            amount: true,
            createdAt: true,
            fromUserId: true,
            toUserId: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    const allTransactions = [
        ...onRampTransactions.map(t => ({
            id: `onramp_${t.id}`, // Use database ID for uniqueness
            date: t.createdAt,
            amount: t.amount / 100, // OnRamp adds money
            type: 'onramp' as const,
            description: `Added ₹${(t.amount / 100).toFixed(2)}`,
            rawAmount: t.amount,
            dbId: t.id
        })),
        ...p2pTransactions.map(t => ({
            id: `p2p_${t.id}`, // Use database ID to ensure uniqueness
            date: t.createdAt,
            // If user sent money, it's negative; if received, positive
            amount: t.fromUserId === session.user.id ? -(t.amount / 100) : (t.amount / 100),
            type: 'p2p' as const,
            description: t.fromUserId === session.user.id 
                ? `Sent ₹${(t.amount / 100).toFixed(2)}` 
                : `Received ₹${(t.amount / 100).toFixed(2)}`,
            rawAmount: t.amount,
            direction: t.fromUserId === session.user.id ? 'out' : 'in',
            dbId: t.id
        }))
    ];

    // Remove duplicates by ID and sort chronologically
    const uniqueTransactions = Array.from(
        new Map(allTransactions.map(t => [t.id, t])).values()
    ).sort((a, b) => a.date.getTime() - b.date.getTime());

    if (uniqueTransactions.length === 0) {
        return [{ date: new Date(), amount: actualBalance }];
    }

    // Debug: Log all transactions to understand the issue
    console.log('🔍 Debug Transactions for user:', session.user.id);
    console.log('📊 OnRamp transactions:', onRampTransactions.length);
    console.log('💸 P2P transactions:', p2pTransactions.length);
    console.log('🔄 Unique transactions:', uniqueTransactions.length);
    
    uniqueTransactions.forEach((tx, i) => {
        console.log(`${i + 1}. ${tx.type.toUpperCase()}: ${tx.amount > 0 ? '+' : ''}${tx.amount} - ${tx.description}`);
        console.log(`   📅 Date: ${tx.date.toISOString()}`);
        console.log(`   🆔 Unique ID: ${tx.id}`);
        console.log(`   💾 DB ID: ${tx.dbId || tx.id}`);
        if (tx.type === 'p2p') {
            console.log(`   🔄 Direction: ${tx.direction} | Raw: ₹${tx.rawAmount / 100}`);
        }
        console.log('---');
    });

    let runningBalance = 0;
    const balanceHistory: { date: Date; amount: number }[] = [];

    uniqueTransactions.forEach((transaction, index) => {
        runningBalance += transaction.amount;
        const newBalance = Math.round(runningBalance * 100) / 100;
        
        console.log(`💰 Balance after transaction ${index + 1}: ${newBalance}`);
        
        balanceHistory.push({
            date: transaction.date,
            amount: newBalance
        });
    });

    // Ensure the last balance matches the actual current balance
    const lastCalculatedEntry = balanceHistory[balanceHistory.length - 1];

    // By checking for lastCalculatedEntry first, we assure TypeScript it's not undefined.
    if (lastCalculatedEntry && Math.abs(lastCalculatedEntry.amount - actualBalance) > 0.01) {
        // Add a correction entry if there's a discrepancy
        balanceHistory.push({
            date: new Date(),
            amount: actualBalance
        });
    }

    return balanceHistory;
}
