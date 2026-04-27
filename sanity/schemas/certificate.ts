import { defineField, defineType } from "sanity";

export const certificate = defineType({
  name: "certificate",
  title: "Zertifikat / Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "Website (optional)",
      type: "url",
    }),
    defineField({
      name: "type",
      title: "Typ",
      type: "string",
      options: {
        list: [
          { title: "Zertifikat", value: "certificate" },
          { title: "Partner", value: "partner" },
          { title: "Mitgliedschaft", value: "membership" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Reihenfolge im Marquee",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: "Reihenfolge", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "logo" },
  },
});
