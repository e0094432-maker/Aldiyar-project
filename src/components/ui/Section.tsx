import type { ReactNode } from "react";
import { T } from "./T";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`py-20 sm:py-24 lg:py-32 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

type HeadingProps = {
  /** Номер раздела «01», «02» … — как в документе. */
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  as?: "h1" | "h2";
  tone?: "light" | "dark";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  className = "",
  as: Tag = "h2",
  tone = "light",
}: HeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      {(eyebrow || index) && (
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={`mt-5 font-display text-[2.5rem] leading-[1.02] text-balance sm:text-[3.25rem] lg:text-[3.75rem] ${dark ? "text-paper" : "text-ink"}`}
      >
        <T>{title}</T>
      </Tag>
      {subtitle && (
        <p
          className={`mt-6 max-w-xl text-lg leading-relaxed text-pretty ${dark ? "text-paper/65" : "text-ink-muted"}`}
        >
          <T>{subtitle}</T>
        </p>
      )}
    </div>
  );
}

export function Eyebrow({
  index,
  tone = "light",
  children,
}: {
  index?: string;
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <p
      className={`flex items-center gap-3 label-caps ${dark ? "text-brass-light" : "text-brass"}`}
    >
      {index && <span className="tabular-nums">{index}</span>}
      <span
        aria-hidden="true"
        className={`h-px w-10 ${dark ? "bg-brass-light/50" : "bg-brass/50"}`}
      />
      {children && (
        <span className={dark ? "text-paper/70" : "text-ink-muted"}>
          {children}
        </span>
      )}
    </p>
  );
}
