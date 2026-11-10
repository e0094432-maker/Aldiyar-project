import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Section";
import { T } from "@/components/ui/T";
import { site, telegramUrl, whatsappUrl } from "@/config/site";
import type { Dictionary } from "@/content/dictionaries/types";
import type { Locale } from "@/i18n/config";
import { paths, sectionIds } from "@/i18n/paths";
import { LeadForm } from "./LeadForm";

type Props = {
  locale: Locale;
  dict: Dictionary["form"];
  whatsappPrefill: string;
  /** Путь страницы, на которой стоит форма. */
  page: string;
  index?: string;
};

/** Блок «Расскажите о проекте» с формой заявки — в конце каждой страницы. */
export function LeadSection({
  locale,
  dict,
  whatsappPrefill,
  page,
  index,
}: Props) {
  return (
    <section
      id={sectionIds.request}
      className="bg-paper-2 py-20 sm:py-24 lg:py-32"
    >
      <div className="container-page">
        <div className="reveal grid overflow-hidden rounded-card border border-line shadow-lift lg:grid-cols-[1fr_1.55fr]">
          {/* левая панель: заголовок и прямые контакты */}
          <div className="grain flex flex-col bg-ink blueprint p-8 text-paper sm:p-12">
            <Eyebrow index={index} tone="dark">
              {dict.eyebrow}
            </Eyebrow>
            <h2 className="mt-6 font-display text-[2.4rem] leading-[1.04] text-balance sm:text-[3rem]">
              <T>{dict.title}</T>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-paper/60">
              <T>{dict.note}</T>
            </p>

            <div className="mt-10 border-t border-paper/10 pt-8 lg:mt-auto">
              <p className="label-caps text-brass-light">{dict.direct}</p>
              <ul className="mt-5 space-y-3 text-[15px]">
                <li>
                  <a
                    href={whatsappUrl(whatsappPrefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 transition-colors hover:text-brass-light"
                  >
                    <Icon name="whatsapp" size={18} className="text-whatsapp" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={telegramUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 transition-colors hover:text-brass-light"
                  >
                    <Icon
                      name="telegram"
                      size={18}
                      className="text-[#2aabee]"
                    />
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.tel}`}
                    className="inline-flex items-center gap-3 tabular-nums transition-colors hover:text-brass-light"
                  >
                    <Icon name="phone" size={18} className="text-brass-light" />
                    <T>{site.phone.display}</T>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* правая панель: форма */}
          <div className="bg-card p-8 sm:p-12">
            <LeadForm
              locale={locale}
              dict={dict}
              page={page}
              privacyHref={paths.privacy(locale)}
              thanksHref={paths.thanks(locale)}
            />
            <p className="mt-6 text-[13px] text-ink-subtle">
              {dict.requiredHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
