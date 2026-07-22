import Link from "next/link";
import { translations } from "@/lib/translations";
import { BlogSearchInput } from "@/components/blog/blog-search-input";

const t = (key: string) => translations.pt[key] ?? key;

export function BlogHero({ searchValue }: { searchValue?: string }) {
  return (
    <section className="blog-hero">
      <div className="wrap">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">{t("nav.home")}</Link>
          <span className="sep">›</span>
          <span>{t("blog.hero.breadcrumbSelf")}</span>
        </nav>
        <h1 className="sec-title blog-hero-title" dangerouslySetInnerHTML={{ __html: t("blog.hero.title") }} />
        <p className="blog-hero-subtitle">{t("blog.hero.subtitle")}</p>
        <BlogSearchInput initialValue={searchValue} />
      </div>
    </section>
  );
}
