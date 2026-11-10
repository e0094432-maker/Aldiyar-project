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
      <section className="border-b border-line py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            as="h1"
            eyebrow={dict.meta.siteName}
            title={t.title}
            subtitle={t.subtitle}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
            <dl className="reveal grid gap-px self-start overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              <ContactCell icon="mapPin" title={t.address} wide>
                <span className="font-display text-[1.6rem] leading-snug">
                  {dict.contacts.address}
                </span>
              </ContactCell>
              <ContactCell icon="phone" title={t.phone}>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="tabular-nums hover:text-brass"
                >
                  <T>{site.phone.display}</T>
                </a>
              </ContactCell>
              <ContactCell icon="mail" title={t.email}>
                <a
                  href={`mailto:${site.email.address}`}
                  className="break-all hover:text-brass"
                >
                  <T>{site.email.display}</T>
                </a>
              </ContactCell>
              <ContactCell icon="clock" title={t.hours}>
                <T>{dict.contacts.hours}</T>
              </ContactCell>
              <ContactCell icon="messages" title={t.messengers}>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  <a
                    href={whatsappUrl(dict.common.whatsappPrefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-brass"
                  >
                    <Icon name="whatsapp" size={18} className="text-whatsapp" />
                    WhatsApp
                  </a>
                  <a
                    href={telegramUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-brass"
                  >
                    <Icon
                      name="telegram"
                      size={18}
                      className="text-[#2aabee]"
                    />
                    Telegram
                  </a>
                </div>
              </ContactCell>
              <ContactCell icon="file" title={t.requisites} wide>
                <ul className="space-y-1 text-[15px] font-normal text-ink-muted">
                  {dict.contacts.requisites.map((line) => (
                    <li key={line}>
                      <T>{line}</T>
                    </li>
                  ))}
                </ul>
              </ContactCell>
            </dl>

            <Map label={t.mapPlaceholder} openLabel={t.openMap} />
          </div>
        </div>
      </section>

      <LeadSection
        locale={lang}
        dict={dict.form}
        whatsappPrefill={dict.common.whatsappPrefill}
        page={paths.contacts(lang)}
      />
    </>
  );
}

function ContactCell({
  icon,
  title,
  wide,
  children,
}: {
  icon: IconName;
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`bg-card p-7 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="flex items-center gap-2.5 label-caps text-ink-subtle">
        <Icon name={icon} size={16} strokeWidth={1.6} className="text-brass" />
        {title}
      </dt>
      <dd className="mt-4 text-[16px] leading-relaxed font-medium text-ink">
        {children}
      </dd>
    </div>
  );
}

/** Карта 2ГИС. Пока нет URL виджета (site.map.embedUrl) — показываем заглушку со ссылкой. */
function Map({ label, openLabel }: { label: string; openLabel: string }) {
  return (
    <div className="reveal grain relative min-h-96 overflow-hidden rounded-card bg-ink">
      {site.map.embedUrl ? (
        <iframe
          src={site.map.embedUrl}
          title="2GIS"
          loading="lazy"
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 blueprint p-6 text-center">
          {/* стилизованная «карта»: кольца вокруг точки офиса */}
          <span className="relative inline-flex size-16 items-center justify-center">
            <span className="absolute inset-0 animate-glow rounded-full border border-brass-light" />
            <span className="absolute -inset-8 rounded-full border border-paper/10" />
            <span className="absolute -inset-20 rounded-full border border-paper/5" />
            <Icon
              name="mapPin"
              size={28}
              className="relative text-brass-light"
            />
          </span>
          <p className="mt-6 label-caps text-paper/50">{label}</p>
        </div>
      )}
      <div className="absolute right-5 bottom-5">
        <ButtonLink href={site.map.link} variant="accent" arrow external>
          {openLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
