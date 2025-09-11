import type { Answer } from "@/context/QuizContext";
import { promptsData, Locale } from "@/dictionaries/promptsDictionary";

export function formatAnswers(answers: Answer[], locale: Locale): string {
  const dirLabels = promptsData[locale].DIR_LABELS as Record<string, string>;

  return answers
    .map((a) => {
      const tagsText =
        a.tags
          ?.map((tag) => dirLabels[tag as keyof typeof dirLabels] ?? tag)
          .filter(Boolean)
          .join(", ") || "нет";

      return `Вопрос: "${a.question}"\nОтвет: "${a.answer}"\nТеги: ${tagsText}`;
    })
    .join("\n\n");
}
