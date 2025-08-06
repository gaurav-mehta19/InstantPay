
import React from 'react';

import { P2pTransaction } from '../../../components/p2pTransaction';
import { OnrampTransaction } from '../../../components/onRampTransaction';
import { getP2Ptransaction, getTransaction } from '../../../lib/utils/transaction';

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Main Transaction Page Component
export default async function Transaction() {
    const p2ptransaction = await getP2Ptransaction(); // Fetch and process transactions
    const onRampTransaction = await getTransaction()     

    // Render the transactions
    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-md border-b border-primary-100 px-6 py-6 mb-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2 animate-fade-in">
                        Transaction 
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> History</span>
                    </h1>
                    <p className="text-neutral-600 text-lg animate-slide-in-left">
                        View all your recent transactions and transfers
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="animate-slide-in-left">
                        <P2pTransaction transaction={p2ptransaction} />
                    </div>
                    <div className="animate-slide-in-right">
                        <OnrampTransaction transaction={onRampTransaction} />
                    </div>
                </div>
            </div>
        </div>
    );
}
