import { Section, SectionHeading } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { sectionIds } from "@/i18n/paths";

/** «Как работаем» — 4 пронумерованных шага. */
export function Process({ dict }: { dict: Dictionary["process"] }) {
  return (
    <Section id={sectionIds.process}>
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
      <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {dict.steps.map((step, i) => (
          <li key={step.title} className="relative">
            {/* соединительная линия между шагами на десктопе */}
            {i < dict.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-6 left-16 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-brand/40 to-line lg:block"
              />
            )}
            <span className="relative inline-flex size-12 items-center justify-center rounded-full border-2 border-brand bg-white text-lg font-extrabold text-brand">
              {i + 1}
            </span>
            <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-muted">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
