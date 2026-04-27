import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Teammitglied",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Abteilung",
      type: "string",
      options: {
        list: [
          { title: "Geschäftsführung", value: "Geschäftsführung" },
          { title: "Vertrieb", value: "Vertrieb" },
          { title: "Produktion", value: "Produktion" },
          { title: "Qualitätssicherung", value: "Qualitätssicherung" },
          { title: "Personal", value: "Personal" },
          { title: "Verwaltung", value: "Verwaltung" },
        ],
      },
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Kurzbio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      title: "Auf Startseite / Über uns hervorheben",
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
    {
      title: "Reihenfolge",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
