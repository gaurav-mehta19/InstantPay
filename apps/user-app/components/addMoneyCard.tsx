"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textInput"
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
        <div className="text-[#OADBOD]">
            <Card title="Add Money" className="max-h-72">
                <TextInput  label="Amount" placeHolder="Amount" onChange={(e) => { setAmount(Number(e.target.value)) }} />
                <div className="mt-2 p-1 text-[#OADBOD]">
                    Bank
                </div>
                <Select onSelect={handleOnSelect} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name,
                }))} />
                <div className="flex justify-center items-center">
                    <Button className="border border-neutral-200 bg-[#1a56db] text-white text-center w-full h-10 mt-3 rounded-lg hover:bg-[#336DFF] transition-colors duration-300 shadow-2xl font-medium" label="Add Money" onClick={handleAddMoney} />
                </div>
            </Card>
        </div>
    )
}