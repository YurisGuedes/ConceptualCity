import { defineQuery, groq } from "next-sanity";

// Shared projection for anything rendered as a post card (grid, featured,
// related) — read time is computed here, server-side, from the actual body
// content (words ÷ 5 ÷ 180), so editors never fill in or forget to update
// a manual "read time" field.
const postCardFields = groq`{
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  "category": category->{title, "slug": slug.current},
  "readTimeMinutes": round(length(pt::text(body)) / 5 / 180)
}`;

// $q is expected pre-wildcarded by the caller (e.g. `${term}*`), never
// concatenated inside GROQ itself.
const postListFilter = groq`_type == "post"
  && defined(slug.current)
  && (!defined($category) || category->slug.current == $category)
  && (!defined($q) || title match $q || excerpt match $q)`;

export const POSTS_QUERY = defineQuery(`{
  "posts": *[${postListFilter}] | order(publishedAt desc) [$start...$end] ${postCardFields},
  "total": count(*[${postListFilter}])
}`);

export const FEATURED_POST_QUERY = defineQuery(
  `*[_type == "post" && featured == true] | order(publishedAt desc) [0] ${postCardFields}`
);

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] | order(order asc) { title, "slug": slug.current }`
);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    excerpt,
    mainImage,
    publishedAt,
    body,
    seoTitle,
    seoDescription,
    "slug": slug.current,
    "category": category->{title, "slug": slug.current},
    "author": author->{name, image},
    "readTimeMinutes": round(length(pt::text(body)) / 5 / 180)
  }
`);

export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)
      && category->slug.current == $categorySlug
      && slug.current != $slug
    ] | order(publishedAt desc) [0...3] ${postCardFields}
`);

export const ALL_POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
);
