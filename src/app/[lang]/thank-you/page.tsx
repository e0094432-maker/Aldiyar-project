import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { T } from "@/components/ui/T";
import { whatsappUrl } from "@/config/site";
import { getDictionaryFor } from "@/content/dictionaries";
import { hasLocale } from "@/i18n/config";
import { paths } from "@/i18n/paths";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/thank-you">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionaryFor(lang);
  return pageMetadata({
    locale: lang,
    path: paths.thanks,
    title: dict.thanks.title,
    description: dict.thanks.text,
    noindex: true,
  });
}

/** «Спасибо за заявку» — сюда ведёт форма после отправки. */
export default async function ThankYouPage({
  params,
}: PageProps<"/[lang]/thank-you">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionaryFor(lang);

  return (
    <section className="grain relative overflow-hidden bg-ink blueprint py-24 text-paper sm:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="mx-auto size-28"
          >
            {[50, 36, 22].map((r, i) => (
              <path
                key={r}
                d={`M${60 - r} 110V${110 - r * 0.6}A${r} ${r} 0 0 1 ${60 + r} ${110 - r * 0.6}V110`}
                pathLength={1}
                strokeDasharray="1"
                fill="none"
                stroke={i === 0 ? "#d2b47c" : "#f7f3ec"}
                strokeOpacity={i === 0 ? 1 : 0.6 - i * 0.15}
                strokeWidth="1.5"
                className="animate-draw"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
            <path
              d="m48 86 8 8 16-18"
              fill="none"
              stroke="#d2b47c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1"
              className="animate-draw"
              style={{ animationDelay: "600ms" }}
            />
          </svg>
          <h1 className="mt-10 animate-rise font-display text-[3rem] leading-none sm:text-[4.5rem]">
            {dict.thanks.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-lg animate-rise text-lg leading-relaxed text-paper/70"
            style={{ animationDelay: "150ms" }}
          >
            <T>{dict.thanks.text}</T>
          </p>
          <div
            className="mt-12 flex animate-rise flex-col justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "300ms" }}
          >
            <ButtonLink
              href={whatsappUrl(dict.common.whatsappPrefill)}
              variant="whatsapp"
              size="lg"
              icon="whatsapp"
              external
            >
              {dict.common.whatsapp}
            </ButtonLink>
            <ButtonLink
              href={paths.home(lang)}
              variant="outlineLight"
              size="lg"
            >
              {dict.common.backHome}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
