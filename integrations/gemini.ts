// /integrations/gemini.ts
import 'server-only'; // Гарантирует, что этот код выполняется только на сервере

import { GoogleGenerativeAI } from '@google/generative-ai';
import { getDictionary } from '@/dictionaries/dictionaries';

// --- Типы для входящих данных ---
interface GenerateReportParams {
  lang: string;
  userRole: string;
  educationLevel: string;
  languagePreference: string;
  scores: { [key: string]: number };
  userAnswers: { question: string; answer: string; type: string }[];
}

// --- Инициализация клиента Gemini ---
// Ключ API безопасно берется из переменных окружения
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// --- Основная функция для генерации отчета ---
export async function generateReport({
  lang,
  userRole,
  educationLevel,
  languagePreference,
  scores,
  userAnswers,
}: GenerateReportParams): Promise<string | null> {
  try {
    // 1. Загружаем словарь с промптами для нужного языка
    const dict = await getDictionary(lang);
    const prompts = dict.proforientation.prompts;

    // 2. Определяем ключ для нужного промпта
    const promptConfigKey = userRole === 'parent' ? 'parent' : `student_${educationLevel}`;
    const promptConfig = prompts.reportGeneration[promptConfigKey] || prompts.reportGeneration.student_grade_11; // Запасной вариант

    // 3. Определяем топ-направление и его название
    const topDir = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    const topDirLabel = prompts.DIR_LABELS[topDir] || 'Технічний';

    const openAnswersText = userAnswers
      .filter((a) => a.type === 'open-ended')
      .map((a) => `Питання: ${a.question}\nВідповідь: ${a.answer}`)
      .join('\n\n');

    // 4. Собираем финальный промпт для AI
    let finalPrompt = `${prompts.reportGeneration.common.persona} ${promptConfig.context} ${promptConfig.task} ${promptConfig.personalization} ${promptConfig.structure} ${promptConfig.knowledgeBase} ${prompts.reportGeneration.common.cta}`;
    
    finalPrompt = finalPrompt
      .replace(/{userRole}/g, userRole)
      .replace(/{educationLevel}/g, educationLevel)
      .replace(/{languagePreference}/g, languagePreference)
      .replace(/{topDirection}/g, topDirLabel)
      .replace(/{openAnswers}/g, openAnswersText);

    // 5. Выбираем модель и отправляем запрос в Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const reportHtml = response.text();

    // Возвращаем готовый HTML-отчет
    return reportHtml;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // В случае ошибки возвращаем null, чтобы бэкенд мог это обработать
    return null;
  }
}
