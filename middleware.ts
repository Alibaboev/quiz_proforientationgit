import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // поддерживаемые языки
  locales: ['uk', 'ru', 'en'],

  // язык по умолчанию
  defaultLocale: 'uk'
});

export const config = {
  // перехватываем все страницы, кроме служебных (_next, api, статика)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};