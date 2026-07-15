import type { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/privacy-content";
import { translations } from "@/lib/translations";

const TITLE = translations.pt["page.privacidade.title"];
const DESCRIPTION = translations.pt["page.privacidade.description"];
const PATH = "/privacidade";

// Single URL shared by both languages (toggled client-side, see
// lib/i18n-context.tsx's non-fixedLang behavior) — no /es route to pair
// with, so no hreflang alternates here, just a self-referencing canonical
// (this previously inherited the homepage's canonical, which kept this page
// out of Google's index as a distinct result).
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
