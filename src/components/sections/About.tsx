import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { sectionIds } from "@/i18n/paths";

const icons = ["target", "scale", "shield"] as const;

type Props = {
  dict: Dictionary["about"];
  cta: { href: string; label: string };
  whatsapp: { href: string; label: string };
};

/** О компании: текст + 3 пункта + 2 кнопки, без фото и имён. Тёмная «манифест»-полоса. */
export function About({ dict, cta, whatsapp }: Props) {
  return (
    <section
      id={sectionIds.about}
      className="grain relative overflow-hidden bg-ink blueprint py-20 text-paper sm:py-24 lg:py-32"
    >
      <div className="container-page">
        <div className="reveal">
          <Eyebrow index="05" tone="dark">
            {dict.eyebrow}
          </Eyebrow>
          <h2 className="mt-6 max-w-5xl font-display text-[2.75rem] leading-[1] text-balance sm:text-[4rem] lg:text-[5.25rem]">
            {dict.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-20">
          <div className="reveal">
            <p className="max-w-2xl text-xl leading-relaxed text-paper/75">
              {dict.text}
            </p>
            <ul className="mt-12 grid gap-8 border-t border-paper/10 pt-10 sm:grid-cols-3">
              {dict.points.map((point, i) => (
                <li key={point.title}>
                  <Icon
                    name={icons[i % icons.length]}
                    size={24}
                    strokeWidth={1.4}
                    className="text-brass-light"
                  />
                  <h3 className="mt-4 font-display text-[1.4rem] leading-tight">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-paper/60">
                    {point.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal flex flex-col gap-3 lg:pb-1">
            <ButtonLink
              href={cta.href}
              variant="accent"
              size="lg"
              arrow
              className="w-full"
            >
              {cta.label}
            </ButtonLink>
            <ButtonLink
              href={whatsapp.href}
              variant="outlineLight"
              size="lg"
              icon="whatsapp"
              className="w-full"
              external
            >
              {whatsapp.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
