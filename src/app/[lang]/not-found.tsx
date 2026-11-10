import { ButtonLink } from "@/components/ui/Button";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { paths } from "@/i18n/paths";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <section className="py-24 sm:py-32">
      <div className="container-page max-w-xl text-center">
        <p className="text-6xl font-extrabold text-brand">404</p>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">
          {dict.notFound.title}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{dict.notFound.text}</p>
        <ButtonLink href={paths.home(locale)} size="lg" className="mt-10">
          {dict.common.backHome}
        </ButtonLink>
      </div>
    </section>
  );
}
