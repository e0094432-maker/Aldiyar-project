/**
 * Список услуг. Порядок здесь = порядок карточек на главной.
 * Тексты каждой услуги лежат в словарях (src/content/dictionaries/*).
 */
export const serviceSlugs = [
  "legal-analysis",
  "negotiations",
  "finalization",
  "launch",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export const serviceIcons: Record<
  ServiceSlug,
  "scale" | "messages" | "fileCheck" | "landmark"
> = {
  "legal-analysis": "scale",
  negotiations: "messages",
  finalization: "fileCheck",
  launch: "landmark",
};
