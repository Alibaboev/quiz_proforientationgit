import { textRU } from "@/dictionaries/ru";
import { textUA } from "@/dictionaries/ua";

// импорт квизов
/* import { proforientationUAText } from "@/dictionaries/quizes/proforientation.ua";
import { proforientationRUText } from "@/dictionaries/quizes/proforientation.ru"; */
import { WebinarUAText } from "@/dictionaries/ua";
import { WebinarRUText } from "@/dictionaries/ru";

// 🌍 общий словарь (landing, меню и т.п.)
const dictionary: Record<string, { bundle: typeof textRU | typeof textUA; currentLang: string }> = {
  ru: { bundle: textRU, currentLang: "ru" },
  ua: { bundle: textUA, currentLang: "ua" }
};

export const getDictionary = (locale: string) => dictionary[locale] || dictionary["ru"];

/* // 📝 профориентация
export const getOrientationDictionary = (locale: string) => {
  if (locale === "ua") return { bundle: proforientationUAText, currentLang: "ua" };
  return { bundle: proforientationRUText, currentLang: "ru" };
};

// 📝 вебинар
export const getWebinarDictionary = (locale: string) => {
  if (locale === "ua") return { bundle: WebinarUAText, currentLang: "ua" };
  return { bundle: WebinarRUText, currentLang: "ru" };
}; */
