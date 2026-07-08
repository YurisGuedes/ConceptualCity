"use client";

import { Check, MapPin, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export function Strip() {
  const { t } = useI18n();
  return (
    <section className="strip">
      <div className="strip-inner">
        <div className="wrap">
          <div className="strip-grid stagger">
            <div className="diff">
              <span className="di">
                <Users />
              </span>
              <h3>{t("diff1.h3")}</h3>
              <p>{t("diff1.p")}</p>
            </div>
            <div className="diff">
              <span className="di">
                <MapPin />
              </span>
              <h3>{t("diff2.h3")}</h3>
              <p>{t("diff2.p")}</p>
            </div>
            <div className="diff">
              <span className="di">
                <Check />
              </span>
              <h3>{t("diff3.h3")}</h3>
              <p>{t("diff3.p")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
