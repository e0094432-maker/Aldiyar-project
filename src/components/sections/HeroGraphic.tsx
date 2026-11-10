/** Абстрактная графика первого экрана: арки-«ворота» без людей и фото. */
export function HeroGraphic({ className = "" }: { className?: string }) {
  const arches = [
    { w: 180, h: 120, o: 0.9 },
    { w: 140, h: 100, o: 0.55 },
    { w: 100, h: 80, o: 0.35 },
    { w: 60, h: 60, o: 0.2 },
  ];
  const cx = 240;
  const base = 352;

  return (
    <svg
      viewBox="0 0 480 400"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#13306f" />
          <stop offset="1" stopColor="#0d1f4a" />
        </linearGradient>
        <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b6cf0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#3b6cf0" stopOpacity="0" />
        </linearGradient>
        <pattern
          id="hero-dots"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.3" fill="#fff" opacity="0.14" />
        </pattern>
      </defs>

      <rect width="480" height="400" rx="28" fill="url(#hero-bg)" />
      <rect x="300" y="24" width="156" height="120" fill="url(#hero-dots)" />

      <path
        d={`M${cx - 180} ${base}V${base - 120}A180 180 0 0 1 ${cx + 180} ${base - 120}V${base}Z`}
        fill="url(#hero-fill)"
      />

      {arches.map(({ w, h, o }) => (
        <path
          key={w}
          d={`M${cx - w} ${base}V${base - h}A${w} ${w} 0 0 1 ${cx + w} ${base - h}V${base}`}
          fill="none"
          stroke="#fff"
          strokeOpacity={o}
          strokeWidth="2"
        />
      ))}

      <circle cx={cx} cy={base - 64} r="16" fill="#c39a4e" />
      <circle
        cx={cx}
        cy={base - 64}
        r="30"
        fill="none"
        stroke="#c39a4e"
        strokeOpacity="0.35"
      />

      <path
        d={`M36 ${base}H444`}
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${60 + i * 72} ${base + 14}h36`}
          stroke="#fff"
          strokeOpacity="0.12"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
