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
 * Язык: cookie выбора → русский/казахский, если они есть в браузере → английский → русский.
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

/** Боты превью ссылок и поисковики: Telegram, WhatsApp, соцсети, Google и т.п. */
const BOT_UA =
  /bot|crawler|spider|facebookexternalhit|whatsapp|telegram|vkshare|skype|slack|discord|linkedin|instagram/i;

function detectLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(fromCookie)) return fromCookie;

  // Превью ссылки в мессенджерах всегда на основном языке — русском.
  if (BOT_UA.test(request.headers.get("user-agent") ?? ""))
    return defaultLocale;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  // Если в настройках браузера вообще есть русский или казахский — берём их
  // (у многих в Казахстане английский стоит первым, но русский тоже указан).
  for (const { lang } of preferred) {
    if (lang === "kk" || lang === "kz") return "kk";
    if (lang === "ru") return "ru";
  }
  // Иначе английский — для зарубежных вузов.
  if (preferred.some(({ lang }) => lang === "en")) return "en";
  return defaultLocale;
}

export const config = {
  // Не трогаем API, служебные файлы Next.js и всё, что похоже на файл (robots.txt, icon.svg, ...).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
