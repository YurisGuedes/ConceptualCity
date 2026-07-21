"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import type { Lang } from "@/lib/translations";
import { PAGE_HREFS, ROUTES, type RouteKey } from "@/lib/routes";
import { DOMAIN_ORIGINS } from "@/lib/site-config";

/** Pass the page's own key from lib/routes.ts so the language switcher can
 * link to the *equivalent* page on the other domain (not just its home) —
 * omit it on pages with no entry in ROUTES and it falls back to that
 * domain's home, same as the plan's spec for pages with no counterpart. */
export function SiteHeader({ currentRoute }: { currentRoute?: RouteKey } = {}) {
  const { lang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  // Anchors only exist on the homepage sections — from a dedicated subpage
  // (e.g. /quem-somos) a bare "#services" href would be a dead link (no such
  // id on that page), so every anchor is prefixed with the homepage path,
  // even on the homepage itself: a same-path "/#services" link still just
  // smooth-scrolls with no reload, same as a bare "#services" would, so
  // there's no downside to always being explicit. Always "/" regardless of
  // language: each domain's own home lives at its own root now.
  const homePrefix = "/";

  const links: { href: string; key: string }[] = [
    { href: "#top", key: "nav.home" },
    { href: "#about", key: "nav.about" },
    { href: "#services", key: "nav.services" },
    { href: "#projects", key: "nav.projects" },
    { href: "#contact", key: "nav.contact" },
  ];

  return (
    <header id="header" className={scrolled ? "scrolled" : undefined}>
      <div className="wrap nav">
        <a href={`${homePrefix}#top`} className="logo">
          <Image src="/img/logo-conceptualcity.png" alt="Conceptual City" width={489} height={200} preload />
        </a>
        <nav className={`menu${open ? " open" : ""}`} id="menu">
          {links.map((l) => (
            <a key={l.key} href={`${homePrefix}${l.href}`} onClick={() => setOpen(false)}>
              {t(l.key)}
            </a>
          ))}
          <Link href={PAGE_HREFS.trabalheConnosco[lang]} onClick={() => setOpen(false)}>
            {t("nav.careers")}
          </Link>
        </nav>
        <div className="nav-right">
          <div className="lang">
            {(["pt", "es"] as Lang[]).map((code) => {
              if (code === lang) {
                return (
                  <span key={code} data-lang={code} className="active">
                    {code.toUpperCase()}
                  </span>
                );
              }
              // Crossing languages now means crossing domains — a real link
              // to the equivalent page on the other domain (or that domain's
              // home, if this page has no ROUTES entry), not client state.
              const href = currentRoute
                ? `${DOMAIN_ORIGINS[code]}${ROUTES[currentRoute][code]}`
                : DOMAIN_ORIGINS[code];
              return (
                <a key={code} data-lang={code} href={href}>
                  {code.toUpperCase()}
                </a>
              );
            })}
          </div>
          <a href={`${homePrefix}#contact`} className="nav-cta">
            {t("nav.cta")}
          </a>
          <button
            className={`burger${open ? " open" : ""}`}
            id="burger"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
