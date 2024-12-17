
import prisma from "@repo/db/client"
import { AddMoney } from "../../../components/addMoneyCard"
import { BalanceCard } from "../../../components/balanceCard"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../../../lib/auth"
import { P2pTransaction } from "../../../components/p2pTransaction"



async function getBalance() {
    const session = await getServerSession(NEXT_AUTH)

    const balance = await prisma.balance.findUnique({
        where: {
            userId: session?.user?.id
        }
    })

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}



async function getP2Ptransaction() { 
    const session = await getServerSession(NEXT_AUTH);

    // Fetch P2P transactions where fromUserId matches the current user's id
    const p2pTransaction = await prisma.p2PTransaction.findMany({
        where: {
                 fromUserId: session?.user?.id ,
                 
        },
        orderBy: {
            createdAt: 'desc', // Order by most recent first
        },
        take: 5,
        select: {
            id: true,
            createdAt: true,
            amount: true,
            status: true,
            fromUserId: true,
            toUserId: true,
            toUser:{
                select:{
                    name:true,
                    phone:true
                }
            },
            direction: true,
        },

        
    });


    return p2pTransaction.map(t => {
        return {
            time: t.createdAt,
            amount: t.amount,
            status: t.status,
            id: t.id,
            toUserId:t.toUserId,
            fromUserId: t.fromUserId,
            direction:t.direction,
            toUserName: t.toUser?.name,
            toUserPhone: t.toUser?.phone,
        };
    });
}

export default async function Dashboard() {
    const balance = await getBalance()
    const transaction = await getP2Ptransaction() 

    return (
        <div className="w-screen h-screen bg-[#FFFFFF]">
            <div>
                <div className="grid grid-cols-10 gap-3 mt-6">
                    <div className="col-start-2 col-span-4">
                        <AddMoney />
                    </div>
                    <div className="col-start-6 col-span-3">
                        <BalanceCard amount={balance.amount} locked={balance.locked} />
                    </div>
                </div>
                <div className="grid grid-cols-10 mt-3">
                    <div className="col-start-2 col-span-7">
                    <P2pTransaction transaction={transaction}></P2pTransaction>
                    </div>
                </div>
            </div>
        </div>
    )
}


