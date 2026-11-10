import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
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
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Icon name="check" size={30} strokeWidth={2.5} />
          </span>
          <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {dict.thanks.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            <T>{dict.thanks.text}</T>
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl(dict.common.whatsappPrefill)}
              variant="whatsapp"
              size="lg"
              icon="whatsapp"
              external
            >
              {dict.common.whatsapp}
            </ButtonLink>
            <ButtonLink href={paths.home(lang)} variant="secondary" size="lg">
              {dict.common.backHome}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
