import Link from "next/link";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/components/ui/T";
import { site } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { navItems, paths, sectionIds } from "@/i18n/paths";
import { LanguageSwitcher, LanguageSwitcherStatic } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/** Шапка: логотип, меню-якоря, RU/EN/KK, телефон, «Обсудить проект». Закреплена при прокрутке. */
export async function Header() {
  const locale = await getLocale();
  const dict = await getDictionary();

  const links = navItems.map((item) => ({
    href: paths.section(locale, item.id),
    label: dict.nav[item.key],
  }));
  const ctaHref = paths.section(locale, sectionIds.request);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="container-page flex h-16 items-center gap-6 lg:h-[4.5rem]">
        <Logo href={paths.home(locale)} />

        <nav
          aria-label={dict.common.menu}
          className="hidden items-center gap-1 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[15px] font-medium text-ink-muted transition-colors hover:bg-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <Suspense
              fallback={
                <LanguageSwitcherStatic
                  current={locale}
                  label={dict.common.language}
                />
              }
            >
              <LanguageSwitcher current={locale} label={dict.common.language} />
            </Suspense>
          </div>

          <a
            href={`tel:${site.phone.tel}`}
            className="hidden items-center gap-2 text-[15px] font-semibold whitespace-nowrap text-ink xl:inline-flex"
          >
            <Icon name="phone" size={16} className="text-brand" />
            <T>{site.phone.display}</T>
          </a>

          <div className="hidden md:block">
            <ButtonLink href={ctaHref}>{dict.common.cta}</ButtonLink>
          </div>

          <MobileNav
            locale={locale}
            links={links}
            cta={{ href: ctaHref, label: dict.common.cta }}
            phone={{ href: `tel:${site.phone.tel}`, label: site.phone.display }}
            labels={{
              menu: dict.common.menu,
              close: dict.common.closeMenu,
              language: dict.common.language,
            }}
          />
        </div>
      </div>
    </header>
  );
}
