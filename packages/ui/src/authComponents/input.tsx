"use client"

import { ChangeEventHandler } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps {
    label: string;
    type?: string;
    placeholder: string;
    maxLength?:number;
    value?:string      
    onChange: ChangeEventHandler<HTMLInputElement>;
    Icon?: LucideIcon;
}



export const PhoneInput = ({ label,Icon, type, placeholder, maxLength, value, onChange }: InputProps) => {
    return (
        <div className="relative">
            <div className="text-[#OADBOD] text-lg font-normal">{label}</div>
            <div className="relative">
            {Icon &&  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />}
                <span className="absolute text-gray-500 left-0 top-1/2 transform -translate-y-1/2 text-[#OADBOD] text-md px-2.5">+91</span>
                <input
                    type={type || "text"}
                    value={value}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className="h-10 w-96 py-4 pl-[44px] pr-3 mt-2 mb-2 text-[#OADBOD] bg-[#FFFFFF] border-neutral-200 border rounded-md text-left outline-none"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};



export const Input = ({label,type,placeholder,Icon,value,onChange}:InputProps) =>{
    return <div>
        <div className="text-[#OADBOD] text-lg font-normal">
            {label}
        </div>
        <div className="relative">
            {Icon &&  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />}
                 <input type={type||"text"} value={value} className="h-10 w-96 py-3 px-10 mt-1.5 mb-2 text-[#OADBOD] bg-[#FFFFFF] border-neutral-200 border rounded-md text-left outline-none " placeholder={placeholder} onChange={onChange} />
        </div>
       
    </div>
}

