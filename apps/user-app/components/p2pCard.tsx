"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { p2pTransfer } from "../lib/actions/p2pTeransfer"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export const P2pCard = () => {
    const router = useRouter()
    const [data, setData] = useState({
        phone: '',
        amount:0
    })

    return (
        <div className="flex justify-center items-center w-screen h-screen">
        <Card title="P2P Transfer" className="h-60 w-96 text-gray-400">
            <TextInput onChange={(e)=> setData({...data,phone:e.target.value})} label="Phone Number" placeHolder="Phone Number" />
            <TextInput onChange={(e)=>setData({...data,amount:Number(e.target.value)})} label="Amount" placeHolder="Amount" />
            <div className="flex justify-center items-center mt-4">
            <Button onClick={async()=>{
                await p2pTransfer(data.phone,data.amount*100)
                toast.success("Transfer successful")
                router.push('/dashboard')           
            }} className="border border-neutral-700 bg-slate-100 text-neutral-700 text-center w-28 h-8 mt-2  rounded-md hover:bg-slate-300 font-semibold" label="Send" />
            </div>
        </Card>
        </div>
    )
}