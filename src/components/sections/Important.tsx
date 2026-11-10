import { Eyebrow } from "@/components/ui/Section";
import type { Dictionary } from "@/content/dictionaries/types";
import { sectionIds } from "@/i18n/paths";

/** «Важно знать — Говорим сразу»: список ограничений, оформлен как оговорки в документе. */
export function Important({ dict }: { dict: Dictionary["important"] }) {
  return (
    <section id={sectionIds.important} className="pb-20 sm:pb-24 lg:pb-32">
      <div className="container-page">
        <div className="reveal relative bg-parchment p-2 sm:p-3">
          {/* двойная рамка, как у официального бланка */}
          <div className="border border-brass/40 p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
              <div>
                <Eyebrow index="04">{dict.eyebrow}</Eyebrow>
                <h2 className="mt-5 font-display text-[2.5rem] leading-none text-ink sm:text-[3.25rem]">
                  <span className="mr-3 text-brass" aria-hidden="true">
                    §
                  </span>
                  {dict.title}
                </h2>
              </div>
              <ol className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
                {dict.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 border-t border-brass/30 pt-5 text-[16px] leading-relaxed text-ink"
                  >
                    <span className="font-display text-xl leading-none text-brass tabular-nums">
                      {i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
