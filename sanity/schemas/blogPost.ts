import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog-Beitrag",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Teaser-Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "content",
      title: "Inhalt",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Zitat", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Fett", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt-Text" }),
            defineField({ name: "caption", type: "string", title: "Bildunterschrift" }),
          ],
        },
      ],
    }),
    defineField({
      name: "tag",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Unternehmen", value: "Unternehmen" },
          { title: "Produkte", value: "Produkte" },
          { title: "Nachhaltigkeit", value: "Nachhaltigkeit" },
          { title: "Karriere", value: "Karriere" },
          { title: "Technologie", value: "Technologie" },
          { title: "Branche", value: "Branche" },
          { title: "Innovation", value: "Innovation" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Veröffentlichungsdatum",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "Redaktion Lederer",
    }),
    defineField({
      name: "readingTime",
      title: "Lesezeit (Minuten)",
      type: "number",
      initialValue: 5,
    }),
    defineField({
      name: "featured",
      title: "Hervorgehobener Beitrag",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Titel (optional)",
      type: "string",
      description: "Leer lassen um den Beitragstitel zu verwenden",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Beschreibung (optional)",
      type: "text",
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: "Datum (neu → alt)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", tag: "tag", featured: "featured" },
    prepare({ title, date, tag, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: `${date} · ${tag}`,
      };
    },
  },
});
