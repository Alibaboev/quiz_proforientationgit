// /app/[lng]/(quizes)/proforientation/page.tsx

import { getDictionary } from '@/dictionaries/dictionaries'; // Ваша существующая функция для загрузки словарей
import { QuizClientComponent } from '@/components/quiz/QuizClient'; // Клиентский компонент, который мы создадим далее

// Главный компонент страницы
export default async function ProforientationPage({ params: { lng } }: { params: { lng: string } }) {
  // 1. Загружаем полный словарь для текущего языка
  const dict = await getDictionary(lng);

  // 2. Передаем в клиентский компонент только ту часть словаря, которая относится к квизу
  // Убедитесь, что в ваших файлах dictionaries/{lang}.ts есть секция 'proforientation'
  return <QuizClientComponent dictionary={dict.proforientation} lang={lng} />;
}
