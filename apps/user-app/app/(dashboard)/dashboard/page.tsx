
import prisma from "@repo/db/client"
import { AddMoney } from "../../../components/addMoneyCard"
import { BalanceCard } from "../../../components/balanceCard"
import { OnrampTransaction } from "../../../components/onRampTransaction"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../../../lib/auth"



async function getBalance() {
    const session = await getServerSession(NEXT_AUTH)
    
    const balance = await prisma.balance.findFirst({
        where: {
            userId: session?.user?.id
        }
    })

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}


async function getTransaction() {
    const session = await getServerSession(NEXT_AUTH)
    const transaction = await prisma.onRampTransaction.findMany({
        where: {
            userId: session?.user?.id
        },
        orderBy: {
            createdAt: 'desc', // Order by most recent first
        },
        take: 8, // Limit to the last 5 transactions
    })

    return transaction.map(t => ({
        time: t.createdAt,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function Dashboard() {
    const balance = await getBalance()
    const transaction = await getTransaction()

    return (
        <div className="w-screen h-screen bg-[#0f0f10]">
            <div className="grid grid-cols-8">
                <div className="text-white text-center text-4xl mt-4 col-start-2">
                    Dashboard
                </div>
            </div>
            <div className="grid grid-cols-10 gap-2 mt-8">
                <div className="col-start-2 col-span-3">
                    <div className="flex flex-col gap-2"> 
                         <AddMoney />
                         <BalanceCard amount={balance.amount} locked={balance.locked} />
                    </div>
                   
                </div>
                <div className="col-start-auto col-span-5">
                <OnrampTransaction transaction={transaction} />
                </div>
            </div>
        </div>
    )
}


