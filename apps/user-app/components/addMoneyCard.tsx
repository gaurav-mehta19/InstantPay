"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { createOnRampTransaction } from "../lib/actions/createOnRamp"


const SUPPORTED_BANKS = [{
    name: "Choose Bank",
    redirectUrl: "http://localhost:3000/dashboard"
}, {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com"
}]


export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState("")
    const [amount, setAmount] = useState(0)
    const [provider, setProvider] = useState("null")
    return (
        <div className="text-neutral-400">
            <Card title="Add Money">
                <TextInput label="Amount" placeHolder="Amount" onChange={(e) => { setAmount(Number(e.target.value)) }} />
                <div className="mt-2 p-1 text-neutral-200">
                    Bank
                </div>
                <Select onSelect={(e) => {
                    setProvider(SUPPORTED_BANKS.find(x => x.name === e.target.value)?.name || "")
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === e.target.value)?.redirectUrl || "")
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name,
                }))} />
                <div className="flex justify-center items-center">
                    <Button className="border border-neutral-700 bg-slate-100 text-neutral-700 text-center w-28 h-8 mt-2  rounded-md hover:bg-slate-300 font-semibold" label="Add Money" onClick={async () => {
                       await createOnRampTransaction(amount*100, provider)
                        window.location.href = redirectUrl || ""
                    }
                    } />
                </div>
            </Card>
        </div>
    )
}