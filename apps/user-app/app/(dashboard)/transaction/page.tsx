import { getServerSession } from 'next-auth';
import React from 'react';
import { NEXT_AUTH } from '../../../lib/auth';
import prisma from '@repo/db/client';

import { P2pTransaction } from '../../../components/p2pTransaction';

async function getP2Ptransaction() { 
    const session = await getServerSession(NEXT_AUTH);

    // Fetch P2P transactions where fromUserId matches the current user's id
    const p2pTransaction = await prisma.p2PTransaction.findMany({
        where: {
                 fromUserId: session?.user?.id ,
        },
        select: {
            id: true,
            createdAt: true,
            amount: true,
            status: true,
            fromUserId: true,
            toUserId: true,
            direction: true,
        },
    });

    // Adjust fromUserId and toUserId based on the amount sign
    return p2pTransaction.map(t => {
        return {
            time: t.createdAt,
            amount: t.amount,
            status: t.status,
            id: t.id,
            toUserId:t.toUserId,
            fromUserId: t.fromUserId,
            direction:t.direction
        };
    });
}

// Main Transaction Page Component
export default async function Transaction() {
    const session = await getServerSession(NEXT_AUTH); // Fetch session details
    const transaction = await getP2Ptransaction(); // Fetch and process transactions

    // Render the transactions
    return (
        <div>
            <P2pTransaction 
                transaction={transaction} 
                currentUserId={session?.user?.id} 
            />
        </div>
    );
}
