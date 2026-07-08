"use client";

import { useI18n } from "@/lib/i18n-context";

const STEPS = [1, 2, 3] as const;

export function Process() {
  const { t } = useI18n();
  return (
    <section className="process pad" id="process">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">{t("process.eyebrow")}</span>
          <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: t("process.h2") }} />
        </div>
        <div className="timeline stagger">
          {STEPS.map((n) => (
            <div className="tstep" key={n}>
              <div className="tdot">{n}</div>
              <h3>{t(`step${n}.h3`)}</h3>
              <p>{t(`step${n}.p`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
