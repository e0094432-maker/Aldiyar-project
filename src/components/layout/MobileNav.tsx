"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher, LanguageSwitcherStatic } from "./LanguageSwitcher";

type Props = {
  locale: Locale;
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
  phone: { href: string; label: string };
  labels: { menu: string; close: string; language: string };
};

/** Бургер-меню для телефонов и планшетов. */
export function MobileNav({ locale, links, cta, phone, labels }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? labels.close : labels.menu}
        className="-mr-2 inline-flex size-11 items-center justify-center text-ink"
      >
        <Icon name={open ? "close" : "menu"} size={24} strokeWidth={1.5} />
      </button>

      {/* Портал: у шапки backdrop-filter, иначе fixed-панель привязалась бы к шапке. */}
      {open &&
        createPortal(
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper"
          >
            <div className="container-page flex min-h-full flex-col gap-8 py-8">
              <nav className="flex flex-col">
                {links.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    style={{ animationDelay: `${i * 50}ms` }}
                    className="flex animate-rise items-baseline gap-4 border-b border-line py-4 font-display text-[2rem] leading-none text-ink"
                  >
                    <span className="font-sans text-xs font-semibold text-brass tabular-nums">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center justify-between gap-4">
                <Suspense
                  fallback={
                    <LanguageSwitcherStatic
                      current={locale}
                      label={labels.language}
                    />
                  }
                >
                  <LanguageSwitcher
                    current={locale}
                    label={labels.language}
                    onNavigate={close}
                  />
                </Suspense>
                <a
                  href={phone.href}
                  className="inline-flex items-center gap-2 font-medium text-ink tabular-nums"
                >
                  <Icon name="phone" size={18} className="text-brass" />
                  {phone.label}
                </a>
              </div>

              <Link
                href={cta.href}
                onClick={close}
                className={buttonClass("primary", "lg", "mt-auto w-full")}
              >
                {cta.label}
              </Link>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
