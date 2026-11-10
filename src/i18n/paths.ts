import type { ServiceSlug } from "@/content/services";
import type { Locale } from "./config";

/** id блоков главной — на них ведут пункты меню. */
export const sectionIds = {
  hero: "top",
  audience: "audience",
  services: "services",
  process: "process",
  important: "important",
  about: "about",
  faq: "faq",
  request: "request",
  contacts: "contacts",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export const paths = {
  home: (l: Locale) => `/${l}`,
  section: (l: Locale, id: SectionId) => `/${l}#${id}`,
  service: (l: Locale, slug: ServiceSlug) => `/${l}/services/${slug}`,
  contacts: (l: Locale) => `/${l}/contacts`,
  thanks: (l: Locale) => `/${l}/thank-you`,
  privacy: (l: Locale) => `/${l}/privacy`,
};

/** Пункты меню шапки и подвала: Услуги · Как работаем · Важно знать · Вопросы · Контакты. */
export const navItems = [
  { key: "services", id: sectionIds.services },
  { key: "process", id: sectionIds.process },
  { key: "important", id: sectionIds.important },
  { key: "faq", id: sectionIds.faq },
  { key: "contacts", id: sectionIds.contacts },
] as const;
