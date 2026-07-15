"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Hero background only — decorative/atmospheric, sits behind the headline
// with a dark gradient over it. AI-generated (confirmed with the user
// 2026-07), used deliberately only here: mood-setting backdrop, never
// presented as a real jobsite photo or as project evidence.
const HERO_IMAGES: Record<1 | 2 | 3 | 4, string> = {
  1: "/img/svchero-maodeobra.jpg",
  2: "/img/svchero-edificacao.jpg",
  3: "/img/svchero-obracivil.jpg",
  4: "/img/svchero-auxiliares.jpg",
};

// Real jobsite photos (already used elsewhere on the site) — the actual
// proof placed next to the copy, right below the decorative hero.
const REAL_IMAGES: Record<1 | 2 | 3 | 4, { src: string; alt: string }> = {
  1: { src: "/img/servico-01-maodeobra.jpg", alt: "Grua e edifício em construção" },
  2: { src: "/img/servico-02-edificacao.jpg", alt: "Edifícios em construção com grua" },
  3: { src: "/img/servico-03-obracivil.jpg", alt: "Grande obra civil com várias gruas" },
  4: { src: "/img/servico-04-auxiliares.jpg", alt: "Obra urbana com bomba de betão" },
};

const USE_CASES = [1, 2, 3, 4] as const;
const FAQS = [1, 2, 3] as const;

export function ServiceDetail({ index }: { index: 1 | 2 | 3 | 4 }) {
  const { t } = useI18n();
  const real = REAL_IMAGES[index];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((n) => ({
      "@type": "Question",
      name: t(`svcpage${index}.faq${n}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`svcpage${index}.faq${n}.a`) },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="svc-hero">
        <Image src={HERO_IMAGES[index]} alt="" fill sizes="100vw" preload />
        <div className="svc-hero-content">
          <div className="wrap">
            <span className="eyebrow">{t("services.eyebrow")}</span>
            <h1 className="sec-title">{t(`svc${index}.h3`)}</h1>
          </div>
        </div>
      </section>
      <section className="pad">
        <div className="wrap svcpage-split">
          <div className="svcpage-body reveal">
            <p>{t(`svcpage${index}.intro`)}</p>
            <p>{t(`svcpage${index}.body1`)}</p>
            <p>{t(`svcpage${index}.body2`)}</p>
          </div>
          <div className="svcpage-media reveal">
            <Image src={real.src} alt={real.alt} fill sizes="(max-width: 980px) 100vw, 45vw" />
          </div>
        </div>
      </section>
      <section className="pad">
        <div className="wrap">
          <div className="sec-head center reveal">
            <h2 className="sec-title">{t(`svcpage${index}.usecases.h2`)}</h2>
          </div>
          <div className="svc-usecases-grid stagger">
            {USE_CASES.map((n) => (
              <div className="svc-usecase" key={n}>
                <h3>{t(`svcpage${index}.uc${n}.h3`)}</h3>
                <p>{t(`svcpage${index}.uc${n}.p`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="svc-faq pad">
        <div className="wrap">
          <div className="sec-head center reveal">
            <h2 className="sec-title">{t(`svcpage${index}.faq.h2`)}</h2>
          </div>
          <div className="svc-faq-list reveal">
            <Accordion className="svc-faq-accordion" defaultValue={[1]} hiddenUntilFound>
              {FAQS.map((n) => (
                <AccordionItem key={n} value={n} className="svc-faq-item">
                  <AccordionTrigger className="svc-faq-trigger">{t(`svcpage${index}.faq${n}.q`)}</AccordionTrigger>
                  <AccordionContent className="svc-faq-answer">
                    <p>{t(`svcpage${index}.faq${n}.a`)}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
