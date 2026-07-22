import Link from "next/link";
import { translations } from "@/lib/translations";

const t = (key: string) => translations.pt[key] ?? key;

function hrefFor(page: number, categoria?: string) {
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export function Pagination({
  page,
  totalPages,
  categoria,
}: {
  page: number;
  totalPages: number;
  categoria?: string;
}) {
  if (totalPages <= 1) return null;

  // Windowed: up to 5 page numbers centered on the current page.
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav className="blog-pagination" aria-label={t("blog.all.title")}>
      <Link
        href={hrefFor(page - 1, categoria)}
        className={`blog-page-link${page <= 1 ? " disabled" : ""}`}
        aria-label={t("blog.pagination.prev")}
        aria-disabled={page <= 1}
      >
        ‹
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p, categoria)}
          className={`blog-page-link${p === page ? " active" : ""}`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Link>
      ))}
      <Link
        href={hrefFor(page + 1, categoria)}
        className={`blog-page-link${page >= totalPages ? " disabled" : ""}`}
        aria-label={t("blog.pagination.next")}
        aria-disabled={page >= totalPages}
      >
        ›
      </Link>
    </nav>
  );
}
