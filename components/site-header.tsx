"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import type { Lang } from "@/lib/translations";

export function SiteHeader() {
  const { lang, setLang, t } = useI18n();
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
        <a href="#top" className="logo">
          <img src="/img/logo-conceptualcity.png" alt="Conceptual City" />
        </a>
        <nav className={`menu${open ? " open" : ""}`} id="menu">
          {links.map((l) => (
            <a key={l.key} href={l.href} onClick={() => setOpen(false)}>
              {t(l.key)}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang">
            {(["pt", "es"] as Lang[]).map((code) => (
              <button
                key={code}
                data-lang={code}
                className={lang === code ? "active" : undefined}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#contact" className="nav-cta">
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
