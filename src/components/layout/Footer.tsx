import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/components/ui/T";
import { site, telegramUrl, whatsappUrl } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { navItems, paths, sectionIds } from "@/i18n/paths";
import { Logo } from "./Logo";

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

/** Подвал: описание, меню, контакты, реквизиты, политика, дисклеймер. */
export async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const year = await getYear();

  return (
    <footer
      id={sectionIds.contacts}
      className="grain bg-ink blueprint pt-20 pb-28 text-paper/75 sm:pb-14"
    >
      <div className="container-page">
        {/* Крупная строка-описание + CTA */}
        <div className="flex flex-col gap-8 border-b border-paper/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl font-display text-[2rem] leading-[1.1] text-balance text-paper sm:text-[2.75rem]">
            {dict.footer.tagline}
          </p>
          <ButtonLink
            href={paths.section(locale, sectionIds.request)}
            variant="accent"
            size="lg"
            arrow
            className="shrink-0 self-start lg:self-auto"
          >
            {dict.common.cta}
          </ButtonLink>
        </div>

        <div className="grid gap-12 pt-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.3fr_1.2fr]">
          <div>
            <Logo href={paths.home(locale)} light />
          </div>

          <div>
            <FooterTitle>{dict.footer.navTitle}</FooterTitle>
            <ul className="mt-5 space-y-3 text-[15px]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={paths.section(locale, item.id)}
                    className="transition-colors hover:text-brass-light"
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterTitle>{dict.footer.contactsTitle}</FooterTitle>
            <ul className="mt-5 space-y-3.5 text-[15px]">
              <FooterContact icon="phone" href={`tel:${site.phone.tel}`}>
                <T>{site.phone.display}</T>
              </FooterContact>
              <FooterContact icon="mail" href={`mailto:${site.email.address}`}>
                <T>{site.email.display}</T>
              </FooterContact>
              <FooterContact
                icon="whatsapp"
                href={whatsappUrl(dict.common.whatsappPrefill)}
                external
              >
                WhatsApp
              </FooterContact>
              <FooterContact icon="telegram" href={telegramUrl()} external>
                Telegram
              </FooterContact>
              <li className="flex gap-3">
                <Icon
                  name="mapPin"
                  size={18}
                  className="mt-0.5 shrink-0 text-brass-light/70"
                />
                <span>{dict.contacts.address}</span>
              </li>
            </ul>
            <Link
              href={paths.contacts(locale)}
              className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-paper underline decoration-brass-light/40 underline-offset-4 hover:decoration-brass-light"
            >
              {dict.footer.allContacts}
              <Icon
                name="arrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div>
            <FooterTitle>{dict.footer.requisitesTitle}</FooterTitle>
            <ul className="mt-5 space-y-2 text-[14.5px] text-paper/65">
              {dict.contacts.requisites.map((line) => (
                <li key={line}>
                  <T>{line}</T>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 max-w-4xl text-[13px] leading-relaxed text-paper/45">
          {dict.footer.disclaimer}
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-paper/10 pt-6 text-[13px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} EduForge Advisory. {dict.footer.rights}
          </p>
          <Link
            href={paths.privacy(locale)}
            className="transition-colors hover:text-paper"
          >
            {dict.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="label-caps text-brass-light">{children}</h2>;
}

function FooterContact({
  icon,
  href,
  external,
  children,
}: {
  icon: "phone" | "mail" | "whatsapp" | "telegram";
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="inline-flex gap-3 transition-colors hover:text-paper"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Icon
          name={icon}
          size={18}
          className="mt-0.5 shrink-0 text-brass-light/70"
        />
        <span>{children}</span>
      </a>
    </li>
  );
}
