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
        <div className='font-sans flex gap-1 text-secondary-dark text-md mb-6'>
            <div>
                {label}
            </div>
            <div className='hover:underline text-primary' onClick={()=>{
                router.push(to)
            }}>
                {onclicktext}
            </div>

        </div>
    )
}