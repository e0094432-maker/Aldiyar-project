import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { getDictionaryFor } from "@/content/dictionaries";
import type { Dictionary } from "@/content/dictionaries/types";
import { hasLocale, type Locale } from "./config";

export { getDictionaryFor };

/**
 * Текущий язык из URL (/ru, /en, /kk).
 * Работает в любом серверном компоненте без передачи пропсов.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Словарь текущего языка. */
export async function getDictionary(): Promise<Dictionary> {
  return getDictionaryFor(await getLocale());
}
