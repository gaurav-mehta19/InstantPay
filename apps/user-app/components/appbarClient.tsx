"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import { Appbar } from "./appbar"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const AppbarClient = () => {
    const session = useSession()
    const router = useRouter()
    return (
        <Appbar onsignIn={signIn} onsignOut={
            async()=>{
                await signOut({redirect: false})
                router.push("/users/signin")
                toast.success("Logged out successfully")}
        } user={session.data?.user}/>
    )
}