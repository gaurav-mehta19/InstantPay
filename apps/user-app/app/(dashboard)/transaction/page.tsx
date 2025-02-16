import { getServerSession } from 'next-auth';
import React from 'react';
import { NEXT_AUTH } from '../../../lib/auth';
import prisma from '@repo/db/client';

import { P2pTransaction } from '../../../components/p2pTransaction';
import { OnrampTransaction } from '../../../components/onRampTransaction';

export async function getP2Ptransaction() { 
    const session = await getServerSession(NEXT_AUTH);

    // Fetch P2P transactions where fromUserId matches the current user's id
    const p2pTransaction = await prisma.p2PTransaction.findMany({
        where: {
                 fromUserId: session?.user?.id ,       
        },
        orderBy: {
            createdAt: 'desc', // Order by most recent first
        },
        take: 8,
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
        provider: t.provider,
        id: t.id
    }))
}

// Main Transaction Page Component
export default async function Transaction() {
    const p2ptransaction = await getP2Ptransaction(); // Fetch and process transactions
    const onRampTransaction = await getTransaction()     

    // Render the transactions
    return (
        <div className='w-screen'>
        <div className="grid grid-cols-10 gap-3 mt-10">
            <div className="col-start-2 col-span-4 min-height-525">
                <P2pTransaction transaction={p2ptransaction} />
            </div>
            <div className="col-start-auto col-span-4">
                <OnrampTransaction transaction={onRampTransaction} />
            </div>
        </div>
        </div>
    );
}
