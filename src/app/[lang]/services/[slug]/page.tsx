import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Important } from "@/components/sections/Important";
import { LeadSection } from "@/components/sections/LeadSection";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
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
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="rounded-card bg-muted p-7 sm:p-9">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white text-brand shadow-card">
              <Icon name={serviceIcons[slug]} size={24} />
            </span>
            <h2 className="mt-6 text-2xl font-bold text-ink">{t.forWhom}</h2>
            <ul className="mt-5 space-y-3.5">
              {service.forWhom.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[16px] leading-relaxed text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[1.75rem] leading-tight font-bold tracking-tight text-ink sm:text-4xl">
              {t.includes}
            </h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.includes.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card"
                >
                  <span className="text-sm font-extrabold text-brand tabular-nums">
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
      <section className="pb-8 sm:pb-12">
        <div className="container-page grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-card bg-brand-deep p-7 text-white sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{t.result}</h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-3">
              {service.result.map((item) => (
                <li key={item} className="rounded-2xl bg-white/[0.07] p-5">
                  <Icon name="file" size={22} className="text-accent" />
                  <p className="mt-3 text-[16px] leading-snug">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line p-7 sm:p-10">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              {t.excludes}
            </h2>
            <ul className="mt-6 space-y-4">
              {service.excludes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[16px] leading-relaxed text-ink-muted"
                >
                  <Icon
                    name="minus"
                    size={18}
                    className="mt-1 shrink-0 text-ink-subtle"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Important dict={dict.important} />

      <Faq id="service-faq" title={t.faq} items={service.faq} />

      {/* Другие услуги */}
      <section className="border-t border-line py-12">
        <div className="container-page">
          <h2 className="text-lg font-bold text-ink">{t.other}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {serviceSlugs
              .filter((s) => s !== slug)
              .map((s) => (
                <li key={s}>
                  <Link
                    href={paths.service(lang, s)}
                    className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-line p-5 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        name={serviceIcons[s]}
                        size={20}
                        className="text-brand"
                      />
                      {dict.services.items[s].title}
                    </span>
                    <Icon
                      name="arrowRight"
                      size={18}
                      className="shrink-0 transition-transform group-hover:translate-x-1"
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
        page={paths.service(lang, slug)}
      />
    </>
  );
}
