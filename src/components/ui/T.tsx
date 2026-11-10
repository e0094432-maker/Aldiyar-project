/**
 * Выводит текст и подсвечивает фрагменты в [квадратных скобках] —
 * так в ТЗ помечены данные, которые нужно подтвердить. Когда скобки
 * из текстов уберут, подсветка исчезнет сама.
 */
export function T({ children }: { children: string }) {
  if (!children.includes("[")) return <>{children}</>;
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <mark
            key={i}
            className="rounded-sm bg-amber-100 [box-decoration-break:clone] px-0.5 text-ink"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
