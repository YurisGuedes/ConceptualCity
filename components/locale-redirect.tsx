"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Renders only on "/" (the PT home route). On a first-ever visit (no stored
 * preference yet), sends Spanish-browser visitors to the real "/es" route
 * instead of showing them PT content. Never fires again once a preference
 * is recorded, so it won't fight a visitor who deliberately navigates back
 * to "/" after switching languages.
 */
export function LocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    try {
      if (window.localStorage.getItem("cc-lang")) return;
      const detected = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
      if (detected.startsWith("es")) {
        window.localStorage.setItem("cc-lang", "es");
        router.replace("/es");
      } else {
        window.localStorage.setItem("cc-lang", "pt");
      }
    } catch {}
  }, [router]);

  return null;
}
