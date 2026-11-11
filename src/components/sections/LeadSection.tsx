import { Eyebrow } from "@/components/ui/Section";
import { T } from "@/components/ui/T";
import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/i18n/config";
import { paths, sectionIds } from "@/i18n/paths";
import { LeadForm } from "./LeadForm";

type Props = {
  locale: Locale;
  dict: Dictionary["form"];
  /** Путь страницы, на которой стоит форма. */
  page: string;
};

/** Блок «Расскажите о проекте» с формой заявки — в конце каждой страницы. */
export function LeadSection({ locale, dict, page }: Props) {
  return (
    <section id={sectionIds.request} className="py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="relative rounded-card border-2 border-brand/70 bg-brand-soft/40 p-6 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <Eyebrow>{dict.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-[1.625rem] leading-tight font-bold tracking-tight text-balance text-ink sm:text-[2.25rem]">
              <T>{dict.title}</T>
            </h2>
          </div>
          <div className="mt-10">
            <LeadForm
              locale={locale}
              dict={dict}
              page={page}
              privacyHref={paths.privacy(locale)}
              thanksHref={paths.thanks(locale)}
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-ink-subtle">
            <T>{dict.note}</T> {dict.requiredHint}
          </p>
        </div>
      </div>
    </section>
  );
}
