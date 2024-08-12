interface ButtonProps {
    label: string,
    className?: string,
    onClick: () => void;
}

export const Button = ({ label, className, onClick }: ButtonProps) => {
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    )
}