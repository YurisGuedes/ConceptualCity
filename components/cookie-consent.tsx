"use client";

import { useEffect, useState } from "react";
import { translations, type Lang } from "@/lib/translations";
import { ROUTES } from "@/lib/routes";
import { updateConsent, type ConsentStatus } from "@/lib/consent";

const STORAGE_KEY = "cc-consent";

/** Rendered once in the root layout (outside any page's I18nProvider, hence
 * the explicit `lang` prop instead of useI18n()) so it appears on every
 * domain/page. Shows once per browser; a prior choice is re-applied to
 * Consent Mode on every later visit without showing the banner again. */
export function CookieConsent({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);
  const t = (key: string) => translations[lang][key] ?? key;

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (stored === "granted" || stored === "denied") {
      updateConsent(stored);
      return;
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("cookie-banner-open", visible);
  }, [visible]);

  const choose = (status: ConsentStatus) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, status);
    } catch {}
    updateConsent(status);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={t("cookiebanner.accept")}>
      <p>
        {t("cookiebanner.text")}{" "}
        <a href={ROUTES.politicaCookies[lang]}>{t("cookies.title")}</a>
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="btn btn-ghost" onClick={() => choose("denied")}>
          {t("cookiebanner.reject")}
        </button>
        <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>
          {t("cookiebanner.accept")}
        </button>
      </div>
    </div>
  );
}
