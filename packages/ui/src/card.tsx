import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ title, children, className }: CardProps) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="px-6 py-3 border-b border-neutral-200">
        <h3 className="text-xl font-semibold text-[#1a56db]">{title}</h3>
      </div>
      <div className={cn('p-6', className)}>
        {children}
      </div>
    </div>
  );
}

