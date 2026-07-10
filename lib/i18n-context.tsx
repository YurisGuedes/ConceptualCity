"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { translations, type Lang } from "@/lib/translations";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const LANG_PATH: Record<Lang, string> = { pt: "/", es: "/es" };

/**
 * `fixedLang`: for routes where the language lives in the URL ("/" and
 * "/es") — skips localStorage/browser detection (the URL already answers
 * that) and `setLang` navigates to the other route instead of mutating
 * state, so the toggle produces real, crawlable, distinct pages. Omit it
 * (legal pages, wrapped by the root layout) to keep the single-URL
 * client-detected/toggleable behavior those pages still use.
 */
export function I18nProvider({
  children,
  fixedLang,
}: {
  children: ReactNode;
  fixedLang?: Lang;
}) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(fixedLang ?? "pt");

  useEffect(() => {
    if (fixedLang) {
      // Keep localStorage in sync even for a direct/organic landing on this
      // route (no toggle click involved) — otherwise a visitor who arrives
      // straight on "/es" from a search result, then clicks through to a
      // legal page, would see it fall back to Portuguese.
      try {
        window.localStorage.setItem("cc-lang", fixedLang);
      } catch {}
      return;
    }
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
  }, [fixedLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    // On fixedLang routes, title/description are set correctly server-side
    // (see each page's `metadata` export) — don't fight that client-side.
    if (!fixedLang) {
      document.title = translations[lang]["meta.title"];
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", translations[lang]["meta.description"]);
    }
  }, [lang, fixedLang]);

  const setLang = (next: Lang) => {
    try {
      window.localStorage.setItem("cc-lang", next);
    } catch {}
    if (fixedLang) {
      if (next !== lang) router.push(LANG_PATH[next]);
      return;
    }
    setLangState(next);
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
