"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { p2pTransfer } from "../lib/actions/p2pTeransfer"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { PhoneInput , Input } from "@repo/ui/input"
import { IndianRupee } from "lucide-react"

export const SendMoneyCard = () => {
    const router = useRouter()
    const [data, setData] = useState({
        phone: '',
        amount:0
    })

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = e.target.value.replace(/\D/g, ''); 
        if (phoneValue.length <= 10) {
            setData({ ...data, phone: phoneValue });
        }
    }

    async function handleTransfer() {
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
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Left Column - Send Money Form */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 hover:shadow-hover transition-all duration-300">
                <div className="flex items-center mb-8">
                    <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl mr-4">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-800">Send Money</h2>
                        <p className="text-neutral-600">Transfer funds instantly</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Phone Input */}
                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-3">Recipient Phone Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={handlePhoneChange}
                                maxLength={10}
                                placeholder="Enter recipient's phone number"
                                className="w-full pl-12 pr-4 py-4 text-lg border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white"
                            />
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-3">Amount</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <IndianRupee className="h-5 w-5 text-neutral-400" />
                            </div>
                            <input
                                type="number"
                                value={data.amount || ''}
                                onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
                                placeholder="Enter amount to send"
                                className="w-full pl-12 pr-4 py-4 text-lg border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white"
                            />
                        </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-3">Quick Select</label>
                        <div className="grid grid-cols-4 gap-3">
                            {[100, 500, 1000, 2000].map((quickAmount) => (
                                <button
                                    key={quickAmount}
                                    onClick={() => setData({ ...data, amount: quickAmount })}
                                    className="py-3 px-4 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                                >
                                    ₹{quickAmount}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={handleTransfer}
                        className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                    >
                        Send Money
                        <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-2xl font-bold text-neutral-800 mb-6">Why Choose P2P Transfer?</h3>
                    
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-gradient-to-br from-accent-emerald to-accent-teal rounded-xl">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-neutral-800">Instant Transfer</h4>
                                <p className="text-neutral-600">Money reaches recipient in seconds</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-gradient-to-br from-accent-pink to-accent-coral rounded-xl">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-neutral-800">Zero Fees</h4>
                                <p className="text-neutral-600">No charges for P2P transfers</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-neutral-800">Secure & Safe</h4>
                                <p className="text-neutral-600">Bank-grade security for all transfers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
                    <div className="flex items-start space-x-3">
                        <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-neutral-700">Secure Transaction</h4>
                            <p className="text-sm text-neutral-600">All transfers are encrypted and protected by advanced security measures</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}