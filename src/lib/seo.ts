import type { Metadata } from "next";
import { site } from "@/config/site";
import {
  defaultLocale,
  localeHreflang,
  locales,
  ogLocale,
  type Locale,
} from "@/i18n/config";

type PageMetaInput = {
  locale: Locale;
  /** Путь страницы для заданного языка, например (l) => `/${l}/contacts`. */
  path: (l: Locale) => string;
  title?: string;
  description: string;
  noindex?: boolean;
};

/** canonical + hreflang для трёх языков + Open Graph. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  noindex,
}: PageMetaInput): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeHreflang[l]] = path(l);
  languages["x-default"] = path(defaultLocale);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path(locale), languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[locale],
      url: path(locale),
      title: title ? `${title} — ${site.name}` : undefined,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
