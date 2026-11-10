"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALE_COOKIE,
  localeLabels,
  locales,
  type Locale,
} from "@/i18n/config";

type Props = {
  current: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

/** RU / EN / KK — ведёт на ту же страницу на другом языке. */
export function LanguageSwitcher(props: Props) {
  const pathname = usePathname();
  return <LanguageLinks {...props} hrefFor={(l) => swapLocale(pathname, l)} />;
}

/** Вариант без usePathname — ведёт на главную нужного языка (fallback для Suspense). */
export function LanguageSwitcherStatic(props: Props) {
  return <LanguageLinks {...props} hrefFor={(l) => `/${l}`} />;
}

function LanguageLinks({
  current,
  label,
  className = "",
  onNavigate,
  hrefFor,
}: Props & { hrefFor: (l: Locale) => string }) {
  return (
    <nav
      aria-label={label}
      className={`flex items-center gap-0.5 ${className}`}
    >
      {locales.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
              onNavigate?.();
            }}
            className={`px-1.5 py-1.5 label-caps transition-colors ${
              active
                ? "text-ink underline decoration-brass decoration-2 underline-offset-[6px]"
                : "text-ink-subtle hover:text-ink"
            }`}
          >
            {localeLabels[l]}
          </Link>
        );
      })}
    </nav>
  );
}

function swapLocale(pathname: string | null, locale: Locale) {
  if (!pathname) return `/${locale}`;
  const segments = pathname.split("/");
  // ["", "ru", "services", "..."]
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}
