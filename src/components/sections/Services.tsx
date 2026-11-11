import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { serviceIcons, serviceSlugs } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { paths, sectionIds } from "@/i18n/paths";

type Props = {
  locale: Locale;
  dict: Dictionary["services"];
  moreLabel: string;
};

/** Карточки услуг: иконка, название, 3 пункта, «Подробнее →». */
export function Services({ locale, dict, moreLabel }: Props) {
  return (
    <Section id={sectionIds.services} className="bg-muted">
      <SectionHeading
        eyebrow={dict.eyebrow}
        title={dict.title}
        subtitle={dict.subtitle}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {serviceSlugs.map((slug, i) => {
          const service = dict.items[slug];
          return (
            <article
              key={slug}
              className="group relative flex flex-col rounded-card border border-line bg-white p-7 shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={serviceIcons[slug]} size={24} />
                </span>
                <span className="text-sm font-bold text-ink-subtle tabular-nums">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl leading-snug font-bold text-ink">
                {service.title}
              </h3>
              <ul className="mt-4 flex-1 space-y-2.5 text-[15px] leading-snug text-ink-muted">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={paths.service(locale, slug)}
                className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand after:absolute after:inset-0 after:rounded-card"
              >
                {moreLabel}
                <Icon
                  name="arrowRight"
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
                <span className="sr-only">: {service.title}</span>
              </Link>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
