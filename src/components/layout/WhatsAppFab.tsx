import { Icon } from "@/components/ui/Icon";
import { whatsappUrl } from "@/config/site";
import { getDictionary } from "@/i18n/get-dictionary";

/** Круглая кнопка WhatsApp в углу экрана — на всех страницах. */
export async function WhatsAppFab() {
  const dict = await getDictionary();
  return (
    <a
      href={whatsappUrl(dict.common.whatsappPrefill)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.common.whatsapp}
      title={dict.common.whatsapp}
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
