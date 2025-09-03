"use client";
import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "lg",
  className,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "btn inline-block text-center font-semibold rounded-lg transition cursor-pointer border w-full max-w-md";

  const variants: Record<string, string> = {
    primary:
      "bg-[#153060] text-white border-transparent hover:bg-[#00C0FD] hover:text-white",
    secondary:
      "bg-gray-200 text-gray-800 border-gray-200 hover:bg-gray-300 hover:text-gray-900",
    outline:
      "bg-transparent text-[#153060] border-[#153060] hover:bg-[#153060] hover:text-white",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
