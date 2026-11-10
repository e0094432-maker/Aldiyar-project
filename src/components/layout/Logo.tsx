import Link from "next/link";

/** Временный логотип: знак-арка + название. Заменить, когда будет фирменный. */
export function Logo({
  href,
  light = false,
}: {
  href: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-2.5"
      aria-label="EduForge Advisory"
    >
      <LogoMark light={light} />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[17px] font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}
        >
          EduForge
        </span>
        <span
          className={`mt-1 text-[11px] font-semibold tracking-[0.18em] uppercase ${light ? "text-white/60" : "text-ink-subtle"}`}
        >
          Advisory
        </span>
      </span>
    </Link>
  );
}

export function LogoMark({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={light ? "#fff" : "#0d1f4a"} />
      <path
        d="M8.5 24V15.5a7.5 7.5 0 0 1 15 0V24"
        fill="none"
        stroke={light ? "#0d1f4a" : "#fff"}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M13 24v-7.5a3 3 0 0 1 6 0V24"
        fill="none"
        stroke="#c39a4e"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
