import type { Locale } from "@/i18n/config";
import { en } from "./en";
import { kk } from "./kk";
import { ru } from "./ru";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { ru, en, kk };

/** Словарь по явному языку (для API, писем, generateMetadata). */
export function getDictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale];
}
