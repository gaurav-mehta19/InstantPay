"use client"
import { useEffect, useState } from "react"
import { createOnRampTransaction } from "../lib/actions/createOnRamp"
import { toast } from "sonner"


const SUPPORTED_BANKS = [{
    name: "Choose Bank",
    redirectUrl: "instant-pay-user-app.vercel.app/dashboard"
}, {
    name: "HDFC Bank",
    redirectUrl: "https://instant-pay-dummy-bank.vercel.app/"
}, {
    name: "Axis Bank",
    redirectUrl: "https://instant-pay-dummy-bank.vercel.app/"
}]


export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState("")
    const [amount, setAmount] = useState(0)
    const [provider, setProvider] = useState("Choose Bank")

    useEffect(() => {
        setAmount(0); // Reset amount when component mounts
        setProvider("Choose Bank");
      }, [location.pathname]);


    function handleOnSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedBank = SUPPORTED_BANKS.find(x => x.name === e.target.value)
        if (selectedBank) {
            setProvider(selectedBank.name)
            setRedirectUrl(selectedBank.redirectUrl)
        }
    }

    async function handleAddMoney() {
        if (amount <= 0) {
            toast.error("Please enter a valid amount")
            return
        }
        if (provider === "Choose Bank") {
            toast.error("Please select a bank")
            return
        }
        try {
           const { token } = await createOnRampTransaction(amount * 100, provider)
           const safeRedirectUrl = redirectUrl ?? "http://localhost:3000/dashboard"

           if (typeof token !== 'string') {
               throw new Error("Invalid token received")
           }

           const redirectWithToken = `${safeRedirectUrl}?token=${encodeURIComponent(token)}`

            window.location.href = redirectWithToken

        } catch (err) {
            console.error(err)
            toast.error("An error occurred while adding money")
        }
    }

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 hover:shadow-hover transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-br from-accent-emerald to-accent-teal rounded-2xl mr-4">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-neutral-800">Add Money</h2>
                    <p className="text-neutral-600">Fund your wallet instantly</p>
                </div>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">Amount</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-neutral-500 text-lg">₹</span>
                        </div>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount || ''}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-4 text-lg font-medium border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white"
                        />
                    </div>
                </div>

                {/* Bank Selection */}
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">Select Bank</label>
                    <div className="relative">
                        <select
                            value={provider}
                            onChange={handleOnSelect}
                            className="w-full px-4 py-4 text-lg font-medium border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white appearance-none cursor-pointer"
                        >
                            {SUPPORTED_BANKS.map((bank) => (
                                <option key={bank.name} value={bank.name}>
                                    {bank.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">Quick Add</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[500, 1000, 2000].map((quickAmount) => (
                            <button
                                key={quickAmount}
                                onClick={() => setAmount(quickAmount)}
                                className="py-3 px-4 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                            >
                                ₹{quickAmount}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Money Button */}
                <button
                    onClick={handleAddMoney}
                    className="w-full py-4 px-6 bg-gradient-to-r from-accent-emerald to-accent-teal text-white font-semibold text-lg rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                    Add Money to Wallet
                    <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>

                {/* Security Notice */}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100 mt-auto">
                    <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-neutral-700">Secure Transaction</p>
                        <p className="text-xs text-neutral-600">256-bit SSL encryption protects your data</p>
                    </div>
                </div>
            </div>
        </div>
    )
}