import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { sectionIds } from "@/i18n/paths";

const icons = ["briefcase", "graduation"] as const;

/** «Для кого» — 2 карточки с коротким текстом. */
export function Audience({ dict }: { dict: Dictionary["audience"] }) {
  return (
    <Section id={sectionIds.audience}>
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {dict.items.map((item, i) => (
          <article
            key={item.title}
            className="rounded-card border border-line bg-white p-7 shadow-card sm:p-9"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Icon name={icons[i % icons.length]} size={24} />
            </span>
            <h3 className="mt-6 text-xl font-bold text-ink sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-[17px] leading-relaxed text-ink-muted">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
