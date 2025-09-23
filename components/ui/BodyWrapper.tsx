"use client";

import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { useQuiz } from "@/context/QuizContext";

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  const { role } = useQuiz();

  const backgroundClass = clsx(
    "min-h-screen flex flex-col font-sans antialiased",
    {
      "bg-gradient-to-b from-[#DFF5FF] to-[#B9E6FF]": role === "student",
      "bg-[url('/images/expert-bg.jpg')] bg-cover bg-center": role === "expert",
      "bg-background": !role,
    },
    fontSans.className
  );

  return <div className={backgroundClass}>{children}</div>;
}
