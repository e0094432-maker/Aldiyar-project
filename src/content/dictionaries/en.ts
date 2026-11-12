import type { Dictionary } from "./types";

/** English texts. Translated from the Russian draft — needs proofreading. */
export const en: Dictionary = {
  meta: {
    siteName: "EduForge Advisory",
    title: "Opening a foreign university branch in Kazakhstan",
    description:
      "Legal support for foreign university branches in Kazakhstan: project structure, negotiations with the university, the agreement and preparation for opening.",
  },
  nav: {
    services: "Services",
    process: "How we work",
    important: "Good to know",
    faq: "FAQ",
    contacts: "Contacts",
  },
  common: {
    cta: "Discuss your project",
    howWeWork: "How we work",
    more: "Learn more",
    whatsapp: "Message us on WhatsApp",
    telegram: "Message us on Telegram",
    backHome: "Back to home",
    menu: "Menu",
    closeMenu: "Close menu",
    language: "Language",
    home: "Home",
    whatsappPrefill:
      "Hello! I would like to discuss a project to open a foreign university branch.",
    placeholderNote: "Items in [brackets] are to be confirmed",
  },
  hero: {
    title: "Opening a foreign university branch in Kazakhstan",
    subtitle:
      "We structure the project, negotiate with the university, prepare the agreement and support you through preparation for opening — in Astana, Almaty and other cities.",
    facts: [
      "First meeting — [free]",
      "Kazakhstan & AIFC law",
      "Documents in RU and EN",
      "Stage-by-stage payment",
    ],
  },
  audience: {
    eyebrow: "Who we help",
    title: "Who we work with",
    items: [
      {
        title: "Companies and investors in Kazakhstan",
        text: "You plan to open a branch of a foreign university in Kazakhstan. We help you choose a model, prepare for negotiations and structure the project under Kazakhstan law.",
      },
      {
        title: "Foreign universities",
        text: "You are considering entering the Kazakhstan market. We explain the branch and licensing requirements and support the project with your local partner.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Support at every stage of the project",
    subtitle:
      "You can bring us in at any stage — from the initial idea to preparation for opening.",
    items: {
      "legal-analysis": {
        title: "Legal analysis and structure",
        points: [
          "Analysis of the cooperation model with the university",
          "Branch and licensing requirements in Kazakhstan",
          "Risk map and recommended structure",
        ],
        lead: "We analyse how to structure cooperation with a foreign university, which requirements apply in Kazakhstan and the AIFC, and where the main risks are — before you spend time on negotiations.",
        forWhom: [
          "Companies and investors at the idea stage or choosing a partner university",
          "Foreign universities assessing entry into Kazakhstan",
          "Teams that need a legal rationale for the project for management or investors",
        ],
        includes: [
          "Analysis of possible cooperation models with the university",
          "Overview of branch requirements under Kazakhstan and AIFC law",
          "Licensing requirements for educational activities",
          "Legal risk map of the project",
          "Recommended structure and sequence of steps",
          "Meeting with your team to walk through the findings",
        ],
        result: [
          "Legal memorandum in RU and/or EN",
          "Risk map with recommendations",
          "Plan of next steps for the project",
        ],
        excludes: [
          "Business plan and financial model",
          "Tax advisory",
          "Obtaining the licence on the client's behalf",
        ],
        faq: [
          {
            q: "How long does the analysis take?",
            a: "Usually [2–4 weeks], depending on the model and the volume of documents. We confirm the timeline once we know the project.",
          },
          {
            q: "What do you need from us to start?",
            a: "A description of the idea, information about the partner university if you already have one, and any existing documents or correspondence.",
          },
          {
            q: "Can we get the memorandum in English?",
            a: "Yes. We prepare documents in Russian and English — useful if the memorandum needs to be shared with the university.",
          },
        ],
      },
      negotiations: {
        title: "Negotiations with the university",
        points: [
          "Review of the university's draft agreement",
          "Mark-ups and position on key terms",
          "Participation in negotiations",
        ],
        lead: "We review the draft agreement proposed by the university, shape your position on key terms and take part in negotiations until the wording is agreed.",
        forWhom: [
          "Companies and investors who have received a draft agreement from a university",
          "Parties already in negotiations who want to strengthen their position",
          "Foreign universities agreeing terms with a partner in Kazakhstan",
        ],
        includes: [
          "Review of the university's draft agreement",
          "Compliance check against Kazakhstan and AIFC law",
          "Position on key terms: brand, quality, governance, exit",
          "Mark-ups and comments in RU and EN",
          "Preparation for negotiation rounds",
          "Participation in negotiations",
        ],
        result: [
          "Marked-up agreement with comments",
          "Position on key terms",
          "Summary of negotiation rounds and list of open issues",
        ],
        excludes: [
          "Discussing financial terms with the university — only by separate agreement",
          "Financial model of the project",
          "Representation in court",
        ],
        faq: [
          {
            q: "Can you join in the middle of negotiations?",
            a: "Yes. We review the current draft and correspondence and pick up from where you are.",
          },
          {
            q: "Do you negotiate in English?",
            a: "Yes, negotiations and documents are in Russian and English.",
          },
          {
            q: "Do you discuss money with the university?",
            a: "No, unless agreed separately. Our scope is the legal terms of the agreement.",
          },
        ],
      },
      finalization: {
        title: "Finalising the agreement",
        points: [
          "Final version of the agreement and annexes",
          "Reconciling the RU and EN versions",
          "Support at signing",
        ],
        lead: "We bring the agreement with the university to its final form: reconcile the language versions, agree the annexes and support the signing.",
        forWhom: [
          "Parties that have agreed the main terms",
          "Projects where the Russian and English versions need to be aligned",
          "Teams preparing for signing",
        ],
        includes: [
          "Final proofreading of the agreement",
          "Reconciliation of the Russian and English versions",
          "Preparation and approval of annexes",
          "Check of signatory authority and corporate approvals",
          "Signing checklist",
          "Support at signing",
        ],
        result: [
          "Final agreement in RU and EN",
          "Set of annexes",
          "Post-signing action checklist",
        ],
        excludes: [
          "Financial terms and business plan",
          "Tax advisory",
          "Representation before state bodies without a separate arrangement",
        ],
        faq: [
          {
            q: "Can we engage you only for the signing stage?",
            a: "Yes. We check the final version and annexes and flag the risks before signing.",
          },
          {
            q: "Which language version will prevail?",
            a: "That is for the parties to decide. We advise on how to set the priority of versions and avoid discrepancies.",
          },
          {
            q: "What do you need to start?",
            a: "The current draft of the agreement, the annexes and correspondence on the agreed terms.",
          },
        ],
      },
      launch: {
        title: "Preparation for opening",
        points: [
          "Branch registration and licence — advisory",
          "Internal documents of the branch",
          "Employment, migration and corporate matters",
        ],
        lead: "We advise on branch registration and licensing, prepare internal documents and handle employment, migration and corporate matters before opening.",
        forWhom: [
          "Projects with a signed agreement with the university",
          "Companies registering a branch or legal entity",
          "Universities preparing to launch in Kazakhstan",
        ],
        includes: [
          "Advice on branch registration",
          "Advice on obtaining the licence",
          "Preparation of the branch's internal documents",
          "Employment matters: contracts and internal policies",
          "Migration matters for foreign faculty",
          "Corporate matters and governing body resolutions",
        ],
        result: [
          "Package of the branch's internal documents",
          "Opening preparation timeline",
          "Answers on registration and licensing",
        ],
        excludes: [
          "Obtaining the licence and permits on the client's behalf",
          "Representation before state bodies without a separate arrangement",
          "Business plan and tax advisory",
        ],
        faq: [
          {
            q: "Do you obtain the licence for us?",
            a: "No. The client obtains the licence and permits. We prepare you for it and advise at every step.",
          },
          {
            q: "Do you help with foreign faculty?",
            a: "Yes, we advise on employment and migration matters and prepare the documents.",
          },
          {
            q: "How long does preparation for opening take?",
            a: "It depends on the model and the licensing requirements. We draw up a realistic timeline after the analysis.",
          },
        ],
      },
    },
  },
  process: {
    eyebrow: "How we work",
    title: "Four steps from idea to opening",
    steps: [
      {
        title: "Introduction",
        text: "We discuss the project and the stage of negotiations, and quote the scope and fee.",
      },
      {
        title: "Analysis",
        text: "We prepare a legal memorandum: model, requirements, risks.",
      },
      {
        title: "Negotiations and agreement",
        text: "We handle mark-ups and negotiations until the final version.",
      },
      {
        title: "Preparation for opening",
        text: "We advise on registration, the licence and internal documents.",
      },
    ],
  },
  important: {
    eyebrow: "Good to know",
    title: "Upfront about our scope",
    items: [
      "We are advisers, not guarantors. The university decides on cooperation; the state authority decides on the licence.",
      "The client obtains the licence and permits. We prepare you for it and advise.",
      "We do not represent clients in court or before state bodies without a separate arrangement.",
      "We do not discuss financial terms with the university unless agreed separately.",
      "We do not prepare business plans, financial models or tax advice.",
    ],
  },
  about: {
    eyebrow: "About us",
    title: "We do one thing — and we do it well",
    text: "EduForge Advisory is a consulting company. We provide legal support for projects to open branches of foreign universities in Kazakhstan.",
    points: [
      {
        title: "Specialisation",
        text: "We work only on foreign university branch projects.",
      },
      {
        title: "Kazakhstan & AIFC law",
        text: "We take the requirements of both jurisdictions into account.",
      },
      {
        title: "Confidentiality",
        text: "We do not disclose project details without the client's consent.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        q: "At what stage can we contact you?",
        a: "At any stage: from the idea to a ready draft agreement from the university. The earlier, the less rework.",
      },
      {
        q: "How long will the opening take?",
        a: "It depends on the model, the university's position and the licensing requirements. We give a realistic timeline after the legal analysis.",
      },
      {
        q: "Do you guarantee the branch will open?",
        a: "No. Decisions are made by the university and state bodies. We are responsible for the quality of the legal work and flag risks in advance.",
      },
      {
        q: "How much do your services cost?",
        a: "We fix the fee in the contract once we know the project.",
      },
      {
        q: "Do you only work in Astana?",
        a: "Our office is in Astana; we work on projects across Kazakhstan.",
      },
      {
        q: "Who are your clients?",
        a: "Companies and investors opening branches, and universities themselves.",
      },
    ],
  },
  form: {
    eyebrow: "Request",
    title: "Tell us about your project — we'll reply within [1 business day]",
    note: "No mailing lists. We use your data only to reply to your request. Mon–Fri, [9:00–18:00] Astana time.",
    fields: {
      name: "Name",
      phone: "Phone / WhatsApp",
      email: "Email",
      role: "You are",
      stage: "Stage",
      city: "City",
      message: "Briefly about your task",
      messagePlaceholder:
        "E.g.: we are negotiating with a UK university and need a review of the agreement",
    },
    select: "Select",
    roles: {
      company: "Company / investor",
      university: "Foreign university",
      other: "Other",
    },
    stages: {
      idea: "Idea",
      negotiating: "In negotiations",
      draft: "Have a draft agreement",
      preparing: "Preparing to open",
    },
    consentBefore:
      "I consent to the processing of my personal data in accordance with the ",
    consentLink: "privacy policy",
    consentAfter: "",
    submit: "Send request",
    sending: "Sending…",
    requiredHint: "* — required fields",
    errors: {
      required: "Please fill in this field",
      email: "Please check your email",
      consent: "Consent to data processing is required",
      generic:
        "We couldn't send your request. Please try again or message us on WhatsApp.",
    },
  },
  servicePage: {
    forWhom: "Who it is for",
    includes: "What's included",
    result: "What you get",
    excludes: "What's not included",
    faq: "Questions about this service",
    other: "Other services",
  },
  contactsPage: {
    title: "Contacts",
    subtitle: "Office in Astana, projects across Kazakhstan.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    messengers: "Messengers",
    hours: "Office hours",
    requisites: "Company details",
    openMap: "Open in 2GIS",
    mapPlaceholder: "2GIS map will be here",
  },
  thanks: {
    title: "Thank you for your request!",
    text: "We'll reply within [1 business day]. If it's urgent, message us on WhatsApp.",
  },
  notFound: {
    title: "Page not found",
    text: "The link may be outdated or there is a typo in the address.",
  },
  privacy: {
    title: "Privacy policy",
    updated: "Version of [__.__.2026]",
    draftNote:
      "Draft. The text needs to be approved and completed with company details.",
    sections: [
      {
        title: "1. General provisions",
        paragraphs: [
          "This policy describes how [EduForge Advisory LLP] (the “Company”) collects, uses and protects the personal data of website visitors.",
          "The policy has been prepared in accordance with the Law of the Republic of Kazakhstan “On Personal Data and Their Protection”.",
        ],
      },
      {
        title: "2. What data we collect",
        paragraphs: [
          "Data you provide in the request form: name, phone, email, city, information about your role, project stage and task.",
          "Technical data: cookies required for the website to work (for example, the selected language).",
        ],
      },
      {
        title: "3. Purposes of processing",
        paragraphs: [
          "We use the data only to reply to your request and to contact you about your project. We do not send mailings.",
        ],
      },
      {
        title: "4. Legal basis",
        paragraphs: [
          "Data is processed on the basis of your consent, which you give by ticking the box in the request form.",
        ],
      },
      {
        title: "5. Storage and protection",
        paragraphs: [
          "Data is stored no longer than necessary for the purposes of processing or for the period required by Kazakhstan law.",
          "We take organisational and technical measures to protect data from unauthorised access.",
        ],
      },
      {
        title: "6. Disclosure to third parties",
        paragraphs: [
          "We do not disclose personal data to third parties except as required by Kazakhstan law.",
        ],
      },
      {
        title: "7. Your rights",
        paragraphs: [
          "You may request information about your data, its correction or deletion, or withdraw your consent by writing to [info@eduforge.kz].",
        ],
      },
      {
        title: "8. Contacts",
        paragraphs: [
          "[EduForge Advisory LLP], 55/7 Mangilik El Ave., Astana. Email: [info@eduforge.kz].",
        ],
      },
    ],
  },
  footer: {
    tagline:
      "EduForge Advisory — support for opening foreign university branches in Kazakhstan",
    navTitle: "Navigation",
    contactsTitle: "Contacts",
    requisitesTitle: "Company details",
    allContacts: "All contacts and map",
    privacy: "Privacy policy",
    disclaimer:
      "The information on this website is for general information only and does not constitute legal advice or a public offer. The university decides on cooperation; the competent state authority decides on the licence.",
    rights: "All rights reserved.",
  },
  contacts: {
    address: "55/7 Mangilik El Ave., Astana",
    hours: "Mon–Fri, [9:00–18:00] Astana time",
    requisites: [
      "[EduForge Advisory LLP]",
      "BIN [____________]",
      "IBAN [KZ__ ____ ____ ____ ____]",
      "Bank [__________], BIC [________]",
    ],
  },
  mail: {
    autoReplySubject: "EduForge Advisory: we have received your request",
    autoReplyGreeting: "Hello",
    autoReplyBody:
      "Thank you for your request! We have received it and will reply within [1 business day]. If it's urgent, message us on WhatsApp.",
    autoReplySignature: "The EduForge Advisory team",
  },
};
