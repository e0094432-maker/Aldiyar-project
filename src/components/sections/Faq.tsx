import { Section, SectionHeading } from "@/components/ui/Section";
import { T } from "@/components/ui/T";
import type { FaqItem } from "@/content/dictionaries/types";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  items: FaqItem[];
  className?: string;
};

/**
 * Вопросы — аккордеон: ответ раскрывается по клику.
 * На нативном <details>, работает без JS. Содержит JSON-LD FAQPage для поиска.
 */
export function Faq({ id, eyebrow, title, items, className = "" }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <Section id={id} className={className}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.q} name={id ?? "faq"} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold text-ink transition-colors hover:text-brand sm:text-lg">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative size-8 shrink-0 rounded-full border border-line bg-white transition-colors group-open:border-brand group-open:bg-brand"
                >
                  <span className="absolute top-1/2 left-1/2 h-0.5 w-3 -translate-1/2 rounded bg-ink group-open:bg-white" />
                  <span className="absolute top-1/2 left-1/2 h-3 w-0.5 -translate-1/2 rounded bg-ink transition-transform group-open:scale-y-0 group-open:bg-white" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-ink-muted">
                <T>{item.a}</T>
              </p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Section>
  );
}
