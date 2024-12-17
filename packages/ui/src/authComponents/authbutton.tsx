"use client";

interface ButtonProps {
  label: string;
  img?: string;
  className?: string;
  onClick: () => void;
}

export const PrimaryButton = ({ label, onClick }: ButtonProps) => {
  return (
    <button className="border border-neutral-200 bg-[#0052FF] text-white text-center w-96 h-10 mt-3 rounded-lg hover:bg-[#336DFF] transition-colors duration-300 shadow-2xl font-medium" onClick={onClick}>
      {label}
    </button>
  );
}
