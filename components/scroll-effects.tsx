"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Ports the original vanilla reveal-on-scroll + service-card tilt
 * interactions. Re-runs on every route change: "/" and "/es" share the root
 * layout this is mounted in, so a client-side navigation between them does
 * NOT remount this component. Without re-scanning on pathname change, the
 * observer keeps watching the old page's (now-removed) DOM nodes and never
 * sees the new page's .reveal/.stagger elements — they'd stay stuck at
 * opacity:0 until a hard reload. */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal,.stagger").forEach((el) => io.observe(el));

    const cleanups: Array<() => void> = [];
    if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      document.querySelectorAll<HTMLElement>(".svc.tilt").forEach((card) => {
        const max = 5;
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `translateY(-6px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
        };
        const onLeave = () => {
          card.style.transform = "";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
