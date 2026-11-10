import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/components/ui/T";
import { HeroGraphic } from "./HeroGraphic";

type Crumb = { href: string; label: string };

type HeroProps = {
  id?: string;
  title: string;
  subtitle: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  facts: string[];
  breadcrumbs?: Crumb[];
};

/** Первый экран: заголовок, подзаголовок, 2 кнопки, строка из 4 фактов, абстрактная графика. */
export function Hero({
  id,
  title,
  subtitle,
  primary,
  secondary,
  facts,
  breadcrumbs,
}: HeroProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-b border-line bg-gradient-to-b from-white to-muted/60"
    >
      <div className="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
        <div>
          {breadcrumbs && (
            <nav aria-label="Breadcrumbs" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
                {breadcrumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    <Link href={c.href} className="hover:text-ink">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <h1 className="text-[2.125rem] leading-[1.1] font-extrabold tracking-tight text-balance text-ink sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">
            {subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} size="lg" variant="secondary">
              {secondary.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 grid gap-x-6 gap-y-3 text-[15px] font-medium text-ink sm:grid-cols-2 xl:flex xl:flex-wrap">
            {facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2.5">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Icon name="check" size={14} strokeWidth={2.5} />
                </span>
                <span>
                  <T>{fact}</T>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroGraphic className="mx-auto w-full max-w-md lg:max-w-none" />
      </div>
    </section>
  );
}
