import type { Metadata } from "next";
import { AccessibilityContent } from "@/components/legal/accessibility-content";
import { translations } from "@/lib/translations";
import { I18nProvider } from "@/lib/i18n-context";
import { ROUTES } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

const TITLE = translations.es["page.acessibilidade.title"];
const DESCRIPTION = translations.es["page.acessibilidade.description"];
// Absolute — see app/es/page.tsx for why (still reachable via .pt today).
const PATH = `${DOMAIN_ORIGINS.es}${ROUTES.acessibilidade.es}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "pt-PT": `${DOMAIN_ORIGINS.pt}${ROUTES.acessibilidade.pt}`,
      "es-ES": `${DOMAIN_ORIGINS.es}${ROUTES.acessibilidade.es}`,
      "x-default": `${DOMAIN_ORIGINS.pt}${ROUTES.acessibilidade.pt}`,
    },
  },
};

export default function AccessibilityEsPage() {
  return (
    <I18nProvider fixedLang="es">
      <AccessibilityContent />
    </I18nProvider>
  );
}
