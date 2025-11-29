
import { questions } from "@/dictionaries/quizDictionary";
import type { QuestionBank, QuestionBankLanguage } from "@/dictionaries/quizDictionary";
import { getQuizBySlug } from "@/sanity/lib/api";
import { adaptSanityQuizToQuestionBank } from "./sanityAdapter";

export type QuizSource = "local" | "sanity";

/**
 * Получает вопросы из выбранного источника
 * @param source - источник данных: "local" или "sanity"
 * @param lang - язык
 * @param sanitySlug - slug квиза в Sanity (требуется для source="sanity")
 */
export async function getQuestions(
  source: QuizSource = "local",
  lang: string = "uk",
  sanitySlug?: string
): Promise<QuestionBankLanguage> {
  const locale = lang as 'en' | 'ru' | 'uk';

  // Загрузка из локального файла
  if (source === "local") {
    if (!(questions as any)[lang]) {
      throw new Error(`Questions for language "${lang}" not found`);
    }
    return (questions as any)[lang];
  }

  // Загрузка из Sanity CMS
  if (source === "sanity") {
    let quiz;

    if (sanitySlug) {
      // Если slug указан - загружаем конкретный квиз
      quiz = await getQuizBySlug(sanitySlug);

      if (!quiz) {
        throw new Error(`Quiz with slug "${sanitySlug}" not found in Sanity`);
      }

      if (!quiz.isActive) {
        throw new Error(`Quiz "${sanitySlug}" is not active`);
      }
    } else {
      // Если slug не указан - берем первый активный квиз
      const { getQuizzes } = await import("@/sanity/lib/api");
      const quizzes = await getQuizzes();

      if (quizzes.length === 0) {
        throw new Error("No active quizzes found in Sanity");
      }

      // Берем первый квиз и загружаем его полностью
      const firstQuizSlug = quizzes[0].slug.current;
      quiz = await getQuizBySlug(firstQuizSlug);

      if (!quiz) {
        throw new Error("Failed to load quiz from Sanity");
      }
    }

    return adaptSanityQuizToQuestionBank(quiz, locale);
  }

  throw new Error("Unsupported source");
}

/**
 * Получает полные данные квиза из Sanity
 */
export async function getSanityQuiz(slug: string) {
  return getQuizBySlug(slug);
}