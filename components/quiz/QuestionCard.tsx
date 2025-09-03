import React, { useState } from "react";
import { Card } from "@nextui-org/card";
import { Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import clsx from "clsx";

type QuestionCardProps = {
  cardData: {
    id: number;
    question: string;
    answers?: string[]; 
    options?: { id: number; answer: string; tags?: string[] }[];
  };
  clickHandler?: (questionId: number, optionId: number) => void;
  outerWrapperClass?: string;
};

export default function QuestionCard({
  cardData,
  clickHandler,
  outerWrapperClass,
}: QuestionCardProps) {
  const [activeButton, setActiveButton] = useState<null | number>(null);

  const handleClick = (optionId: number) => {
    setActiveButton(optionId);
    if (clickHandler) {
      clickHandler(cardData.id, optionId);
    }
  };

  // 👇 определяем список опций
  const items =
    cardData.options?.map((opt) => ({ id: opt.id, label: opt.answer })) ||
    cardData.answers?.map((a, i) => ({ id: i, label: a })) ||
    [];

  return (
    <Card
      className={
        "p-4 sm:px-10 sm:py-8 md:pb-10 lg:pb-14 md:px-16 mb-4 sm:mb-10 md:mb-12" +
        ` ${outerWrapperClass}`
      }
    >
      <input
        className="hidden"
        x-question-id={cardData.id}
        x-answer-id={activeButton ?? ""}
        readOnly
      />
      <h1 className="font-light text-xl sm:text-2xl lg:text-3xl py-6 sm:py-6 md:py-10">
        {cardData.question}
      </h1>
      <Spacer y={2} />
      <div className="flex flex-col">
        {items.map((item) => (
          <Button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            size="lg"
            radius="sm"
            className={clsx([
              "my-1 h-20",
              activeButton === item.id
                ? "bg-[#36B5FF] text-white"
                : "bg-[#d1f0fa]",
            ])}
          >
            <p className="font-light whitespace-normal text-medium sm:text-lg lg:text-xl">
              {item.label}
            </p>
          </Button>
        ))}
      </div>
    </Card>
  );
}
