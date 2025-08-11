
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { getP2Ptransaction, getTransaction } from '../../../lib/utils/transaction';
import { ComponentSkeleton } from '../../../components/skeletons';

// Lazy load transaction components
const P2pTransaction = dynamic(() => import('../../../components/p2pTransaction').then(mod => ({ default: mod.P2pTransaction })), {
  loading: () => <ComponentSkeleton />
});

const OnrampTransaction = dynamic(() => import('../../../components/onRampTransaction').then(mod => ({ default: mod.OnrampTransaction })), {
  loading: () => <ComponentSkeleton />
});

export const dynamicParams = true
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
                        <Suspense fallback={<ComponentSkeleton />}>
                            <P2pTransaction transaction={p2ptransaction} />
                        </Suspense>
                    </div>
                    <div className="animate-slide-in-right">
                        <Suspense fallback={<ComponentSkeleton />}>
                            <OnrampTransaction transaction={onRampTransaction} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
