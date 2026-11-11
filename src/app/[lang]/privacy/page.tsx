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
    <article className="py-14 sm:py-20">
      <div className="container-page max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-[2.75rem] sm:leading-tight">
          {t.title}
        </h1>
        <p className="mt-3 text-ink-subtle">
          <T>{t.updated}</T>
        </p>
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-[15px] text-amber-900">
          {t.draftNote}
        </p>

        <div className="mt-10 space-y-10">
          {t.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-ink">{section.title}</h2>
              <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-ink-muted">
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
