import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Important } from "@/components/sections/Important";
import { LeadSection } from "@/components/sections/LeadSection";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, Section } from "@/components/ui/Section";
import { getDictionaryFor } from "@/content/dictionaries";
import { isServiceSlug, serviceIcons, serviceSlugs } from "@/content/services";
import { hasLocale } from "@/i18n/config";
import { paths, sectionIds } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isServiceSlug(slug)) return {};
  const service = getDictionaryFor(lang).services.items[slug];
  return pageMetadata({
    locale: lang,
    path: (l) => paths.service(l, slug),
    title: service.title,
    description: service.lead,
  });
}

/**
 * Страница услуги (× 4): для кого · что входит · что получаете на выходе ·
 * что не входит · «Говорим сразу» · вопросы · форма.
 */
export default async function ServicePage({
  params,
}: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isServiceSlug(slug)) notFound();
  const dict = getDictionaryFor(lang);
  const service = dict.services.items[slug];
  const t = dict.servicePage;

  return (
    <>
      <Hero
        title={service.title}
        subtitle={service.lead}
        primary={{
          href: `${paths.service(lang, slug)}#${sectionIds.request}`,
          label: dict.common.cta,
        }}
        secondary={{
          href: paths.section(lang, sectionIds.process),
          label: dict.common.howWeWork,
        }}
        facts={dict.hero.facts}
        breadcrumbs={[
          { href: paths.home(lang), label: dict.common.home },
          {
            href: paths.section(lang, sectionIds.services),
            label: dict.nav.services,
          },
        ]}
      />

      {/* Для кого + Что входит */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="reveal lg:sticky lg:top-32 lg:self-start">
            <Eyebrow index="01">{t.forWhom}</Eyebrow>
            <ul className="mt-8 space-y-0 border-t border-ink/80">
              {service.forWhom.map((item) => (
                <li
                  key={item}
                  className="border-b border-line py-5 font-display text-[1.45rem] leading-snug text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <Eyebrow index="02">{t.includes}</Eyebrow>
            <ol className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {service.includes.map((item, i) => (
                <li key={item} className="flex flex-col gap-6 bg-card p-7">
                  <span className="font-display text-[2.25rem] leading-none text-brass/80 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] leading-snug text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Что вы получаете на выходе + Что не входит */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <div className="container-page grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="reveal grain rounded-card bg-ink blueprint p-8 text-paper sm:p-12">
            <Eyebrow index="03" tone="dark">
              {t.result}
            </Eyebrow>
            <ul className="mt-10 grid gap-8 sm:grid-cols-3">
              {service.result.map((item) => (
                <li key={item} className="border-t border-paper/15 pt-6">
                  <Icon
                    name="file"
                    size={24}
                    strokeWidth={1.4}
                    className="text-brass-light"
                  />
                  <p className="mt-4 font-display text-[1.4rem] leading-snug">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-card border border-line bg-card p-8 sm:p-12">
            <Eyebrow index="04">{t.excludes}</Eyebrow>
            <ul className="mt-10 space-y-5">
              {service.excludes.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-[16px] leading-relaxed text-ink-muted"
                >
                  <Icon
                    name="minus"
                    size={18}
                    className="mt-1 shrink-0 text-brass"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Important dict={dict.important} />

      <Faq id="service-faq" index="05" title={t.faq} items={service.faq} />

      {/* Другие услуги */}
      <section className="border-t border-line py-16">
        <div className="container-page">
          <p className="label-caps text-brass">{t.other}</p>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
            {serviceSlugs
              .filter((s) => s !== slug)
              .map((s) => (
                <li key={s}>
                  <Link
                    href={paths.service(lang, s)}
                    className="group flex h-full items-center justify-between gap-4 bg-card p-6 transition-colors hover:bg-paper"
                  >
                    <span className="flex items-center gap-4">
                      <Icon
                        name={serviceIcons[s]}
                        size={22}
                        strokeWidth={1.4}
                        className="text-brass"
                      />
                      <span className="font-display text-[1.3rem] leading-tight text-ink">
                        {dict.services.items[s].title}
                      </span>
                    </span>
                    <Icon
                      name="arrowRight"
                      size={18}
                      className="shrink-0 text-ink-subtle transition-transform group-hover:translate-x-1 group-hover:text-brass"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <LeadSection
        locale={lang}
        dict={dict.form}
        whatsappPrefill={dict.common.whatsappPrefill}
        page={paths.service(lang, slug)}
      />
    </>
  );
}
