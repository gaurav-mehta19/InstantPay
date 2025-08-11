"use client";
import React, { memo } from "react";

export const P2PBenefits = memo(() => {
    return (
        <div className="bg-gradient-to-br from-accent-pink/5 to-accent-coral/5 rounded-3xl border border-accent-pink/10 p-8">
            <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-accent-pink/20 to-accent-coral/20 rounded-2xl mr-4">
                    <svg className="h-8 w-8 text-accent-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-neutral-800">Why Choose P2P Transfer?</h3>
                    <p className="text-neutral-600">Fast, secure, and convenient</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent-emerald rounded-full flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-neutral-800">Instant Transfer</h4>
                        <p className="text-sm text-neutral-600">Money reaches instantly</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent-emerald rounded-full flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-neutral-800">Zero Fees</h4>
                        <p className="text-sm text-neutral-600">No hidden charges</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent-emerald rounded-full flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-neutral-800">24/7 Available</h4>
                        <p className="text-sm text-neutral-600">Send money anytime</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent-emerald rounded-full flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-neutral-800">Secure</h4>
                        <p className="text-sm text-neutral-600">Bank-level security</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

P2PBenefits.displayName = 'P2PBenefits';