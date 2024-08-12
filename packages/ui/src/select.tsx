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
        <select className="w-96 h-7" onChange={onSelect}>
       {options.map(option => <option value={option.key}>{option.value}</option>)}
        </select>
    )
}