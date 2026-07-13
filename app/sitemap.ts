import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Each entry: [PT path, ES path]. Every dedicated page gets bidirectional
// hreflang alternates, same pattern as the home routes below.
const bilingualPages: Array<[pt: string, es: string, priority: number]> = [
  ["/quem-somos", "/es/quienes-somos", 0.8],
  ["/servicos", "/es/servicios", 0.9],
  ["/servicos/mao-de-obra-qualificada", "/es/servicios/mano-de-obra-cualificada", 0.7],
  ["/servicos/edificacao", "/es/servicios/edificacion", 0.7],
  ["/servicos/obra-civil", "/es/servicios/obra-civil", 0.7],
  ["/servicos/servicos-auxiliares", "/es/servicios/servicios-auxiliares-construccion", 0.7],
  ["/projetos", "/es/proyectos", 0.8],
  ["/contacto", "/es/contacto", 0.8],
  ["/trabalhe-connosco", "/es/trabaja-con-nosotros", 0.6],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const homeLanguages = { "pt-PT": SITE_URL, "es-ES": `${SITE_URL}/es`, "x-default": SITE_URL };
  const legalPages = ["/privacidade", "/aviso-legal", "/politica-de-cookies", "/declaracao-de-acessibilidade"];

  const bilingualEntries = bilingualPages.flatMap(([pt, es, priority]) => {
    const languages = { "pt-PT": `${SITE_URL}${pt}`, "es-ES": `${SITE_URL}${es}`, "x-default": `${SITE_URL}${pt}` };
    return [
      { url: `${SITE_URL}${pt}`, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: `${SITE_URL}${es}`, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages: homeLanguages } },
    {
      url: `${SITE_URL}/es`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    ...bilingualEntries,
    ...legalPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
