import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LeadSection } from "@/components/sections/LeadSection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Section";
import { T } from "@/components/ui/T";
import { site, telegramUrl, whatsappUrl } from "@/config/site";
import { getDictionaryFor } from "@/content/dictionaries";
import { hasLocale } from "@/i18n/config";
import { paths } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contacts">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionaryFor(lang);
  return pageMetadata({
    locale: lang,
    path: paths.contacts,
    title: dict.contactsPage.title,
    description: `${dict.contactsPage.subtitle} ${dict.contacts.address}.`,
  });
}

/** Контакты: адрес, карта 2ГИС, телефон, email, WhatsApp, Telegram, часы работы, реквизиты, форма. */
export default async function ContactsPage({
  params,
}: PageProps<"/[lang]/contacts">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionaryFor(lang);
  const t = dict.contactsPage;

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-white to-muted/60 py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading as="h1" title={t.title} subtitle={t.subtitle} />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon="mapPin" title={t.address}>
                {dict.contacts.address}
              </ContactCard>
              <ContactCard icon="clock" title={t.hours}>
                <T>{dict.contacts.hours}</T>
              </ContactCard>
              <ContactCard icon="phone" title={t.phone}>
                <a href={`tel:${site.phone.tel}`} className="hover:text-brand">
                  <T>{site.phone.display}</T>
                </a>
              </ContactCard>
              <ContactCard icon="mail" title={t.email}>
                <a
                  href={`mailto:${site.email.address}`}
                  className="break-all hover:text-brand"
                >
                  <T>{site.email.display}</T>
                </a>
              </ContactCard>
              <ContactCard
                icon="messages"
                title={t.messengers}
                className="sm:col-span-2"
              >
                <div className="mt-1 flex flex-wrap gap-3">
                  <ButtonLink
                    href={whatsappUrl(dict.common.whatsappPrefill)}
                    variant="whatsapp"
                    icon="whatsapp"
                    external
                  >
                    WhatsApp
                  </ButtonLink>
                  <ButtonLink
                    href={telegramUrl()}
                    variant="secondary"
                    icon="telegram"
                    external
                  >
                    Telegram
                  </ButtonLink>
                </div>
              </ContactCard>
              <ContactCard
                icon="file"
                title={t.requisites}
                className="sm:col-span-2"
              >
                <ul className="space-y-1">
                  {dict.contacts.requisites.map((line) => (
                    <li key={line}>
                      <T>{line}</T>
                    </li>
                  ))}
                </ul>
              </ContactCard>
            </div>

            <Map label={t.mapPlaceholder} openLabel={t.openMap} />
          </div>
        </div>
      </section>

      <LeadSection locale={lang} dict={dict.form} page={paths.contacts(lang)} />
    </>
  );
}

function ContactCard({
  icon,
  title,
  className = "",
  children,
}: {
  icon: IconName;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white p-6 shadow-card ${className}`}
    >
      <div className="flex items-center gap-2.5 text-sm font-semibold text-ink-subtle">
        <Icon name={icon} size={18} className="text-brand" />
        {title}
      </div>
      <div className="mt-3 text-[16px] leading-relaxed font-medium text-ink">
        {children}
      </div>
    </div>
  );
}

/** Карта 2ГИС. Пока нет URL виджета (site.map.embedUrl) — показываем заглушку со ссылкой. */
function Map({ label, openLabel }: { label: string; openLabel: string }) {
  return (
    <div className="relative min-h-80 overflow-hidden rounded-card border border-line bg-muted">
      {site.map.embedUrl ? (
        <iframe
          src={site.map.embedUrl}
          title="2GIS"
          loading="lazy"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle,rgb(31_79_209/0.12)_1px,transparent_1px)] [background-size:18px_18px] p-6 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-brand shadow-card">
            <Icon name="mapPin" size={26} />
          </span>
          <p className="text-ink-subtle">{label}</p>
        </div>
      )}
      <div className="absolute right-4 bottom-4">
        <ButtonLink
          href={site.map.link}
          variant="light"
          iconRight="arrowRight"
          external
          className="shadow-lift"
        >
          {openLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
