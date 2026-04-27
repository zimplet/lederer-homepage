import { defineField, defineType } from "sanity";

export const jobPosting = defineType({
  name: "jobPosting",
  title: "Stellenanzeige",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Stellenbezeichnung",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "type",
      title: "Beschäftigungsart",
      type: "string",
      options: {
        list: [
          { title: "Vollzeit", value: "Vollzeit" },
          { title: "Teilzeit", value: "Teilzeit" },
          { title: "Ausbildung", value: "Ausbildung" },
          { title: "Praktikum", value: "Praktikum" },
          { title: "Werkstudent", value: "Werkstudent" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Abteilung",
      type: "string",
      options: {
        list: [
          { title: "Produktion", value: "Produktion" },
          { title: "Vertrieb", value: "Vertrieb" },
          { title: "Qualitätssicherung", value: "Qualitätssicherung" },
          { title: "Verwaltung", value: "Verwaltung" },
          { title: "IT", value: "IT" },
          { title: "Personal", value: "Personal" },
          { title: "Logistik", value: "Logistik" },
        ],
      },
    }),
    defineField({
      name: "location",
      title: "Standort",
      type: "string",
      initialValue: "Amstetten, Baden-Württemberg",
    }),
    defineField({
      name: "summary",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Ausführliche Beschreibung",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "requirements",
      title: "Anforderungen",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "benefits",
      title: "Was wir bieten",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "active",
      title: "Aktiv (auf Website anzeigen)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlicht am",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "title", type: "type", department: "department", active: "active" },
    prepare({ title, type, department, active }) {
      return {
        title: `${active ? "✅" : "❌"} ${title}`,
        subtitle: `${type} · ${department ?? ""}`,
      };
    },
  },
});
