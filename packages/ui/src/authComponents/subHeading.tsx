"use client";
import { useRouter } from 'next/navigation';

interface SubHeadingProps {
    label: string;
    to: string;
    onclicktext: string;
}

export const SubHeading = ({label,to,onclicktext}:SubHeadingProps) => {
    const router = useRouter();
    return (
        <div className='font-sans flex gap-2 text-[#OADBOD] text-base mb-6'>
            <div>
                {label}
            </div>
            <div className='hover:underline' onClick={()=>{
                router.push(to)
            }}>
                {onclicktext}
            </div>

        </div>
    )
}