import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Services } from "@/components/sections/services";
import { Trades } from "@/components/sections/trades";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = translations.es["page.servicos.title"];
const DESCRIPTION = translations.es["page.servicos.description"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/servicios",
    languages: { "pt-PT": "/servicos", "es-ES": "/es/servicios", "x-default": "/servicos" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/es/servicios", locale: "es_ES" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ServiciosPage() {
  return (
    <I18nProvider fixedLang="es">
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
