import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Services } from "@/components/sections/services";
import { Trades } from "@/components/sections/trades";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = translations.pt["page.servicos.title"];
const DESCRIPTION = translations.pt["page.servicos.description"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/servicos",
    languages: { "pt-PT": "/servicos", "es-ES": "/es/servicios", "x-default": "/servicos" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/servicos", locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ServicosPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader />
      <main>
        <Services headingLevel="h1" />
        <Trades />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
