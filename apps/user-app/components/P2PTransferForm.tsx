"use client";
import React, { memo, useState, useCallback } from "react";
import { IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { p2pTransfer } from "../lib/actions/p2pTeransfer";

interface P2PTransferFormProps {
  onTransferSuccess?: () => void;
}

export const P2PTransferForm = memo<P2PTransferFormProps>(({ onTransferSuccess }) => {
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

        if (data.amount < 1) {
            toast.dismiss(loadingToastId);
            toast.warning("Amount must be greater than 0");
            return;
        }

        try {
            const response = await p2pTransfer(data.phone, data.amount * 100);
            
            toast.dismiss(loadingToastId);

            if (response?.message) {
                toast.success(response.message);
                setData({ phone: '', amount: 0 });
                onTransferSuccess?.();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.dismiss(loadingToastId);
            toast.error("Transfer failed. Please try again.");
        }
    }, [data.phone, data.amount, onTransferSuccess]);

    return (
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
    );
});

P2PTransferForm.displayName = 'P2PTransferForm';