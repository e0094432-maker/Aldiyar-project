import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { T } from "@/components/ui/T";
import { HeroGraphic } from "./HeroGraphic";

type Crumb = { href: string; label: string };

type HeroProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  /** Часть заголовка курсивом латунью. */
  accent?: string;
  subtitle: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  facts: string[];
  breadcrumbs?: Crumb[];
};

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Первый экран: заголовок, подзаголовок, 2 кнопки, строка из 4 фактов, абстрактная графика. */
export function Hero({
  id,
  eyebrow,
  title,
  accent,
  subtitle,
  primary,
  secondary,
  facts,
  breadcrumbs,
}: HeroProps) {
  return (
    <section
      id={id}
      className="grain relative overflow-hidden bg-ink blueprint text-paper"
    >
      {/* мягкое латунное свечение справа */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(210_180_124/0.16),transparent)]"
      />

      <div className="relative container-page grid items-center gap-10 pt-14 pb-12 sm:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-6 lg:pt-24 lg:pb-16">
        <div>
          {breadcrumbs ? (
            <nav aria-label="Breadcrumbs" className="mb-8 animate-rise">
              <ol className="flex flex-wrap items-center gap-2 label-caps text-paper/50">
                {breadcrumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    <Link
                      href={c.href}
                      className="transition-colors hover:text-brass-light"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : (
            eyebrow && (
              <p className="flex animate-rise items-center gap-3 label-caps text-brass-light">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-brass-light/50"
                />
                {eyebrow}
              </p>
            )
          )}

          <h1
            className="mt-6 animate-rise font-display text-[2.85rem] leading-[0.98] text-balance sm:text-[4rem] lg:text-[4.75rem] xl:text-[5.25rem]"
            style={delay(120)}
          >
            <AccentTitle title={title} accent={accent} />
          </h1>

          <p
            className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-pretty text-paper/70 sm:text-[1.2rem]"
            style={delay(240)}
          >
            {subtitle}
          </p>

          <div
            className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row"
            style={delay(360)}
          >
            <ButtonLink href={primary.href} variant="accent" size="lg" arrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="outlineLight" size="lg">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>

        <HeroGraphic className="mx-auto -mb-6 w-full max-w-[26rem] animate-rise lg:mb-0 lg:max-w-none" />
      </div>

      {/* «Реестр» фактов */}
      <div className="relative border-t border-paper/10">
        <ul className="container-page grid grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <li
              key={fact}
              style={delay(480 + i * 80)}
              className={`flex animate-rise items-center gap-3 py-5 pr-4 text-[14.5px] leading-snug text-paper/85 sm:py-6 ${
                i % 2 === 1 ? "pl-4 sm:pl-6" : ""
              } ${i > 0 ? "lg:border-l lg:border-paper/10 lg:pl-6" : ""} ${
                i % 2 === 1 ? "border-l border-paper/10" : ""
              } ${i < 2 ? "border-b border-paper/10 lg:border-b-0" : ""}`}
            >
              <Icon
                name="check"
                size={16}
                strokeWidth={2.25}
                className="shrink-0 text-brass-light"
              />
              <span>
                <T>{fact}</T>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AccentTitle({ title, accent }: { title: string; accent?: string }) {
  const at = accent ? title.indexOf(accent) : -1;
  if (!accent || at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <em className="font-medium text-brass-light italic">{accent}</em>
      {title.slice(at + accent.length)}
    </>
  );
}
