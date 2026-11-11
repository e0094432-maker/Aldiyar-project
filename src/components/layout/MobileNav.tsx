"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
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
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-muted"
      >
        <Icon name={open ? "close" : "menu"} size={22} />
      </button>

      {/* Портал: у шапки backdrop-filter, иначе fixed-панель привязалась бы к шапке. */}
      {open &&
        createPortal(
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white"
          >
            <div className="container-page flex flex-col gap-6 py-6">
              <nav className="flex flex-col">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="border-b border-line py-4 text-lg font-semibold text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center justify-between">
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
                  className="inline-flex items-center gap-2 font-semibold text-ink"
                >
                  <Icon name="phone" size={18} className="text-brand" />
                  {phone.label}
                </a>
              </div>

              <Link
                href={cta.href}
                onClick={close}
                className={buttonClass("primary", "lg", "w-full")}
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
