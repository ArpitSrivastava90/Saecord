"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ButtonForm = ({
  type = "button",
  isLoading = false,
  disabled = false,
  children,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        "h-11 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md font-semibold shadow-md hover:from-cyan-600 hover:to-blue-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition duration-300 disabled:opacity-70",
        className
      )}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
