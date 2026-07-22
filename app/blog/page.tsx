import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, FEATURED_POST_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import type { PostCard as PostCardData, PostCategory } from "@/sanity/lib/types";
import { BlogHero } from "@/components/blog/blog-hero";
import { CategoryPills } from "@/components/blog/category-pills";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostCard } from "@/components/blog/post-card";
import { Pagination } from "@/components/blog/pagination";
import { BlogCta } from "@/components/blog/blog-cta";

const PAGE_SIZE = 12;
const t = (key: string) => translations.pt[key] ?? key;

type BlogSearchParams = { categoria?: string; q?: string; page?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}): Promise<Metadata> {
  const { categoria, q, page } = await searchParams;

  // Self-canonical per category/page (each is a distinct, valid landing
  // page) — but never includes `q`: search results pages are noindex
  // below, so their canonical points at the equivalent non-search view.
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (page && page !== "1") params.set("page", page);
  const qs = params.toString();

  return {
    title: t("page.blog.title"),
    description: t("page.blog.description"),
    alternates: { canonical: qs ? `/blog?${qs}` : "/blog" },
    // Internal search-result pages are the classic thin/duplicate-content
    // case — never indexed, but links out of them are still followed so
    // Google can still discover every article this way too.
    robots: q ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t("page.blog.title"),
      description: t("page.blog.description"),
      url: qs ? `/blog?${qs}` : "/blog",
      locale: "pt_PT",
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}) {
  const { categoria, q, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const isFiltered = Boolean(categoria || q);

  // A Sanity outage/misconfiguration should degrade this page to "no
  // articles right now", never a 500 for every visitor — same defensive
  // pattern already used in app/sitemap.ts.
  let categories: PostCategory[] = [];
  let posts: PostCardData[] = [];
  let total = 0;
  let featured: PostCardData | null = null;
  try {
    const [categoriesResult, postsResult, featuredResult] = await Promise.all([
      client.fetch<PostCategory[]>(CATEGORIES_QUERY, {}, { next: { tags: ["post"] } }),
      client.fetch<{ posts: PostCardData[]; total: number }>(
        POSTS_QUERY,
        { category: categoria ?? null, q: q ? `${q}*` : null, start, end },
        { next: { tags: ["post"] } }
      ),
      isFiltered
        ? Promise.resolve(null)
        : client.fetch<PostCardData | null>(FEATURED_POST_QUERY, {}, { next: { tags: ["post"] } }),
    ]);
    categories = categoriesResult;
    posts = postsResult.posts;
    total = postsResult.total;
    featured = featuredResult;
  } catch (err) {
    console.error("[blog] failed to fetch from Sanity", err);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <I18nProvider fixedLang="pt">
      <SiteHeader />
      <main>
        <BlogHero searchValue={q} />
        <div className="wrap">
          <CategoryPills categories={categories} active={categoria} />
          {featured && <FeaturedPost post={featured} />}
          {posts.length > 0 ? (
            <>
              <h2 className="blog-all-title">{t("blog.all.title")}</h2>
              <div className="blog-grid stagger">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} categoria={categoria} />
            </>
          ) : (
            <div className="blog-empty">
              <h3>{t("blog.empty.title")}</h3>
              <p>{t("blog.empty.p")}</p>
            </div>
          )}
        </div>
        <BlogCta />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
