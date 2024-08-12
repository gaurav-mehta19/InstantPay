"use client"

import { ChangeEventHandler } from 'react';

interface TextInputProps{
    label:string,
    placeHolder:string,
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextInput = ({label,placeHolder,onChange}:TextInputProps) => {
    return (
        <div>
            <div>
                {label}
            </div>
            <input className="w-96 h-7" type="text" placeholder={placeHolder} onChange={onChange}/>
        </div>
    )
}