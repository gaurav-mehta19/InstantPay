"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarAtom } from '@repo/store/sideBar';
import { Menu, Wallet2 } from 'lucide-react';


interface AppBarProps {
    onsignIn: any;
    onsignOut: any;
    user: any;
    variant?: 'landing' | 'dashboard';
    onDemo?: () => void;
    isDemoLoading?: boolean;
}

export const AppBar = ({ onsignIn, onsignOut, user, variant = 'dashboard', onDemo, isDemoLoading }: AppBarProps) => {
    const router = useRouter()
    const pathName = usePathname()
    const hiddenPaths = ["/users/signup", "/users/signin"];
    
    // Hide app bar on auth pages only
    if (pathName && hiddenPaths.includes(pathName)) {
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
                            <Wallet2 className="h-8 w-8 text-primary" />
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
                                    <div className="relative flex flex-col items-center group">
                                        <button 
                                            onClick={onDemo}
                                            disabled={isDemoLoading}
                                            className={`px-6 py-3 text-primary border-2 border-primary rounded-full transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl ${
                                                isDemoLoading 
                                                    ? 'bg-primary/10 cursor-not-allowed opacity-70' 
                                                    : 'hover:bg-primary hover:text-white hover:scale-105 hover:border-primary-600'
                                            }`}
                                        >
                                            {isDemoLoading && (
                                                <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            )}
                                            {isDemoLoading ? 'Loading...' : 'Try Demo'}
                                            {!isDemoLoading && (
                                                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
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
    try {
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
    } catch {
        // Fallback for SSR or when context is not available
        return <button className='p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 group'>
            <Menu className='h-5 w-5 text-primary group-hover:text-white' />
        </button>
    }
}

function OpenSideBarIcon() {
    try {
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
    } catch {
        // Fallback for SSR or when context is not available
        return <button className='p-2 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 group'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-primary group-hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    }
}

function DecideSideBarIcon() {
    try {
        const isSideBarOpen = useRecoilValue(sideBarAtom);
        return isSideBarOpen ? <OpenSideBarIcon /> : <ClosedSideBarIcon />;
    } catch {
        // Fallback for SSR or when context is not available
        return <ClosedSideBarIcon />;
    }
}

function SideBarIconVisibility() {
    const pathName = usePathname()
    const hiddenPaths = ["/", "/users/signup", "/users/signin", "/landing"];
    
    if (pathName && hiddenPaths.includes(pathName)) {
        return null;
    }
    return <DecideSideBarIcon />
}