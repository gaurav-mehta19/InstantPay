"use client";

interface ButtonProps {
  label: string;
  img?: string;
  className?: string;
  onClick: () => void;
}

export const PrimaryButton = ({ label, onClick }: ButtonProps) => {
  return (
    <button className="bg-slate-100 border w-96 h-10 text-base font-medium rounded-md mt-4 hover:bg-slate-300" onClick={onClick}>
      {label}
    </button>
  );
}
