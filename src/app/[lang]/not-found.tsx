import { ButtonLink } from "@/components/ui/Button";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { paths } from "@/i18n/paths";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <section className="py-24 sm:py-36">
      <div className="container-page max-w-xl text-center">
        <p className="font-display text-[7rem] leading-none text-brass italic">
          404
        </p>
        <h1 className="mt-6 font-display text-[2.5rem] leading-tight text-ink">
          {dict.notFound.title}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{dict.notFound.text}</p>
        <ButtonLink href={paths.home(locale)} size="lg" arrow className="mt-10">
          {dict.common.backHome}
        </ButtonLink>
      </div>
    </section>
  );
}
