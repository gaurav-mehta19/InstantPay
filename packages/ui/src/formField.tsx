import React from "react";
import { cn } from "./cn";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
};

export function FormField({
  label,
  htmlFor,
  className,
  labelClassName,
  children,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={cn("label", labelClassName)}>
        {label}
      </label>
      {children}
    </div>
  );
}
