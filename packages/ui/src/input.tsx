import { ChangeEvent } from "react";

interface InputProps {
    label: string;
    type?: string;
    placeholder: string;
    className?: string;
    value:string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Input = ({label,type,placeholder,value,onChange}:InputProps) =>{
    return <div>
        <div className="text-neutral-200 text-lg font-normal">
            {label}
        </div>
        <input type={type||"text"} value={value} className="h-10 w-96 pt-4 pb-4 pl-3 pr-3 mt-1 mb-2 text-neutral-100 bg-[#0f0f10] border-neutral-700 border rounded-md text-left outline-none " placeholder={placeholder} onChange={onChange} />
    </div>
}