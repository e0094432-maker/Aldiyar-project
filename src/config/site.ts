/**
 * Контакты и общие настройки сайта.
 *
 * Всё, что в [квадратных скобках], нужно подтвердить у клиента.
 * Позже эти значения переедут в админку (раздел «Контакты»).
 */
export const site = {
  name: "EduForge Advisory",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  phone: {
    display: "+7 [___ ___ __ __]",
    tel: "+70000000000", // TODO: реальный номер
  },
  email: {
    display: "[info@eduforge.kz]",
    address: "info@eduforge.kz", // TODO: реальная почта
  },
  whatsapp: "70000000000", // TODO: номер для wa.me, только цифры
  telegram: "eduforge", // TODO: username без @

  /** Ссылка «Открыть в 2ГИС» и iframe карты. */
  map: {
    link: `https://2gis.kz/astana/search/${encodeURIComponent("Мәңгілік Ел 55/7")}`,
    /**
     * URL виджета 2ГИС для iframe. Сгенерировать в конструкторе:
     * https://dev.2gis.ru/widget  →  вставить сюда. Пока пусто — показываем заглушку.
     */
    embedUrl: "",
  },
} as const;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telegramUrl() {
  return `https://t.me/${site.telegram}`;
}
