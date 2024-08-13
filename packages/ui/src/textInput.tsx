"use client"

import { ChangeEventHandler } from 'react';

interface TextInputProps{
    label:string,
    placeHolder:string,
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextInput = ({label,placeHolder,onChange}:TextInputProps) => {
    return (
        <div className='bg-[#18181a]'>
            <div className='text-neutral-200 mt-4 p-1'>
                {label}
            </div>
            <input className="w-full h-10 bg-[#18181a] border border-neutral-700 rounded-lg p-2 outline-none" type="text" placeholder={placeHolder} onChange={onChange}/>
        </div>
    )
}