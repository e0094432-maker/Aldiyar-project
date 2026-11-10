/**
 * Абстрактная графика первого экрана — «врата»: вложенные арки, уходящий в перспективу
 * пол и латунное «солнце». Арки прорисовываются при загрузке. Без людей и фото.
 */
export function HeroGraphic({ className = "" }: { className?: string }) {
  const cx = 260;
  const base = 470;
  const arches = [
    { w: 200, h: 150 },
    { w: 160, h: 120 },
    { w: 120, h: 90 },
    { w: 80, h: 60 },
    { w: 40, h: 30 },
  ];
  const floorTargets = [-180, -60, 60, 160, 260, 360, 460, 580, 700];
  const floorRows = [488, 512, 545];

  return (
    <svg
      viewBox="0 0 520 580"
      aria-hidden="true"
      role="presentation"
      className={className}
    >
      <defs>
        <radialGradient id="hg-glow" cx="50%" cy="62%" r="50%">
          <stop offset="0" stopColor="#d2b47c" stopOpacity="0.28" />
          <stop offset="0.55" stopColor="#d2b47c" stopOpacity="0.06" />
          <stop offset="1" stopColor="#d2b47c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hg-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f3ec" stopOpacity="0.07" />
          <stop offset="1" stopColor="#f7f3ec" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hg-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f3ec" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f7f3ec" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hg-floor-clip">
          <rect x="0" y={base} width="520" height={580 - base} />
        </clipPath>
      </defs>

      <ellipse cx={cx} cy={base - 110} rx="250" ry="250" fill="url(#hg-glow)" />

      {/* Печать-циркуль в углу */}
      <g
        className="origin-[440px_96px] animate-[turn_90s_linear_infinite] motion-reduce:animate-none"
        stroke="#d2b47c"
        fill="none"
        strokeOpacity="0.35"
      >
        <circle cx="440" cy="96" r="46" strokeDasharray="2 6" />
        <circle cx="440" cy="96" r="34" strokeOpacity="0.2" />
      </g>
      <path
        d="M440 70v52M414 96h52"
        stroke="#d2b47c"
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {/* Заливка внешней арки */}
      <path
        d={`M${cx - 200} ${base}V${base - 150}A200 200 0 0 1 ${cx + 200} ${base - 150}V${base}Z`}
        fill="url(#hg-inner)"
      />

      {arches.map(({ w, h }, i) => (
        <path
          key={w}
          d={`M${cx - w} ${base}V${base - h}A${w} ${w} 0 0 1 ${cx + w} ${base - h}V${base}`}
          pathLength={1}
          strokeDasharray="1"
          fill="none"
          stroke={i === 0 ? "#d2b47c" : "#f7f3ec"}
          strokeOpacity={i === 0 ? 0.95 : 0.75 - i * 0.13}
          strokeWidth={i === 0 ? 1.75 : 1.25}
          className="animate-draw"
          style={{ animationDelay: `${300 + i * 140}ms` }}
        />
      ))}

      {/* Латунное «солнце» */}
      <g style={{ transformOrigin: `${cx}px 372px` }}>
        <circle
          cx={cx}
          cy="372"
          r="30"
          fill="none"
          stroke="#d2b47c"
          className="animate-glow"
          style={{ transformOrigin: `${cx}px 372px` }}
        />
        <circle
          cx={cx}
          cy="372"
          r="11"
          fill="#d2b47c"
          className="animate-rise"
          style={{ animationDelay: "1.4s" }}
        />
      </g>

      {/* Горизонт и пол в перспективе */}
      <path
        d={`M10 ${base}H510`}
        stroke="#f7f3ec"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <g clipPath="url(#hg-floor-clip)" stroke="url(#hg-floor)">
        {floorTargets.map((x) => (
          <path key={x} d={`M${cx} ${base}L${x} 580`} strokeWidth="1" />
        ))}
        {floorRows.map((y) => (
          <path key={y} d={`M0 ${y}H520`} strokeWidth="1" />
        ))}
      </g>

      <text
        x="14"
        y="40"
        fill="#d2b47c"
        fillOpacity="0.7"
        fontSize="10.5"
        letterSpacing="3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        ASTANA · 51°10′N 71°26′E
      </text>
    </svg>
  );
}
