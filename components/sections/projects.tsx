"use client";

import { Image as ImageIcon } from "lucide-react";
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
        <div className="proj-grid stagger">
          <div className="proj">
            <img loading="lazy" src="/img/projeto-01-armaduras.jpg" alt="Armaduras e betão em obra" />
            <span className="proj-tag">{t("tag.obracivil")}</span>
          </div>
          <div className="proj">
            <img loading="lazy" src="/img/projeto-02-estaleiro.jpg" alt="Grande estaleiro com gruas" />
            <span className="proj-tag">{t("tag.edificacao")}</span>
          </div>
          <div className="proj">
            <div className="ph">
              <ImageIcon />
              <b>{t("proj.ph03")}</b>
            </div>
            <span className="proj-tag">{t("tag.infraestrutura")}</span>
          </div>
          <div className="proj">
            <div className="ph">
              <ImageIcon />
              <b>{t("proj.ph04")}</b>
            </div>
            <span className="proj-tag">{t("tag.residencial")}</span>
          </div>
          <div className="proj">
            <img loading="lazy" src="/img/about-equipa.jpg" alt="Equipa em laje vista de cima" />
            <span className="proj-tag">{t("tag.estrutural")}</span>
          </div>
          <div className="proj">
            <div className="ph">
              <ImageIcon />
              <b>{t("proj.ph06")}</b>
            </div>
            <span className="proj-tag">{t("tag.reabilitacao")}</span>
          </div>
        </div>
        <p className="proj-note">{t("projects.note")}</p>
      </div>
    </section>
  );
}
