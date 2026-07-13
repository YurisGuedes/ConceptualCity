import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Contact } from "@/components/sections/contact";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";

const TITLE = translations.pt["page.contacto.title"];
const DESCRIPTION = translations.pt["page.contacto.description"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/contacto",
    languages: { "pt-PT": "/contacto", "es-ES": "/es/contacto", "x-default": "/contacto" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contacto", locale: "pt_PT" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ContactoPage() {
  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader />
      <main>
        <Contact headingLevel="h1" />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
