"use client";

import { useI18n } from "@/lib/i18n-context";

export function ServiceDetail({ index }: { index: 1 | 2 | 3 | 4 }) {
  const { t } = useI18n();
  return (
    <section className="pad">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{t("services.eyebrow")}</span>
          <h1 className="sec-title">{t(`svc${index}.h3`)}</h1>
          <p>{t(`svcpage${index}.intro`)}</p>
        </div>
        <div className="svcpage-body reveal">
          <p>{t(`svcpage${index}.body1`)}</p>
          <p>{t(`svcpage${index}.body2`)}</p>
        </div>
      </div>
    </section>
  );
}
