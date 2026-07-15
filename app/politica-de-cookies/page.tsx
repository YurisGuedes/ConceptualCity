import type { Metadata } from "next";
import { CookiesContent } from "@/components/legal/cookies-content";
import { translations } from "@/lib/translations";

const TITLE = translations.pt["page.politicacookies.title"];
const DESCRIPTION = translations.pt["page.politicacookies.description"];
const PATH = "/politica-de-cookies";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
};

export default function CookiePolicyPage() {
  return <CookiesContent />;
}
