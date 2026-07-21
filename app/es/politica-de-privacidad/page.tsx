import type { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/privacy-content";
import { translations } from "@/lib/translations";
import { I18nProvider } from "@/lib/i18n-context";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.es["page.privacidade.title"];
const DESCRIPTION = translations.es["page.privacidade.description"];
// Absolute — see app/es/page.tsx for why (still reachable via .pt today).
const PATH = `${DOMAIN_ORIGINS.es}${ROUTES.privacidade.es}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.privacidade.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.privacidade.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.privacidade.pt}`,
    },
  },
};

export default function PrivacyEsPage() {
  return (
    <I18nProvider fixedLang="es">
      <PrivacyContent />
    </I18nProvider>
  );
}
