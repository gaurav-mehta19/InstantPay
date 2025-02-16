"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { p2pTransfer } from "../lib/actions/p2pTeransfer"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { PhoneInput , Input } from "@repo/ui/input"



export const P2pCard = () => {
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

    return (
        <div className="flex justify-center items-center w-screen h-screen">
        <Card title="P2P Transfer" className="h-80 w-full text-[#OADBOD] mt-6">
            <div className="flex flex-col gap-4">
            <PhoneInput value={data.phone} maxLength={10} onChange={handlePhoneChange} label="Phone Number" placeholder="000-000-0000" />
            <Input onChange={(e) => setData({ ...data, amount:Number(e.target.value)})} label="Amount" placeholder="Enter your amount" />
            </div>
            <div className="flex justify-center items-center mt-4">
            <Button     onClick={async () => {
        const loadingToastId = toast.loading("Transferring...");

        try {
            const response = await p2pTransfer(data.phone, data.amount * 100);
            
            toast.dismiss(loadingToastId);

            if (response?.message) {
                toast.success(response.message);
            } else {
                toast.error("Something went wrong");
            }

            if (response.message === "Transaction successful") {
                router.push('/dashboard');
            }
        } catch (error) {
            toast.dismiss(loadingToastId);
            toast.error("An error occurred during the transfer");
        }
    }}
    className="border border-neutral-700 bg-[#1a56db] text-white text-base w-96 h-10 mt-2.5 rounded-md hover:bg-[#336DFF] transition-colors duration-300 shadow-2xl font-medium" label="Send Money" />
            </div>
        </Card>
        </div>
    )
}