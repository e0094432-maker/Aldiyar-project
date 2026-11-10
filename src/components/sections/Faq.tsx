import { Section, SectionHeading } from "@/components/ui/Section";
import { T } from "@/components/ui/T";
import type { FaqItem } from "@/content/dictionaries/types";

type Props = {
  id?: string;
  index?: string;
  eyebrow?: string;
  title: string;
  items: FaqItem[];
  className?: string;
};

/**
 * Вопросы — аккордеон: ответ раскрывается по клику.
 * На нативном <details>, работает без JS. Содержит JSON-LD FAQPage для поиска.
 */
export function Faq({
  id,
  index,
  eyebrow,
  title,
  items,
  className = "",
}: Props) {
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
      <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading index={index} eyebrow={eyebrow} title={title} />
        </div>
        <div className="border-t border-ink/80">
          {items.map((item, i) => (
            <details
              key={item.q}
              name={id ?? "faq"}
              className="reveal group border-b border-line"
            >
              <summary className="flex cursor-pointer items-baseline gap-5 py-6 text-left sm:gap-8 sm:py-7">
                <span className="w-6 shrink-0 label-caps text-brass tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-[1.45rem] leading-snug text-ink transition-colors group-hover:text-brass sm:text-[1.7rem]">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="relative top-1 size-5 shrink-0 self-center"
                >
                  <span className="absolute top-1/2 left-0 h-px w-5 bg-ink" />
                  <span className="absolute top-0 left-1/2 h-5 w-px bg-ink transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pl-11 text-[16.5px] leading-relaxed text-ink-muted sm:pl-14">
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
