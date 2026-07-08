"use client";

import { useI18n } from "@/lib/i18n-context";

export function Projects() {
  const { t } = useI18n();
  return (
    <section className="projects pad" id="projects">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">{t("projects.eyebrow")}</span>
          <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: t("projects.h2") }} />
          <p>{t("projects.p")}</p>
        </div>
        <div className="proj-showcase stagger">
          <div className="proj-row">
            <div className="proj">
              <img loading="lazy" src="/img/projeto-01-armaduras.jpg" alt="Armaduras e betão em obra" />
              <span className="proj-tag">{t("tag.obracivil")}</span>
            </div>
            <div className="proj">
              <img loading="lazy" src="/img/projeto-03-eolica.jpg" alt="Fundação de aerogerador em construção" />
              <span className="proj-tag">{t("tag.energia")}</span>
            </div>
            <div className="proj">
              <img loading="lazy" src="/img/projeto-02-estaleiro.jpg" alt="Grande estaleiro com gruas" />
              <span className="proj-tag">{t("tag.edificacao")}</span>
            </div>
          </div>
          <div className="proj-row proj-row-2">
            <div className="proj">
              <img loading="lazy" src="/img/projeto-04-viaduto.jpg" alt="Viaduto ferroviário em construção" />
              <span className="proj-tag">{t("tag.infraestrutura")}</span>
            </div>
            <div className="proj">
              <img loading="lazy" src="/img/about-equipa.jpg" alt="Equipa em laje vista de cima" />
              <span className="proj-tag">{t("tag.estrutural")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
