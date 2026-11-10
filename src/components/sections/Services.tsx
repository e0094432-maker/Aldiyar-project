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
    <Section id={sectionIds.services} className="bg-paper-2">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="02"
            eyebrow={dict.eyebrow}
            title={dict.title}
            subtitle={dict.subtitle}
          />
        </div>

        <div className="reveal grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {serviceSlugs.map((slug, i) => {
            const service = dict.items[slug];
            return (
              <article
                key={slug}
                className="group relative flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-paper sm:p-10"
              >
                {/* латунная линия сверху при наведении */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brass transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="font-display text-[3.5rem] leading-none text-brass/80 tabular-nums">
                    0{i + 1}
                  </span>
                  <Icon
                    name={serviceIcons[slug]}
                    size={26}
                    strokeWidth={1.4}
                    className="mt-2 text-ink-subtle transition-colors group-hover:text-brass"
                  />
                </div>
                <h3 className="mt-8 font-display text-[1.85rem] leading-[1.08] text-balance text-ink">
                  {service.title}
                </h3>
                <ul className="mt-6 flex-1 divide-y divide-line-soft border-t border-line-soft text-[15px] leading-snug text-ink-muted">
                  {service.points.map((point) => (
                    <li key={point} className="py-3">
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={paths.service(locale, slug)}
                  className="mt-6 inline-flex items-center gap-2 label-caps text-ink after:absolute after:inset-0"
                >
                  {moreLabel}
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="text-brass transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                  <span className="sr-only">: {service.title}</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
