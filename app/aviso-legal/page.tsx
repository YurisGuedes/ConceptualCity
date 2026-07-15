import type { Metadata } from "next";
import { LegalNoticeContent } from "@/components/legal/legal-notice-content";
import { translations } from "@/lib/translations";

const TITLE = translations.pt["page.avisolegal.title"];
const DESCRIPTION = translations.pt["page.avisolegal.description"];
const PATH = "/aviso-legal";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
};

export default function LegalNoticePage() {
  return <LegalNoticeContent />;
}
