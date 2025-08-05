"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AppBar } from "./appB";

export default function AppBarClient() {
    const session = useSession()
    const router = useRouter()
    
    const handleDemo = async () => {
        const loadingToastId = toast.loading("Signing in as Test User");
        try {
            const res = await signIn('credentials', {
                phone: process.env.NEXT_PUBLIC_PHONE,
                password: process.env.NEXT_PUBLIC_PASSWORD,
                redirect: false
            })

            toast.dismiss(loadingToastId);

            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success("Signed in Test User");
                router.push('/dashboard');
            }
        } catch (err) {
            console.log("Demo signin error ", err);
            toast.dismiss(loadingToastId);
            toast.error("An error occurred during demo signin. Please try again");
        }
    }
    
    return (
        <AppBar 
            onsignIn={signIn} 
            onsignOut={async () => {
                await signOut({redirect: false})
                router.push("/users/signin")
                toast.success("Logged out successfully")
            }} 
            user={session.data?.user}
            onDemo={handleDemo}
        />
    )
}