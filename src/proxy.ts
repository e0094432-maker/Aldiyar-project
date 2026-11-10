import { NextResponse, type NextRequest } from "next/server";
import { isServiceSlug } from "@/content/services";
import {
  defaultLocale,
  hasLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

/**
 * Адреса без языка (/, /contacts, ...) перенаправляем на /{язык}/...
 * Язык: cookie выбора → Accept-Language браузера → русский по умолчанию.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first, section, slug, ...rest] = pathname.split("/");

  if (hasLocale(first)) {
    // Неизвестная услуга → настоящий 404. Внутри страницы notFound() сработал бы
    // уже после начала стриминга, и статус остался бы 200.
    if (
      section === "services" &&
      (!slug || !isServiceSlug(slug) || rest.length)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = `/${first}/404`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function detectLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(fromCookie)) return fromCookie;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if (lang === "kk" || lang === "kz") return "kk";
    if (hasLocale(lang)) return lang;
  }
  return defaultLocale;
}

export const config = {
  // Не трогаем API, служебные файлы Next.js и всё, что похоже на файл (robots.txt, icon.svg, ...).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
