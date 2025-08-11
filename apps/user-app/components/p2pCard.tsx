"use client";
import React, { memo } from "react";
import { P2PTransferForm } from "./P2PTransferForm";
import { P2PBenefits } from "./P2PBenefits";

export const P2pCard = memo(() => {
    return (
        <div className="space-y-8">
            <P2PTransferForm />
            <P2PBenefits />
            
            {/* Security Notice */}
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-neutral-800 mb-1">Security Notice</h4>
                        <p className="text-sm text-neutral-600">
                            Always verify the recipient's phone number before sending money. 
                            Money transferred cannot be reversed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

P2pCard.displayName = 'P2pCard';