"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"



const SUPPORTED_BANKS = [{
    name:"Choose Bank",
    redirectUrl:"http://localhost:3000/dashboard"
},{
    name:"HDFC Bank",
    redirectUrl:"https://netbanking.hdfcbank.com"
},{
    name:"Axis Bank",
    redirectUrl:"https://www.axisbank.com"
}]


export const AddMoney = () => {
    const [redirectUrl,setRedirectUrl] = useState("")
    return (
        <div className="text-neutral-400">
            <Card title="Add Money">
                <TextInput label="Amount" placeHolder="Amount" onChange={()=>{alert("hi")}}/>
                <div className="mt-2 p-1 text-neutral-200">
                    Bank
                </div>
                <Select onSelect={(e) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x=>x.name===e.target.value)?.redirectUrl||"")
                }} options={SUPPORTED_BANKS.map(x=>({
                    key:x.name,
                    value:x.name,
                }))}/>
                <div className="flex justify-center items-center">
                    <Button className="border border-neutral-700 bg-slate-100 text-neutral-700 text-center w-28 h-10 mt-2  rounded-md hover:bg-slate-300" label="Add Money" onClick={()=>{
                        window.location.href = redirectUrl || ""
                    }
                    }/>
                </div>
            </Card>
        </div>
    )
}