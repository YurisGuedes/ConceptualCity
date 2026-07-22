import Link from "next/link";
import { translations } from "@/lib/translations";
import type { PostCategory } from "@/sanity/lib/types";

const t = (key: string) => translations.pt[key] ?? key;

export function CategoryPills({
  categories,
  active,
}: {
  categories: PostCategory[];
  active?: string;
}) {
  return (
    <nav className="blog-pills" aria-label={t("blog.all.title")}>
      <Link href="/blog" className={`blog-pill${!active ? " active" : ""}`}>
        {t("blog.pill.all")}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog?categoria=${category.slug}`}
          className={`blog-pill${active === category.slug ? " active" : ""}`}
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
