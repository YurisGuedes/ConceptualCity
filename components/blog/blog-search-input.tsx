"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { translations } from "@/lib/translations";

const t = (key: string) => translations.pt[key] ?? key;
const DEBOUNCE_MS = 350;

/** The one interactive piece of /blog — everything else (pagination,
 * category pills) is plain server-rendered links. Debounces keystrokes,
 * then pushes `?q=...` so the *same server query* re-runs with the new
 * term: this searches the whole corpus, not just the posts already
 * rendered on the current page. */
export function BlogSearchInput({ initialValue }: { initialValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue ?? "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (next: string) => {
    setValue(next);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      if (next.trim()) {
        params.set("q", next.trim());
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      router.replace(qs ? `/blog?${qs}` : "/blog", { scroll: false });
    }, DEBOUNCE_MS);
  };

  return (
    <div className="blog-search">
      <Search aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={t("blog.hero.searchPlaceholder")}
        aria-label={t("blog.hero.searchPlaceholder")}
      />
    </div>
  );
}
