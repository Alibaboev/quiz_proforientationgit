
import { questions } from "@/dictionaries/quizDictionary";
import type { QuestionBank } from "@/dictionaries/quizDictionary";

export type QuizSource = "local" | "api";

export async function getQuestions(
  source: QuizSource = "local",
  lang: string = "uk"
): Promise<QuestionBank> {
  if (source === "local") {
    if (!(questions as any)[lang]) {
      throw new Error(`Questions for language "${lang}" not found`);
    }
    return (questions as any)[lang]; 
  }

/*   if (source === "api") {
    const res = await fetch(`/api/quiz?lang=${lang}`);
    if (!res.ok) throw new Error("Failed to fetch quiz data from API");
    return res.json();
  } */

  throw new Error("Unsupported source");
}