"use client"

import { ChangeEventHandler } from 'react';


interface TextInputProps{
    label:string,
    placeHolder?:string,
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const TextInput = ({label,placeHolder,onChange}:TextInputProps) => {
    return (
        <div className='bg-[#FFFFFF]'>
            <div className='text-[#OADBOD] mt-4 p-1'>
                {label}
            </div>
            <div className='relative'>
            <input className="w-full h-10 bg-[#FFFFFF] border border-neutral-200 rounded-lg p-2 outline-none" type="text" placeholder={placeHolder} onChange={onChange}/>
            </div>
        </div>
    )
}