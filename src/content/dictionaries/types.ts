import type { ServiceSlug } from "@/content/services";

export type FaqItem = { q: string; a: string };

export type ServiceContent = {
  /** Название на карточке и в заголовке страницы услуги. */
  title: string;
  /** 3 пункта на карточке главной. */
  points: [string, string, string];
  /** Подзаголовок первого экрана страницы услуги. */
  lead: string;
  forWhom: string[];
  /** Что входит — 5–6 пунктов. */
  includes: string[];
  /** Что вы получаете на выходе. */
  result: string[];
  /** Что не входит. */
  excludes: string[];
  /** 3–4 вопроса. */
  faq: FaqItem[];
};

export type LegalSection = { title: string; paragraphs: string[] };

export type Dictionary = {
  meta: {
    siteName: string;
    title: string;
    description: string;
  };
  nav: {
    services: string;
    process: string;
    important: string;
    faq: string;
    contacts: string;
  };
  common: {
    cta: string;
    howWeWork: string;
    more: string;
    whatsapp: string;
    telegram: string;
    backHome: string;
    menu: string;
    closeMenu: string;
    language: string;
    home: string;
    whatsappPrefill: string;
    placeholderNote: string;
  };
  hero: {
    title: string;
    subtitle: string;
    facts: string[];
  };
  audience: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<ServiceSlug, ServiceContent>;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; text: string }[];
  };
  important: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    text: string;
    points: { title: string; text: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  form: {
    eyebrow: string;
    title: string;
    note: string;
    fields: {
      name: string;
      phone: string;
      email: string;
      role: string;
      stage: string;
      city: string;
      message: string;
      messagePlaceholder: string;
    };
    select: string;
    roles: { company: string; university: string; other: string };
    stages: {
      idea: string;
      negotiating: string;
      draft: string;
      preparing: string;
    };
    consentBefore: string;
    consentLink: string;
    consentAfter: string;
    submit: string;
    sending: string;
    requiredHint: string;
    errors: {
      required: string;
      email: string;
      consent: string;
      generic: string;
    };
  };
  servicePage: {
    forWhom: string;
    includes: string;
    result: string;
    excludes: string;
    faq: string;
    other: string;
  };
  contactsPage: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    messengers: string;
    hours: string;
    requisites: string;
    openMap: string;
    mapPlaceholder: string;
  };
  thanks: {
    title: string;
    text: string;
  };
  notFound: {
    title: string;
    text: string;
  };
  privacy: {
    title: string;
    updated: string;
    draftNote: string;
    sections: LegalSection[];
  };
  footer: {
    tagline: string;
    navTitle: string;
    contactsTitle: string;
    requisitesTitle: string;
    allContacts: string;
    privacy: string;
    disclaimer: string;
    rights: string;
  };
  contacts: {
    /** Полный адрес офиса в принятом для языка порядке. */
    address: string;
    hours: string;
    requisites: string[];
  };
  /** Автоответ клиенту после отправки заявки (если указан email). */
  mail: {
    autoReplySubject: string;
    autoReplyGreeting: string;
    autoReplyBody: string;
    autoReplySignature: string;
  };
};
