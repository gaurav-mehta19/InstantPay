
import prisma from "@repo/db/client"
import { AddMoney } from "../../../components/addMoneyCard"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../../../lib/auth"
// import { P2pTransaction } from "../../../components/p2pTransaction"
import { BalanceCard } from "../../../components/balanceCard"
import { BalanceChart } from "../../../components/garph"

export async function getBalance() {
    const session = await getServerSession(NEXT_AUTH);

    // Ensure session exists and has a user ID
    if (!session?.user?.id) {
        throw new Error("User not authenticated.");
    }

    const userId = session.user.id;

    const balance = await prisma.balance.findUnique({
        where: { userId },
    });

    // If no balance record exists, return 0 balance
    return balance ? balance.amount : 0;
}


async function getBalanceHistory() {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user?.id) {
        return [];
    }

    // Get all successful onramp transactions
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

    // Get all successful P2P transactions
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

    // Combine onramp transactions
    const allTransactions = [
        ...onRampTransactions.map(t => ({
            date: t.createdAt,
            amount: t.amount / 100,
            type: 'onramp'
        })),
        ...p2pTransactions.map(t => ({
            date: t.createdAt,
            amount: t.amount/100,
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
    // If no transactions exist, return an empty balance history
    if (balanceHistory.length === 0) {
        return [{ date: new Date(), amount: 0 }]; // Start with the current date
    }

    return balanceHistory;
}
export default async function Dashboard() {
    const balance = await getBalance()
    const balanceHistory = await getBalanceHistory()


    return (
        <div className="w-screen h-screen bg-[#FFFFFF]">
            <div>
                <div className="grid grid-cols-10 gap-3 mt-6">
                    <div className="col-start-3 col-span-3">
                        <AddMoney />
                    </div>
                    <div className="col-start-6 col-span-3">
                        <BalanceCard amount={balance} locked={0} />
                    </div>
                </div>
                <div className="grid grid-cols-10 mt-3">
                    <div className="col-start-3 col-span-6">
                        <BalanceChart data={balanceHistory}></BalanceChart>
                    </div>
                </div>
            </div>
        </div>
    )
}


