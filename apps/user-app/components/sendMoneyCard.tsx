"use client";
import React, { memo, useState, useCallback } from "react";
import { toast } from "sonner";
import { p2pTransfer } from "../lib/actions/p2pTeransfer";
import { IndianRupee, Send } from "lucide-react";

export const SendMoneyCard = memo(() => {
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
        const value = Number(e.target.value) || 0;
        setData(prev => ({ ...prev, amount: value }));
    }, []);

    const setQuickAmount = useCallback((amount: number) => {
        setData(prev => ({ ...prev, amount }));
    }, []);

    const handleSendMoney = useCallback(async () => {
        if (data.phone.trim().length < 10) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }

        if (data.amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        const loadingToastId = toast.loading("Sending money...");

        try {
            const response = await p2pTransfer(data.phone, data.amount * 100);
            
            toast.dismiss(loadingToastId);

            if (response?.message) {
                toast.success(response.message);
                setData({ phone: '', amount: 0 });
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.dismiss(loadingToastId);
            toast.error("Transfer failed. Please try again.");
        }
    }, [data.phone, data.amount]);

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 hover:shadow-hover transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-br from-accent-pink to-accent-coral rounded-2xl mr-4">
                    <Send className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-neutral-800">Send Money</h2>
                    <p className="text-neutral-600">Transfer money instantly</p>
                </div>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
                {/* Phone Number Input */}
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <input
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={data.phone}
                            onChange={handlePhoneChange}
                            maxLength={10}
                            className="w-full pl-12 pr-4 py-4 text-lg font-medium border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white"
                        />
                    </div>
                </div>

                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">Amount</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <IndianRupee className="h-5 w-5 text-neutral-500" />
                        </div>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={data.amount || ''}
                            onChange={handleAmountChange}
                            className="w-full pl-12 pr-4 py-4 text-lg font-medium border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-accent-pink focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white"
                            min="1"
                        />
                    </div>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">Quick Send</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[100, 500, 1000].map((quickAmount) => (
                            <button
                                key={quickAmount}
                                onClick={() => setQuickAmount(quickAmount)}
                                className="py-3 px-4 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-xl hover:bg-accent-pink hover:text-white transition-all duration-300 hover:scale-105"
                            >
                                ₹{quickAmount}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Send Money Button */}
                <button
                    onClick={handleSendMoney}
                    disabled={!data.phone || !data.amount}
                    className="w-full py-4 px-6 bg-gradient-to-r from-accent-pink to-accent-coral text-white font-semibold text-lg rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    Send Money
                    <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>

                {/* Security Notice */}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-accent-pink/5 to-accent-coral/5 rounded-2xl border border-accent-pink/10 mt-auto">
                    <div className="p-2 bg-gradient-to-br from-accent-pink to-accent-coral rounded-xl">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-neutral-700">Instant Transfer</p>
                        <p className="text-xs text-neutral-600">Money reaches instantly with zero fees</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

SendMoneyCard.displayName = 'SendMoneyCard';