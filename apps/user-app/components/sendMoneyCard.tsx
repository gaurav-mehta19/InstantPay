"use client";
import React, { memo, useState, useCallback } from "react";
import { toast } from "sonner";
import { p2pTransfer } from "../lib/actions/p2pTeransfer";
import { useRouter } from "next/navigation";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Send Money Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Send Money</h2>
                        <p className="text-sm text-gray-600">Transfer funds instantly</p>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Recipient Phone Number
                        </label>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={handlePhoneChange}
                                maxLength={10}
                                placeholder="Enter recipient's phone number"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                            <input
                                type="number"
                                value={data.amount || ''}
                                onChange={(e) => setData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                                placeholder="Enter amount to send"
                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Quick Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Quick Select
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {[100, 500, 1000, 2000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setData(prev => ({ ...prev, amount }))}
                                    className="py-2 px-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                    ₹{amount}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={handleTransfer}
                        className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                    >
                        <span>Send Money</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Choose P2P Transfer?</h3>
                </div>

                <div className="space-y-4">
                    {/* Instant Transfer */}
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900">Instant Transfer</h4>
                            <p className="text-gray-600">Money reaches recipient in seconds</p>
                        </div>
                    </div>

                    {/* Zero Fees */}
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900">Zero Fees</h4>
                            <p className="text-gray-600">No charges for P2P transfers</p>
                        </div>
                    </div>

                    {/* Secure & Safe */}
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900">Secure & Safe</h4>
                            <p className="text-gray-600">Bank-grade security for all transfers</p>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900">Secure Transaction</h4>
                            <p className="text-sm text-gray-600">All transfers are encrypted and protected by advanced security measures</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

SendMoneyCard.displayName = 'SendMoneyCard';