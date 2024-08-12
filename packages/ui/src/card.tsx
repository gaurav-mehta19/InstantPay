interface CardProps{
    title:string,
    children?:React.ReactNode,
    className?:string
}

export const Card = ({ title, children ,className}:CardProps) => {
    return (
        <div className="border bg-gray-400 border-white p-4 rounded-xl">
            <div className="p-2 border-b">
                {title}
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )

}