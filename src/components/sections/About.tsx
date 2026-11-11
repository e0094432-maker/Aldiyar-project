import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { sectionIds } from "@/i18n/paths";

const icons = ["target", "scale", "shield"] as const;

type Props = {
  dict: Dictionary["about"];
  cta: { href: string; label: string };
  whatsapp: { href: string; label: string };
};

/** О компании: текст + 3 пункта + 2 кнопки, без фото и имён. */
export function About({ dict, cta, whatsapp }: Props) {
  return (
    <Section id={sectionIds.about}>
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-16">
        <div>
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {dict.text}
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {dict.points.map((point, i) => (
              <li key={point.title}>
                <Icon
                  name={icons[i % icons.length]}
                  size={24}
                  className="text-brand"
                />
                <h3 className="mt-3 font-bold text-ink">{point.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
                  {point.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 rounded-card border border-line bg-muted p-6 sm:p-8">
          <ButtonLink href={cta.href} size="lg" className="w-full">
            {cta.label}
          </ButtonLink>
          <ButtonLink
            href={whatsapp.href}
            size="lg"
            variant="secondary"
            icon="whatsapp"
            className="w-full"
            external
          >
            {whatsapp.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
