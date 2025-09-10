"use client";

import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  className?: string;
  error?: FieldError;
}

export const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  className,
  error,
}: InputFieldProps) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm text-gray-300 mb-1">
          {label}
        </label>
      )}

      <input
        id={name}
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={cn(
          "h-11 w-full px-3 rounded-md bg-gray-800 text-white outline-none border border-gray-700 focus:border-cyan-500",
          className
        )}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};
