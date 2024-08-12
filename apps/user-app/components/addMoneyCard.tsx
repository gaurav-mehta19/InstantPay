"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"



const SUPPORTED_BANKS = [{
    name:"Choose Bank",
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
        <div>
            <Card title="Add Money">
                <TextInput label="Amount" placeHolder="Amount" onChange={()=>{alert("hi")}}/>
                <div>
                    Bank
                </div>
                <Select onSelect={(e) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x=>x.name===e.target.value)?.redirectUrl||"")
                }} options={SUPPORTED_BANKS.map(x=>({
                    key:x.name,
                    value:x.name,
                }))}/>
                <div>
                    <Button className="border border-red-500" label="Add Money" onClick={()=>{
                        window.location.href = redirectUrl || ""
                    }
                    }/>
                </div>
            </Card>
        </div>
    )
}