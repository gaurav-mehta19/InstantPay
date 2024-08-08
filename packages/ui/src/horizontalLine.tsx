interface HorizontalLineProps {
    label?: string;
}

export const HorizontalLine = ({label}: HorizontalLineProps) => {
    return (
        <div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-96 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-[#0f0f10] left-1/2 dark:text-white">{label}</span>
                </div>
        </div>
       
    )
}

