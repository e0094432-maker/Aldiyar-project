import { Eyebrow } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { sectionIds } from "@/i18n/paths";

/** «Важно знать — Говорим сразу»: список ограничений на спокойном фоне. */
export function Important({ dict }: { dict: Dictionary["important"] }) {
  return (
    <section id={sectionIds.important} className="py-8 sm:py-12">
      <div className="container-page">
        <div className="grid gap-8 rounded-card bg-calm p-7 sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-14 lg:p-14">
          <div>
            <Eyebrow>{dict.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-[1.75rem] leading-tight font-bold tracking-tight text-ink sm:text-4xl">
              {dict.title}
            </h2>
          </div>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {dict.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[16px] leading-relaxed text-ink"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.7rem] h-px w-4 shrink-0 bg-ink/50"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
