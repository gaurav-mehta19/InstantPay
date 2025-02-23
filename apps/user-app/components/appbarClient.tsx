"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AppBar } from "./appBar";

export default function AppBarClient() {
    const session = useSession()
    const router = useRouter()
    return (
        <AppBar onsignIn={signIn} onsignOut={
            async()=>{
                await signOut({redirect: false})
                router.push("/users/signin")
                toast.success("Logged out successfully")}
        } user={session.data?.user}/>
    )
}