import Link from "next/link";

/** Временный логотип: знак-арка + название антиквой. Заменить, когда будет фирменный. */
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
      className="group inline-flex shrink-0 items-center gap-3"
      aria-label="EduForge Advisory"
    >
      <LogoMark light={light} />
      <span className="flex flex-col">
        <span
          className={`font-display text-[1.45rem] leading-none ${light ? "text-paper" : "text-ink"}`}
        >
          EduForge
        </span>
        <span
          className={`mt-1 text-[9.5px] leading-none font-semibold tracking-[0.34em] uppercase ${light ? "text-brass-light" : "text-brass"}`}
        >
          Advisory
        </span>
      </span>
    </Link>
  );
}

export function LogoMark({ light = false }: { light?: boolean }) {
  return (
    <svg
      viewBox="0 0 34 34"
      width="34"
      height="34"
      aria-hidden="true"
      className="transition-transform duration-500 group-hover:-translate-y-0.5"
    >
      <rect
        x="0.5"
        y="0.5"
        width="33"
        height="33"
        rx="3"
        fill={light ? "transparent" : "#0c1a32"}
        stroke={light ? "#d2b47c" : "#0c1a32"}
        strokeOpacity={light ? 0.6 : 1}
      />
      <path
        d="M9 26V16a8 8 0 0 1 16 0v10"
        fill="none"
        stroke={light ? "#f7f3ec" : "#f7f3ec"}
        strokeWidth="1.6"
      />
      <path
        d="M13.5 26v-9.5a3.5 3.5 0 0 1 7 0V26"
        fill="none"
        stroke="#d2b47c"
        strokeWidth="1.6"
      />
      <path d="M6 26h22" stroke="#d2b47c" strokeWidth="1.6" />
    </svg>
  );
}
