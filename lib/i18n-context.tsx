"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang } from "@/lib/translations";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    // Reads localStorage/navigator, both unavailable during SSR — lang must
    // start as "pt" on server and first client render to avoid a hydration
    // mismatch, then get corrected here once mounted. That's why this can't
    // be a lazy useState initializer instead.
    const saved = window.localStorage.getItem("cc-lang");
    if (saved === "pt" || saved === "es") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
      return;
    }
    // No stored preference yet: infer from the browser's language list.
    // Spanish speakers get ES; everyone else (incl. Brazilian/European
    // Portuguese and any other locale) falls back to PT, the primary market.
    const detected = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
    if (detected.startsWith("es")) setLangState("es");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang]["meta.title"];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", translations[lang]["meta.description"]);
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem("cc-lang", next);
    } catch {}
  };

  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
