import langData from "@/lang/lang.json";

export const locales = ["en", "tr", "uz"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";
export const localeCookieName = "worktio-locale";

type Dictionaries = typeof langData;
export type Dictionary = Dictionaries[typeof defaultLocale];

export function isValidLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}

export function getDictionary(locale?: string | null): Dictionary {
  const safeLocale = locale && isValidLocale(locale) ? locale : defaultLocale;
  return langData[safeLocale];
}
