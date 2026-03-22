import React from "react";
import { cn } from "./cn";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ className, ...props }, ref) {
    return (
      <input ref={ref} className={cn("input-field", className)} {...props} />
    );
  },
);
