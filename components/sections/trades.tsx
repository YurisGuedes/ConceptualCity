"use client";

import { useI18n } from "@/lib/i18n-context";

const TRADES = [1, 2, 3, 4, 5, 6] as const;

export function Trades({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" } = {}) {
  const { t } = useI18n();
  const Heading = headingLevel;
  return (
    <section className="trades pad" id="trades">
      <div className="wrap">
        <div className="trades-head reveal">
          <div>
            <span className="eyebrow">{t("trades.eyebrow")}</span>
            <Heading
              className="sec-title"
              style={{ marginTop: 18 }}
              dangerouslySetInnerHTML={{ __html: t("trades.h2") }}
            />
          </div>
          <p>{t("trades.p")}</p>
        </div>
        <div className="trades-list stagger">
          {TRADES.map((n) => (
            <div className="trade" key={n}>
              <span className="idx">/{String(n).padStart(2, "0")}</span>
              <span className="name">{t(`trade${n}.name`)}</span>
              <span className="role">{t(`trade${n}.role`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
