
import React from 'react';
import dynamicImport from 'next/dynamic';
import { getP2Ptransaction, getTransaction } from '../../../lib/utils/transaction';

// Dynamic import transaction components
const P2pTransaction = dynamicImport(() => import('../../../components/p2pTransaction').then(module => ({ default: module.P2pTransaction })), {
  loading: () => (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 animate-pulse">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gray-200 rounded-2xl mr-3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="space-y-4">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: false
});

const OnrampTransaction = dynamicImport(() => import('../../../components/onRampTransaction').then(module => ({ default: module.OnrampTransaction })), {
  loading: () => (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 animate-pulse">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gray-200 rounded-2xl mr-3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="space-y-4">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: false
});

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
