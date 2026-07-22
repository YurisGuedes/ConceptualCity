import { defineField, defineType } from "sanity";
import { RESERVED_SLUGS } from "./reservedSlugs";

export const postType = defineType({
  name: "post",
  title: "Artigo",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        "Fica na raiz do site (ex.: conceptualcity.pt/este-slug), não em /blog/este-slug.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2026-01-01" });
          const id = document?._id.replace(/^drafts\./, "");
          const count = await client.fetch(
            `count(*[_type == "post" && slug.current == $slug && !(_id in [$id, "drafts." + $id])])`,
            { slug, id }
          );
          return count === 0;
        },
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug?.current) return true;
          return RESERVED_SLUGS.includes(slug.current)
            ? `"${slug.current}" está reservado para uma rota existente do site e não pode ser usado — escolhe outro slug.`
            : true;
        }),
    }),
    defineField({
      name: "mainImage",
      title: "Imagem principal",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
      group: "content",
      description: "Usado nos cartões, e como meta description caso não haja uma definida em SEO.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Artigo em destaque",
      type: "boolean",
      group: "content",
      initialValue: false,
      description: "Aparece na secção \"Artigo em Destaque\" de /blog. Se marcares mais do que um, mostra-se sempre o mais recente.",
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      type: "string",
      group: "seo",
      description: "Opcional — usa o título do artigo se ficar vazio.",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      group: "seo",
      description: "Opcional — usa o resumo se ficar vazio.",
    }),
  ],
  preview: {
    select: { title: "title", media: "mainImage", category: "category.title" },
    prepare({ title, media, category }) {
      return { title, subtitle: category, media };
    },
  },
});
