"use client"

import { ChangeEventHandler } from "react";

interface InputProps {
    label: string;
    type?: string;
    placeholder: string;
    maxLength?:number;
    value?:string      
    onChange: ChangeEventHandler<HTMLInputElement>;
}



export const PhoneInput = ({ label, type, placeholder, maxLength, value, onChange }: InputProps) => {
    return (
        <div className="relative">
            <div className="text-[#OADBOD] text-lg font-normal">{label}</div>
            <div className="relative">
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#OADBOD] text-md pb-1 px-3">+91</span>
                <input
                    type={type || "text"}
                    value={value}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className="h-10 w-96 pt-4 pb-4 pl-12 pr-3 mt-1 mb-2 text-[#OADBOD] bg-[#FFFFFF] border-neutral-200 border rounded-md text-left outline-none"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};



export const Input = ({label,type,placeholder,value,onChange}:InputProps) =>{
    return <div>
        <div className="text-[#OADBOD] text-lg font-normal">
            {label}
        </div>
        <input type={type||"text"} value={value} className="h-10 w-96 pt-4 pb-4 pl-3 pr-3 mt-1.5 mb-2 text-[#OADBOD] bg-[#FFFFFF] border-neutral-200 border rounded-md text-left outline-none " placeholder={placeholder} onChange={onChange} />
    </div>
}

