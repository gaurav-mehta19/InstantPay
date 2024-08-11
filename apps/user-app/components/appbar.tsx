"use client"
import React from 'react';
import { TertiaryButton } from '@repo/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarAtom } from '@repo/store/sideBar';


interface AppbarProps {
    onsignIn: any;
    onsignOut: any;
    user:any
}

export const Appbar = ({onsignIn , onsignOut,user}:AppbarProps) => {
    const router = useRouter()
    
    return (
        <div className='bg-slate-200 flex justify-between items-center'>
            <div className='flex'>
                <button className='flex px-1 ml-3 rounded-lg '>
                   <SideBarIconVisibility/>
                </button>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                </div>
                <div onClick={()=>{ router.push('/')} } className='text-2xl font-semibold'>
                    InstantPay
                </div>
            </div>
            <div className='flex gap-6 mb-2'>
                <TertiaryButton label='About' onClick={() => { router.push('/users/signup')}} className='w-16 h-8 border border-red-400 rounded-md mt-2'/>
                <TertiaryButton className='border border-red-400 w-20 h-8 mt-2 mr-8  rounded-md' onClick={user? onsignOut:onsignIn} label={user? "Logout":"Sign In"}/> 
            </div>
        </div>
    )
}


function ClosedSideBarIcon(){

    const setIsSideBarOpen = useSetRecoilState(sideBarAtom) 

    return <div onClick={()=>{
        setIsSideBarOpen(true)
    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mt-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</div>
}

function OpenSideBarIcon(){

    const setIsSideBarOpen = useSetRecoilState(sideBarAtom) 

    return <div onClick={()=>{
        setIsSideBarOpen(false)
    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mt-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
  </div>
}

function DecideSideBarIcon(){
    const isSideBarOpen = useRecoilValue(sideBarAtom)
    return isSideBarOpen ? <OpenSideBarIcon /> : <ClosedSideBarIcon />;
}

function SideBarIconVisibility(){
    const pathName = usePathname()

    const hiddenPaths = ["/", "/users/signup", "/users/signin"];
    if (hiddenPaths.includes(pathName)) {
        return null;
    }
    return <div>
        <DecideSideBarIcon/>
    </div>
}