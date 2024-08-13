"use client"

import { ChangeEventHandler } from "react"

interface SelectProps{
    options:{
        key:string,
        value:string,
    }[],
    onSelect: ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({options,onSelect}:SelectProps) => {
    return (
        <select className="w-full h-10 border border-neutral-700 bg-[#18181a] rounded-lg p-1 mb-2 outline-none" onChange={onSelect}>
       {options.map(option => <option key={option.key} value={option.value}>{option.value}</option>)}
        </select>
    )
}