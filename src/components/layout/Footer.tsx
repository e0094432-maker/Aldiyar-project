import Link from "next/link";
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
      className="bg-brand-deep pt-16 pb-24 text-white/80 sm:pb-12"
    >
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <Logo href={paths.home(locale)} light />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <FooterTitle>{dict.footer.navTitle}</FooterTitle>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={paths.section(locale, item.id)}
                    className="hover:text-white"
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterTitle>{dict.footer.contactsTitle}</FooterTitle>
            <ul className="mt-4 space-y-3 text-[15px]">
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
                  className="mt-0.5 shrink-0 text-white/50"
                />
                <span>{dict.contacts.address}</span>
              </li>
            </ul>
            <Link
              href={paths.contacts(locale)}
              className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-white hover:underline"
            >
              {dict.footer.allContacts}
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>

          <div>
            <FooterTitle>{dict.footer.requisitesTitle}</FooterTitle>
            <ul className="mt-4 space-y-1.5 text-[15px] text-white/70">
              {dict.contacts.requisites.map((line) => (
                <li key={line}>
                  <T>{line}</T>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-4xl text-[13px] leading-relaxed text-white/50">
          {dict.footer.disclaimer}
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} EduForge Advisory. {dict.footer.rights}
          </p>
          <Link href={paths.privacy(locale)} className="hover:text-white">
            {dict.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-bold tracking-[0.14em] text-white uppercase">
      {children}
    </h2>
  );
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
        className="inline-flex gap-3 hover:text-white"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Icon name={icon} size={18} className="mt-0.5 shrink-0 text-white/50" />
        <span>{children}</span>
      </a>
    </li>
  );
}
