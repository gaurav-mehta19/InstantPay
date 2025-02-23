"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarAtom } from '@repo/store/sideBar';
import { Button } from '@repo/ui/button';
import { Menu } from 'lucide-react';
import { WalletMinimal } from 'lucide-react';
import Link from 'next/link';


interface AppBarProps {
    onsignIn: any;
    onsignOut: any;
    user: any
}

export const AppBar = ({ onsignIn, onsignOut, user }: AppBarProps) => {
    const router = useRouter()
    const pathName = usePathname()
    const hiddenPaths = ["/users/signup", "/users/signin"];
    if (hiddenPaths.includes(pathName)) {
        return null;
    }

    return (
        <div className='bg-[#FFFFFF] flex justify-between items-center border-b border-neutral-200'>
            <div className='flex gap-0.5'>
                <button className='flex px-1 ml-3 rounded-lg text-neutral-200' title='Toggle Sidebar'>
                    <SideBarIconVisibility />
                </button>
                <div className='ml-2'>
                <WalletMinimal  className='text-[#1a56db] ml-5 w-8 h-7 mt-1 mr-0.5'/>
                </div>
                <div onClick={() => {window.location.href="/"}} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary mt-0.5">
                    InstantPay
                </div>
            </div>
            <div className='flex gap-3 items-center justify-center m-2'>
                <DecideSideICon/>
                <Button label='Sign up' onClick={() => { router.push('/users/signup') }} className='bg-white text-[#1a56db] text-center w-24 m-1 h-10 rounded-md hover:bg-blue-100 transition-colors duration-100' />
                <Button className='border border-[#1a56db]  text-white text-center w-24 m-1 h-10 bg-[#1a56db] rounded-md hover:bg-[#1a56db]/90 transition-colors duration-100 shadow-2xl mr-20' onClick={user ? onsignOut : onsignIn} label={user ? "Sign out" : "Sign In"} />
            </div>
        </div>
    )
}


function ClosedSideBarIcon() {

    const setIsSideBarOpen = useSetRecoilState(sideBarAtom)

    return <div onClick={() => {
        setIsSideBarOpen(true)
    }}><Menu className='h-8 w-8 text-[#1a56db] '/>
    </div>
}

function OpenSideBarIcon() {

    const setIsSideBarOpen = useSetRecoilState(sideBarAtom)

    return <div onClick={() => {
        setIsSideBarOpen(false)
    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0052FF" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </div>
}

function DecideSideBarIcon() {
    const isSideBarOpen = useRecoilValue(sideBarAtom)
    return isSideBarOpen ? <OpenSideBarIcon /> : <ClosedSideBarIcon />;
}

function SideBarIconVisibility() {
    const pathName = usePathname()

    const hiddenPaths = ["/", "/users/signup", "/users/signin","/landing"];
    if (hiddenPaths.includes(pathName)) {
        return null;
    }
    return <div>
        <DecideSideBarIcon />
    </div>
}

function DecideSideICon(){
    const pathName = usePathname()

    const hiddenPaths = ["/landing"];

    if (hiddenPaths.includes(pathName)) {
        return (
            <div className='flex gap-6 items-center justify-center m-1'>
            <Link href="#features" className="text-gray-500 hover:text-primary transition-colors">Features</Link>
            <Link href="#benefits" className="text-gray-500 hover:text-primary transition-colors">Benefits</Link>
            </div>
        )
    }
    return null
}