"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-[#9ca3af] uppercase tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg bg-[#13131a] border border-[#252530]",
            "text-[#ece8e1] placeholder:text-[#52525b]",
            "focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655]",
            "transition-colors duration-200",
            "text-base",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
