import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      // Only ever used as a ?categoria= query value, never a route
      // segment — no reserved-word risk here (see postType.ts for that).
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      description: "Controla a ordem das pills de filtro em /blog.",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
