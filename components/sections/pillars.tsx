"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";

const PILLARS = [1, 2, 3] as const;

export function Pillars({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" } = {}) {
  const { t } = useI18n();
  const Heading = headingLevel;
  return (
    <section className="pillars-sec pad">
      <div className="wrap">
        <div className="pillars-grid">
          <div className="pillars-media reveal">
            <Image
              src="/img/about-equipa.jpg"
              alt="Equipa em obra vista de cima"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </div>
          <div className="pillars-copy reveal">
            <span className="eyebrow">{t("pillars.eyebrow")}</span>
            <Heading className="sec-title" dangerouslySetInnerHTML={{ __html: t("pillars.h2") }} />
            <p>{t("pillars.p")}</p>
            <div className="pillar-row stagger">
              {PILLARS.map((n) => (
                <div className="pillar" key={n}>
                  <span className="pn">{String(n).padStart(2, "0")}</span>
                  <div>
                    <h4>{t(`pillar${n}.h4`)}</h4>
                    <p>{t(`pillar${n}.p`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
