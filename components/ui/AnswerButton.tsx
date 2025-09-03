"use client";
import React from "react";
import clsx from "clsx";

type AnswerButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function AnswerButton({
  children,
  onClick,
  className,
  disabled = false,
}: AnswerButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "border-2 border-gray-200 rounded-lg bg-gray-50 transition-colors hover:border-[#00C0FD] hover:bg-gray-100 w-full p-4 text-left font-medium",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
