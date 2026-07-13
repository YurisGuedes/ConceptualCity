import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { About } from "@/components/sections/about";
import { Pillars } from "@/components/sections/pillars";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = translations.pt["page.quemsomos.title"];
const DESCRIPTION = translations.pt["page.quemsomos.description"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/quem-somos",
    languages: { "pt-PT": "/quem-somos", "es-ES": "/es/quienes-somos", "x-default": "/quem-somos" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/quem-somos", locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function QuemSomosPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader />
      <main>
        <About headingLevel="h1" />
        <Pillars />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
