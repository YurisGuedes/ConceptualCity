import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Contact } from "@/components/sections/contact";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.es["page.contacto.title"];
const DESCRIPTION = translations.es["page.contacto.description"];
// Absolute — see app/es/page.tsx for why (still reachable via .pt today).
const PATH = `${DOMAIN_ORIGINS.es}${ROUTES.contacto.es}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.contacto.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.contacto.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.contacto.pt}`,
    },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "es_ES" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ContactoEsPage() {
  return (
    <I18nProvider fixedLang="es">
      <SiteHeader currentRoute="contacto" />
      <main>
        <Contact headingLevel="h1" />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
