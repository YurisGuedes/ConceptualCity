import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const legalPages = ["/privacidade", "/aviso-legal", "/politica-de-cookies", "/declaracao-de-acessibilidade"];

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    ...legalPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
