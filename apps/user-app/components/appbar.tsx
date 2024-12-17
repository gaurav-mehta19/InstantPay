"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarAtom } from '@repo/store/sideBar';
import { Button } from '@repo/ui/button';


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
                <button className='flex px-1 ml-3 rounded-lg text-neutral-200'>
                    <SideBarIconVisibility />
                </button>
                <div className='ml-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#99B1F3" viewBox="0 0 24 24" strokeWidth={1.5} stroke="" className="size-6 mt-1 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                </div>
                <div onClick={() => { router.push('/landing') }} className='text-2xl font-medium text-[#1a56db]'>
                    InstantPay
                </div>
            </div>
            <div className='flex gap-4 mb-3'>
                <Button label='About' onClick={() => { router.push('/users/signup') }} className='border border-neutral-200 bg-[#1a56db] text-white text-base text-center mt-2 w-28 h-8 rounded-md hover:bg-[#336DFF] transition-colors duration-100 shadow-2xl font-medium' />
                <Button className='border border-[#1a56db] bg-[#FFFFFF] text-[#1a56db] text-center mt-2 w-28 h-8 text-base rounded-md hover:bg-gray-100 transition-colors duration-100 shadow-2xl font-medium mr-8' onClick={user ? onsignOut : onsignIn} label={user ? "Logout" : "Sign In"} />
            </div>
        </div>
    )
}


function ClosedSideBarIcon() {

    const setIsSideBarOpen = useSetRecoilState(sideBarAtom)

    return <div onClick={() => {
        setIsSideBarOpen(true)
    }}><svg xmlns="http://www.w3.org/2000/svg" fill="#99B1F3" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0052FF" className="size-6 mt-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    </div>
}

function OpenSideBarIcon() {

    const setIsSideBarOpen = useSetRecoilState(sideBarAtom)

    return <div onClick={() => {
        setIsSideBarOpen(false)
    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0052FF" className="size-6 mt-1">
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