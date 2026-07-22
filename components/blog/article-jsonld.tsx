import { urlFor } from "@/sanity/lib/image";
import { DOMAIN_ORIGINS } from "@/lib/site-config";
import type { Post } from "@/sanity/lib/types";

/** Same plain-function/dangerouslySetInnerHTML idiom as breadcrumb-jsonld.tsx.
 * BlogPosting (not the generic Article) is schema.org's more specific type
 * for this content, and the one Google's rich-results docs target for blogs. */
export function ArticleJsonLd({ post }: { post: Post }) {
  const url = `${DOMAIN_ORIGINS.pt}/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: urlFor(post.mainImage).width(1200).height(630).url(),
    url,
    mainEntityOfPage: url,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
    articleSection: post.category?.title,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
