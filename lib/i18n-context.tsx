"use client";

import { createContext, useContext, type ReactNode } from "react";
import { translations, type Lang } from "@/lib/translations";

interface I18nContextValue {
  lang: Lang;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * This project serves three separate domains, one language each — crossing
 * languages means crossing domains (see the cross-domain language switcher
 * in components/site-header.tsx), not client-side state or a route push.
 * `fixedLang` is mandatory for that reason: every page already knows its
 * own language from which domain/route it lives on, so there's nothing left
 * to detect from localStorage or the browser at runtime.
 */
export function I18nProvider({ children, fixedLang }: { children: ReactNode; fixedLang: Lang }) {
  const t = (key: string) => translations[fixedLang][key] ?? key;

  return <I18nContext.Provider value={{ lang: fixedLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
