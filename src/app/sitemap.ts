import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { serviceSlugs } from "@/content/services";
import { localeHreflang, locales, type Locale } from "@/i18n/config";
import { paths } from "@/i18n/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: ((l: Locale) => string)[] = [
    paths.home,
    ...serviceSlugs.map((slug) => (l: Locale) => paths.service(l, slug)),
    paths.contacts,
    paths.privacy,
  ];

  return pages.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}${path(locale)}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [localeHreflang[l], `${site.url}${path(l)}`]),
        ),
      },
    })),
  );
}
