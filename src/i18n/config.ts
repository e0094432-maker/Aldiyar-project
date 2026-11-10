export const locales = ["ru", "en", "kk"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/** Имя cookie, в которой запоминаем выбранный язык. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  kk: "KK",
};

/** Значение для <html lang> и hreflang. */
export const localeHreflang: Record<Locale, string> = {
  ru: "ru-KZ",
  en: "en",
  kk: "kk-KZ",
};

export const ogLocale: Record<Locale, string> = {
  ru: "ru_RU",
  en: "en_US",
  kk: "kk_KZ",
};

export function hasLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
