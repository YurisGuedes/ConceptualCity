"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

const SERVICES = [
  { num: "01", img: "servico-01-maodeobra.jpg", alt: "Grua e edifício em construção", h3: "svc1.h3", p: "svc1.p" },
  { num: "02", img: "servico-02-edificacao.jpg", alt: "Edifícios em construção com grua", h3: "svc2.h3", p: "svc2.p" },
  { num: "03", img: "servico-03-obracivil.jpg", alt: "Grande obra civil com várias gruas", h3: "svc3.h3", p: "svc3.p" },
  { num: "04", img: "servico-04-auxiliares.jpg", alt: "Obra urbana com bomba de betão", h3: "svc4.h3", p: "svc4.p" },
] as const;

export function Services() {
  const { t } = useI18n();
  return (
    <section className="services pad" id="services">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">{t("services.eyebrow")}</span>
          <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: t("services.h2") }} />
          <p>{t("services.p")}</p>
        </div>
        <div className="svc-grid stagger">
          {SERVICES.map((s) => (
            <article className="svc tilt" key={s.num}>
              <div className="svc-media">
                <span className="svc-num">{s.num}</span>
                <Image src={`/img/${s.img}`} alt={s.alt} fill sizes="(max-width: 980px) 100vw, 50vw" />
              </div>
              <div className="svc-body">
                <h3>{t(s.h3)}</h3>
                <p>{t(s.p)}</p>
                <a href="#contact" className="svc-link">
                  {t("action.request")} <ArrowRight />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
