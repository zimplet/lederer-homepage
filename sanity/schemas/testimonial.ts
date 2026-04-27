import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Position / Abteilung",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Zitat",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Foto (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "type",
      title: "Typ",
      type: "string",
      options: {
        list: [
          { title: "Mitarbeiter", value: "employee" },
          { title: "Führungskraft", value: "leadership" },
          { title: "Kunde", value: "customer" },
        ],
      },
      initialValue: "employee",
    }),
    defineField({
      name: "featured",
      title: "Auf Karriere-Seite hervorheben",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: "Reihenfolge", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "author", subtitle: "role", media: "avatar" },
  },
});
