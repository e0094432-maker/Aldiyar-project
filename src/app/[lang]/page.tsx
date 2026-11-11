import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Audience } from "@/components/sections/Audience";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Important } from "@/components/sections/Important";
import { LeadSection } from "@/components/sections/LeadSection";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { whatsappUrl } from "@/config/site";
import { getDictionaryFor } from "@/content/dictionaries";
import { hasLocale } from "@/i18n/config";
import { paths, sectionIds } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionaryFor(lang);
  return pageMetadata({
    locale: lang,
    path: paths.home,
    description: dict.meta.description,
  });
}

/** Главная: все блоки ТЗ сверху вниз. Меню в шапке ведёт к блокам по якорям. */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionaryFor(lang);
  const cta = {
    href: paths.section(lang, sectionIds.request),
    label: dict.common.cta,
  };

  return (
    <>
      <Hero
        id={sectionIds.hero}
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        primary={cta}
        secondary={{
          href: paths.section(lang, sectionIds.process),
          label: dict.common.howWeWork,
        }}
        facts={dict.hero.facts}
      />
      <Audience dict={dict.audience} />
      <Services
        locale={lang}
        dict={dict.services}
        moreLabel={dict.common.more}
      />
      <Process dict={dict.process} />
      <Important dict={dict.important} />
      <About
        dict={dict.about}
        cta={cta}
        whatsapp={{
          href: whatsappUrl(dict.common.whatsappPrefill),
          label: dict.common.whatsapp,
        }}
      />
      <Faq
        id={sectionIds.faq}
        eyebrow={dict.faq.eyebrow}
        title={dict.faq.title}
        items={dict.faq.items}
        className="bg-muted"
      />
      <LeadSection locale={lang} dict={dict.form} page={paths.home(lang)} />
    </>
  );
}
