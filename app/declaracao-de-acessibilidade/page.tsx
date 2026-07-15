import type { Metadata } from "next";
import { AccessibilityContent } from "@/components/legal/accessibility-content";
import { translations } from "@/lib/translations";

const TITLE = translations.pt["page.acessibilidade.title"];
const DESCRIPTION = translations.pt["page.acessibilidade.description"];
const PATH = "/declaracao-de-acessibilidade";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
};

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
