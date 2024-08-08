interface HeadingProps {  
    label: string;
}
export const Heading = ({label}:HeadingProps) =>{
    return (
        <div className="font-medium text-5xl text-neutral-200">{label}</div>
    )
}