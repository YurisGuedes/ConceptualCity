import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { ArticleJsonLd } from "@/components/blog/article-jsonld";
import { RelatedPosts } from "@/components/blog/related-posts";
import { portableTextComponents } from "@/components/blog/portable-text-components";
import { I18nProvider } from "@/lib/i18n-context";
import { translations } from "@/lib/translations";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POST_BY_SLUG_QUERY, RELATED_POSTS_QUERY } from "@/sanity/lib/queries";
import type { Post, PostCard as PostCardData } from "@/sanity/lib/types";

const t = (key: string) => translations.pt[key] ?? key;

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug }, { next: { tags: ["post"] } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const ogImage = urlFor(post.mainImage).width(1200).height(630).fit("crop").url();

  return {
    title: `${title} | Conceptual City`,
    description,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/${post.slug}`,
      locale: "pt_PT",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = post.category
    ? await client.fetch<PostCardData[]>(
        RELATED_POSTS_QUERY,
        { categorySlug: post.category.slug, slug: post.slug },
        { next: { tags: ["post"] } }
      )
    : [];

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <I18nProvider fixedLang="pt">
      <BreadcrumbJsonLd
        lang="pt"
        items={[
          { name: t("nav.home"), path: "/" },
          { name: t("blog.hero.breadcrumbSelf"), path: "/blog" },
          { name: post.title, path: `/${post.slug}` },
        ]}
      />
      <ArticleJsonLd post={post} />
      <SiteHeader />
      <main className="blog-article">
        <div className="wrap">
          <Link href="/blog" className="blog-article-back">
            {t("blog.article.back")}
          </Link>
          <div className="blog-article-hero">
            <Image
              src={urlFor(post.mainImage).width(1600).height(800).fit("crop").url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              sizes="(max-width: 820px) 100vw, 1200px"
              priority
            />
          </div>
          <div className="blog-article-header">
            {post.category && <span className="blog-cat-tag">{post.category.title}</span>}
            <h1>{post.title}</h1>
            <div className="blog-article-meta">
              {post.author && (
                <span>
                  {t("blog.article.by")} {post.author.name}
                </span>
              )}
              <span className="dot">·</span>
              <span>{publishedDate}</span>
              <span className="dot">·</span>
              <span>
                {Math.max(1, post.readTimeMinutes)} {t("blog.card.readTimeSuffix")}
              </span>
            </div>
          </div>
          <div className="blog-article-body">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </div>
        <RelatedPosts posts={related} />
      </main>
      <SiteFooter />
      <WhatsappFab />
    </I18nProvider>
  );
}
