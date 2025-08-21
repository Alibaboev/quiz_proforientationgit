// /dictionaries/ua.ts

// 1. Импортируем наши новые файлы с контентом квиза
import { questions } from './proforientation/questions';
import { prompts } from './proforientation/prompts';

// --- СКОРЕЕ ВСЕГО, У ВАС УЖЕ ЕСТЬ ПОХОЖИЕ ИМПОРТЫ ДЛЯ ДРУГИХ СТРАНИЦ ---
// import { landingPageTexts } from './landing/ua'; 
// import { webinarTexts } from './webinar/ua';

// 2. Добавляем новый раздел 'proforientation' в основной объект словаря
export const uaDictionary = {
  // ... здесь уже есть ваши существующие тексты для других страниц (landing, webinar и т.д.)

  // Добавляем новый объект для нашего квиза
  proforientation: {
    questions: questions,
    prompts: prompts,
    // Здесь также будут лежать тексты интерфейса самого квиза
    startTitle: "🎯 Обери професію та університет мрії в Чехії — за 5 хвилин",
    startSubtitle: "Відповідай на 3 простих запитання — і отримай підбірку спеціальностей та університетів, які підійдуть саме тобі.",
    startButton: "Розпочати тест",
    roleSelectTitle: "Хто зараз проходить тест?",
    studentButton: "Я — учень/студент",
    parentButton: "Я — один з батьків",
    // ... и так далее для всех кнопок и заголовков
  }
};
