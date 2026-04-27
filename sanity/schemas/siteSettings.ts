import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Firmenname",
      type: "string",
      initialValue: "Jörg Lederer GmbH",
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
      name: "address",
      title: "Adresse",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Straße", type: "string" }),
        defineField({ name: "city", title: "Stadt", type: "string" }),
        defineField({ name: "zip", title: "PLZ", type: "string" }),
        defineField({ name: "country", title: "Land", type: "string" }),
      ],
    }),
    defineField({
      name: "openingHours",
      title: "Öffnungszeiten",
      type: "string",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Standard-Titel",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Standard-Beschreibung",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ogImage",
      title: "Standard OG-Bild",
      type: "image",
    }),
  ],
  preview: {
    select: { title: "companyName" },
  },
});
