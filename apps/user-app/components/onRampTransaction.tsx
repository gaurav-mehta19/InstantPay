"use client"

import React, { memo, useMemo, useCallback } from "react";
import { FixedSizeList } from 'react-window';

interface OnrampTransactionProps {
    transaction: {
        time: Date,
        amount: number,
        status: string,
        provider: string,
        id: string
    }[]
}

export const OnrampTransaction = memo<OnrampTransactionProps>(({ transaction }) => {
    if (!transaction.length) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8">
                <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-br from-accent-emerald to-accent-teal rounded-2xl mr-4">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-800">Bank Transactions</h2>
                        <p className="text-neutral-600">Your wallet funding history</p>
                    </div>
                </div>
                
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="p-6 bg-gradient-to-br from-accent-emerald/10 to-accent-teal/10 rounded-full mb-6">
                        <svg className="h-12 w-12 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">No Bank Transactions Yet</h3>
                    <p className="text-neutral-600 text-center">Add money from your bank account to see your funding history here.</p>
                </div>
            </div>
        );
    }

    const getStatusBgColor = useCallback((status: string) => {
        switch (status.toLowerCase()) {
            case "success":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "fail":
                return "bg-red-50 text-red-700 border-red-200"; 
            case "processing":
                return "bg-yellow-50 text-yellow-700 border-yellow-200"; 
            default:
                return "bg-neutral-50 text-neutral-700 border-neutral-200"; 
        }
    }, []);

    const getProviderIcon = useCallback((provider: string) => {
        return (
            <svg className="h-6 w-6 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
        );
    }, []);

    // Row renderer for virtualized list
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const t = transaction[index];
        if (!t) return null;
        
        const date = new Date(t.time);
        const formattedDate = `${date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        })} • ${date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })}`;
        
        return (
            <div style={{ ...style, paddingBottom: '16px' }}>
                <div className="p-8 bg-gradient-to-r from-accent-emerald/5 to-accent-teal/5 rounded-2xl border border-accent-emerald/10 hover:shadow-md transition-all duration-300 animate-fade-in">
                    <div className="flex items-center justify-between">
                        {/* Transaction Info */}
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-br from-accent-emerald/10 to-accent-teal/10 rounded-2xl">
                                {getProviderIcon(t.provider)}
                            </div>
                            
                            <div>
                                <div className="font-semibold text-neutral-800 text-lg">
                                    Money Added
                                </div>
                                <div className="text-sm text-neutral-600">
                                    From: {t.provider}
                                </div>
                                <div className="text-xs text-neutral-500">
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                        
                        {/* Status and Amount */}
                        <div className="text-right">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBgColor(t.status)} mb-2`}>
                                {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                            </div>
                            <div className="text-xl font-bold text-accent-emerald">
                                + ₹{t.amount / 100}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8">
            <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-accent-emerald to-accent-teal rounded-2xl mr-4">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-neutral-800">Bank Transactions</h2>
                    <p className="text-neutral-600">{transaction.length} recent transactions</p>
                </div>
            </div>
            
            <div className="pr-2">
                <FixedSizeList
                    height={500}
                    itemCount={transaction.length}
                    itemSize={150}
                    width="100%"
                    className="scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100"
                >
                    {Row}
                </FixedSizeList>
            </div>
        </div>
    );
});

OnrampTransaction.displayName = 'OnrampTransaction';