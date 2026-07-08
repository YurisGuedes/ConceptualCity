"use client";

import { Clock, MapPin, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export function About() {
  const { t } = useI18n();
  return (
    <section className="pad" id="about">
      <div className="wrap">
        <div className="about-head">
          <span className="eyebrow">{t("about.eyebrow")}</span>
        </div>
        <h2
          className="about-headline reveal"
          dangerouslySetInnerHTML={{ __html: t("about.headline") }}
        />
        <div className="grid-3 stagger">
          <article className="card">
            <div className="card-top">
              <span className="card-ic">
                <Users />
              </span>
              <span className="card-kicker">{t("about.card1.kicker")}</span>
            </div>
            <div className="media">
              <img src="/img/about-equipa.jpg" alt="Equipa de trabalhadores em obra, vista de cima" />
            </div>
            <h3>{t("about.card1.h3")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about.card1.p") }} />
          </article>

          <article className="card">
            <div className="card-top">
              <span className="card-ic">
                <MapPin />
              </span>
              <span className="card-kicker">{t("about.card2.kicker")}</span>
            </div>
            <div className="media">
              <div className="map-wrap">
                <img src="/img/iberia-map.svg" alt={t("about.map.aria")} />
                <div className="map-legend">
                  <span className="d"></span> {t("about.map.legend")}
                </div>
              </div>
            </div>
            <h3>{t("about.card2.h3")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about.card2.p") }} />
          </article>

          <article className="card">
            <div className="card-top">
              <span className="card-ic">
                <Clock />
              </span>
              <span className="card-kicker">{t("about.card3.kicker")}</span>
            </div>
            <div className="media">
              <img src="/img/about-gruas.jpg" alt="Gruas em obra ao pôr do sol" />
            </div>
            <h3>{t("about.card3.h3")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about.card3.p") }} />
          </article>
        </div>
      </div>
    </section>
  );
}
