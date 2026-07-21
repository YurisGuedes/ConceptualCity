import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Contact } from "@/components/sections/contact";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.pt["page.contacto.title"];
const DESCRIPTION = translations.pt["page.contacto.description"];
const PATH = ROUTES.contacto.pt;

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
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ContactoPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader currentRoute="contacto" />
      <main>
        <Contact headingLevel="h1" />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
