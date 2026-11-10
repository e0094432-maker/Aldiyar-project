import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { sectionIds } from "@/i18n/paths";

const icons = ["briefcase", "graduation"] as const;

/** «Для кого» — 2 карточки с коротким текстом. */
export function Audience({ dict }: { dict: Dictionary["audience"] }) {
  return (
    <Section id={sectionIds.audience}>
      <SectionHeading index="01" eyebrow={dict.eyebrow} title={dict.title} />

      <div className="mt-14 grid border-y border-line md:grid-cols-2">
        {dict.items.map((item, i) => (
          <article
            key={item.title}
            className={`reveal group relative overflow-hidden py-10 transition-colors duration-500 hover:bg-card sm:px-10 sm:py-14 ${
              i > 0
                ? "border-t border-line md:border-t-0 md:border-l"
                : "md:pl-0"
            }`}
          >
            {/* арка-водяной знак */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 200"
              className="pointer-events-none absolute -right-10 -bottom-16 size-64 text-brass opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.16]"
            >
              <path
                d="M20 200V100a80 80 0 0 1 160 0v100M55 200v-95a45 45 0 0 1 90 0v95"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>

            <div className="flex items-center gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-brass/40 text-brass">
                <Icon
                  name={icons[i % icons.length]}
                  size={22}
                  strokeWidth={1.5}
                />
              </span>
              <span className="font-display text-2xl text-brass italic">
                {String.fromCharCode(65 + i)}.
              </span>
            </div>
            <h3 className="mt-8 font-display text-[2rem] leading-[1.08] text-balance text-ink sm:text-[2.4rem]">
              {item.title}
            </h3>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-muted">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
