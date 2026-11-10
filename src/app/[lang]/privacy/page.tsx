import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { T } from "@/components/ui/T";
import { getDictionaryFor } from "@/content/dictionaries";
import { hasLocale } from "@/i18n/config";
import { paths } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionaryFor(lang);
  return pageMetadata({
    locale: lang,
    path: paths.privacy,
    title: dict.privacy.title,
    description: dict.privacy.sections[0].paragraphs[0],
  });
}

/** Политика конфиденциальности — на трёх языках. */
export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionaryFor(lang).privacy;

  return (
    <article className="py-16 sm:py-24">
      <div className="container-page max-w-3xl">
        <p className="label-caps text-brass">EduForge Advisory</p>
        <h1 className="mt-5 font-display text-[2.75rem] leading-none text-ink sm:text-[4rem]">
          {t.title}
        </h1>
        <p className="mt-5 text-ink-subtle">
          <T>{t.updated}</T>
        </p>
        <p className="mt-8 border-l-2 border-brass bg-brass-soft/60 px-5 py-4 text-[15px] text-ink">
          {t.draftNote}
        </p>

        <div className="mt-14 space-y-12 border-t border-line pt-12">
          {t.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-[1.75rem] leading-tight text-ink">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-[16.5px] leading-relaxed text-ink-muted">
                {section.paragraphs.map((p) => (
                  <p key={p}>
                    <T>{p}</T>
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
