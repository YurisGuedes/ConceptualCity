import type { Metadata } from "next";
import { CookiesContent } from "@/components/legal/cookies-content";
import { translations } from "@/lib/translations";
import { I18nProvider } from "@/lib/i18n-context";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.es["page.politicacookies.title"];
const DESCRIPTION = translations.es["page.politicacookies.description"];
// Absolute — see app/es/page.tsx for why (still reachable via .pt today).
const PATH = `${DOMAIN_ORIGINS.es}${ROUTES.politicaCookies.es}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.politicaCookies.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.politicaCookies.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.politicaCookies.pt}`,
    },
  },
};

export default function CookiePolicyEsPage() {
  return (
    <I18nProvider fixedLang="es">
      <CookiesContent />
    </I18nProvider>
  );
}
