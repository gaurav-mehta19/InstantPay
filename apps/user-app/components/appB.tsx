"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarAtom } from '@repo/store/sideBar';
import { Button } from '@repo/ui/button';
import { Menu, Wallet2 } from 'lucide-react';


interface AppBarProps {
    onsignIn: any;
    onsignOut: any;
    user: any;
    variant?: 'landing' | 'dashboard';
    onDemo?: () => void;
}

export const AppBar = ({ onsignIn, onsignOut, user, variant = 'dashboard', onDemo }: AppBarProps) => {
    const router = useRouter()
    const pathName = usePathname()
    const hiddenPaths = ["/users/signup", "/users/signin"];
    
    // Hide app bar on auth pages only
    if (hiddenPaths.includes(pathName)) {
        return null;
    }
    
    // Determine variant based on path if not explicitly set
    const isLandingPage = pathName === "/" || pathName === "/landing";
    const currentVariant = isLandingPage ? 'landing' : variant;

    return (
        <nav className="relative z-20 bg-white/80 backdrop-blur-md border-b border-primary-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-6">
                        {currentVariant === 'dashboard' && <SideBarIconVisibility />}
                        <div className="flex items-center space-x-2 group">
                            <Wallet2 className="h-8 w-8 text-primary animate-bounce-gentle" />
                            <span 
                                onClick={() => { window.location.href = "/" }} 
                                className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
                            >
                                InstantPay
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        {currentVariant === 'landing' && (
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#features" className="text-neutral-600 hover:text-primary transition-colors duration-300">Features</a>
                                <a href="#benefits" className="text-neutral-600 hover:text-primary transition-colors duration-300">Benefits</a>
                                <a href="#security" className="text-neutral-600 hover:text-primary transition-colors duration-300">Security</a>
                            </div>
                        )}
                        
                        {user ? (
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="text-xs text-neutral-600">Welcome back!</p>
                                        <p className="text-sm font-medium text-neutral-800">{user.name || 'User'}</p>
                                    </div>
                                </div>
                                <button 
                                    className='px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transition-all duration-300 font-medium' 
                                    onClick={onsignOut}
                                >
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {currentVariant === 'landing' && onDemo && (
                                    <button 
                                        onClick={onDemo}
                                        className="px-4 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium"
                                    >
                                        Try Demo
                                    </button>
                                )}
                                {currentVariant === 'dashboard' && (
                                    <button
                                        onClick={() => { router.push('/users/signup') }}
                                        className='px-4 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-medium'
                                    >
                                        Signup
                                    </button>
                                )}
                                <button 
                                    className='px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transition-all duration-300 font-medium' 
                                    onClick={onsignIn}
                                >
                                    Sign In
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}


function ClosedSideBarIcon() {
    const setIsSideBarOpen = useSetRecoilState(sideBarAtom);

    return <button 
        onClick={() => {
            console.log('Opening sidebar');
            setIsSideBarOpen(true);
        }}
        className='p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 group'
    >
        <Menu className='h-5 w-5 text-primary group-hover:text-white' />
    </button>
}

function OpenSideBarIcon() {
    const setIsSideBarOpen = useSetRecoilState(sideBarAtom);

    return <button 
        onClick={() => {
            console.log('Closing sidebar');
            setIsSideBarOpen(false);
        }}
        className='p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 group'
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-primary group-hover:text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
}

function DecideSideBarIcon() {
    const isSideBarOpen = useRecoilValue(sideBarAtom);
    return isSideBarOpen ? <OpenSideBarIcon /> : <ClosedSideBarIcon />;
}

function SideBarIconVisibility() {
    const pathName = usePathname()
    const hiddenPaths = ["/", "/users/signup", "/users/signin", "/landing"];
    
    if (hiddenPaths.includes(pathName)) {
        return null;
    }
    return <DecideSideBarIcon />
}