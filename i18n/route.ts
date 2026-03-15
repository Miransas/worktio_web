import { getRequestConfig } from "next-intl/server";

const locales = ["tr", "en", "uz"];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  // Geçersiz locale varsa default'a dön
  if (!locale || !locales.includes(locale)) {
    locale = "tr";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});