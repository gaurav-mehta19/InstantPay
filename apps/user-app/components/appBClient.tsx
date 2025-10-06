"use client";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { AppBar } from "./appB";
import { useDemoContext } from "../contexts/demoContext";

export default function AppBarClient() {
    const session = useSession()
    const router = useRouter()
    const pathname = usePathname()
    
    let isDemoLoading = false;
    let setIsDemoLoading: (loading: boolean) => void = () => {};
    let shouldRedirect = false;
    let setShouldRedirect: (redirect: boolean) => void = () => {};
    
    try {
        const context = useDemoContext();
        isDemoLoading = context.isDemoLoading;
        setIsDemoLoading = context.setIsDemoLoading;
        shouldRedirect = context.shouldRedirect;
        setShouldRedirect = context.setShouldRedirect;
    } catch (error) {
        console.warn('Demo context not available:', error);
    }
    
    // Clear loading state when user is on dashboard and authenticated
    useEffect(() => {
        if (isDemoLoading && session.data?.user && pathname?.startsWith('/dashboard')) {
            // User is authenticated and on dashboard, clear loading state
            const timer = setTimeout(() => {
                console.log('Clearing demo loading state - user on dashboard');
                setIsDemoLoading(false);
                setShouldRedirect(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isDemoLoading, session.data?.user, pathname, setIsDemoLoading, setShouldRedirect])
    
    // Auto-clear loading state after 10 seconds as fallback
    useEffect(() => {
        if (isDemoLoading) {
            const fallbackTimer = setTimeout(() => {
                console.log('Auto-clearing demo loading state after timeout');
                setIsDemoLoading(false);
            }, 10000); // 10 second fallback
            
            return () => clearTimeout(fallbackTimer);
        }
    }, [isDemoLoading, setIsDemoLoading])
    

    
    const handleDemo = async () => {
        setIsDemoLoading(true)
        setShouldRedirect(true)
        try {
            const res = await signIn('credentials', {
                phone: process.env.NEXT_PUBLIC_PHONE,
                password: process.env.NEXT_PUBLIC_PASSWORD,
                redirect: false
            })
            if (res?.error) {
                setIsDemoLoading(false)
                setShouldRedirect(false)
            } else {
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1200);
            }
        } catch (err) {
            console.log("Demo signin error ", err);
            setIsDemoLoading(false)
            setShouldRedirect(false)
        }
    }
    
    return (
        <AppBar 
            onsignIn={signIn} 
            onsignOut={async () => {
                try {
                    // Clear demo loading state before logout
                    setIsDemoLoading(false);
                    await signOut({redirect: false})
                    // Clear any cached data and force full page reload
                    if (typeof window !== 'undefined') {
                        window.location.href = "/landing"
                    }
                    toast.success("Logged out successfully")
                } catch (error) {
                    toast.error("Error during logout")
                    // Fallback: still redirect to clear any cached state
                    if (typeof window !== 'undefined') {
                        window.location.href = "/landing"
                    }
                }
            }} 
            user={(isDemoLoading || shouldRedirect) ? null : session.data?.user}
            onDemo={handleDemo}
            isDemoLoading={isDemoLoading}
        />
    )
}