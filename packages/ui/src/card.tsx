interface CardProps{
    title:string,
    children?:React.ReactNode,
    className?:string
}

export const Card = ({ title, children ,className}:CardProps) => {
    return (
        <div className="border p-4 rounded-lg bg-[#18181a]  border-neutral-700">
            <div className="p-2 border-b-2 border-neutral-600  text-neutral-200 text-3xl font-semibold">
                {title}
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )

}