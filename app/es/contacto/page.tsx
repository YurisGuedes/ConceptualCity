import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Contact } from "@/components/sections/contact";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = translations.es["page.contacto.title"];
const DESCRIPTION = translations.es["page.contacto.description"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/contacto",
    languages: { "pt-PT": "/contacto", "es-ES": "/es/contacto", "x-default": "/contacto" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/es/contacto", locale: "es_ES" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ContactoEsPage() {
  return (
    <I18nProvider fixedLang="es">
      <SiteHeader />
      <main>
        <Contact headingLevel="h1" />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
