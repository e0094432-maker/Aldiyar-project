import type { ReactNode } from "react";
import { T } from "./T";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
  as: Tag = "h2",
}: HeadingProps) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="mt-3 text-[1.75rem] leading-tight font-bold tracking-tight text-balance text-ink sm:text-4xl">
        <T>{title}</T>
      </Tag>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-pretty text-ink-muted">
          <T>{subtitle}</T>
        </p>
      )}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand uppercase">
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      {children}
    </p>
  );
}
