"use client";
import React, { memo, useState, useCallback } from "react";
import { toast } from "sonner";
import { p2pTransfer } from "../lib/actions/p2pTeransfer";
import { useRouter } from "next/navigation";
import { IndianRupee } from "lucide-react";

export const SendMoneyCard = memo(() => {
    const router = useRouter();
    const [data, setData] = useState({
        phone: '',
        amount: 0
    });

    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = e.target.value.replace(/\D/g, ''); 
        if (phoneValue.length <= 10) {
            setData(prev => ({ ...prev, phone: phoneValue }));
        }
    }, []);

    const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setData(prev => ({ ...prev, amount: value }));
    }, []);

    const handleTransfer = useCallback(async () => {
        const loadingToastId = toast.loading("Transferring...");
        
        if (data.phone.trim().length < 1) {
            toast.dismiss(loadingToastId);
            toast.warning("Please fill Phone Number");
            return;
        }

        if(data.amount < 1){
            toast.dismiss(loadingToastId);
            toast.warning("Amount must be greater than 0")
            return;
        }

        try {
            const response = await p2pTransfer(data.phone, data.amount * 100);
            
            toast.dismiss(loadingToastId);

            if (response?.message) {
                toast.success(response.message);
            } else {
                toast.error("Something went wrong");
            }

            if (response.message === "Transaction successful") {
                setData({ phone: '', amount: 0 });
                router.push('/dashboard');
            }
        } catch (error) {
            toast.dismiss(loadingToastId);
            toast.error("An error occurred during the transfer");
        }
    }, [data, router]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Send Money Form */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8">
                <div className="flex items-center mb-8">
                    <div className="p-3 bg-gradient-to-br from-accent-pink to-accent-coral rounded-2xl mr-4">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-800">Send Money</h2>
                        <p className="text-neutral-600">Transfer money to friends & family</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={handlePhoneChange}
                            placeholder="Enter 10-digit mobile number"
                            className="w-full p-4 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                            maxLength={10}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Amount (₹)
                        </label>
                        <div className="relative">
                            <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
                            <input
                                type="number"
                                value={data.amount || ''}
                                onChange={handleAmountChange}
                                placeholder="Enter amount"
                                className="w-full pl-12 pr-4 py-4 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                min="1"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleTransfer}
                        className="w-full py-4 px-6 bg-gradient-to-r from-accent-pink to-accent-coral text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-pink/20"
                    >
                        Send Money
                    </button>
                </div>
            </div>

            {/* Right Column - Benefits */}
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
        </div>
    );
});

SendMoneyCard.displayName = 'SendMoneyCard';