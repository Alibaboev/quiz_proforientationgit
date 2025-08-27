"use client";
import React from "react";

interface ProgressBarProps {
  current: number; 
  total: number;   
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div
        className="bg-[#00C0FD] h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
