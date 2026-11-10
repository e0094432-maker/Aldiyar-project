import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/onest";
import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { site } from "@/config/site";
import { getDictionaryFor } from "@/content/dictionaries";
import { hasLocale, localeHreflang, locales } from "@/i18n/config";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionaryFor(lang);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${dict.meta.title} — ${site.name}`,
      template: `%s — ${site.name}`,
    },
    description: dict.meta.description,
    applicationName: site.name,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={localeHreflang[lang]} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
