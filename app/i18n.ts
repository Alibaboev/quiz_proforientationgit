import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // если locale не передан, используем "en" или твой defaultLocale
  const currentLocale = locale ?? 'uk';

  const messages = await import(`../locales/${currentLocale}/common.json`).then(
    (m) => m.default
  );

  return { locale: currentLocale, messages };
});
