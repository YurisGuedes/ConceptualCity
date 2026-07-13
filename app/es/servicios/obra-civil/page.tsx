import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { ServiceDetail } from "@/components/sections/service-detail";
import { CtaBand } from "@/components/sections/cta-band";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = `${translations.es["svc3.h3"]} | Conceptual City`;
const DESCRIPTION = translations.es["svcpage3.intro"];
const PATH = "/es/servicios/obra-civil";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { "pt-PT": "/servicos/obra-civil", "es-ES": PATH, "x-default": "/servicos/obra-civil" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "es_ES" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ObraCivilEsPage() {
  return (
    <I18nProvider fixedLang="es">
      <SiteHeader />
      <main>
        <ServiceDetail index={3} />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
