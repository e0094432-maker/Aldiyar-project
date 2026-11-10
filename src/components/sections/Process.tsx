import { Section, SectionHeading } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { sectionIds } from "@/i18n/paths";

const roman = ["I", "II", "III", "IV", "V", "VI"];

/** «Как работаем» — 4 пронумерованных шага. */
export function Process({ dict }: { dict: Dictionary["process"] }) {
  return (
    <Section id={sectionIds.process}>
      <SectionHeading index="03" eyebrow={dict.eyebrow} title={dict.title} />

      <ol className="relative mt-16 grid gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {/* общая линия-таймлайн */}
        <span
          aria-hidden="true"
          className="absolute top-[2.15rem] right-0 left-0 hidden h-px bg-line lg:block"
        />
        {dict.steps.map((step, i) => (
          <li key={step.title} className="reveal relative lg:pr-8">
            <div className="flex items-center gap-4">
              <span className="relative z-10 inline-flex size-[4.3rem] items-center justify-center rounded-full border border-brass/50 bg-paper font-display text-[1.9rem] text-brass italic">
                {roman[i]}
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-line lg:hidden"
              />
            </div>
            <h3 className="mt-7 font-display text-[1.75rem] leading-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-3 max-w-xs text-[16px] leading-relaxed text-ink-muted">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
