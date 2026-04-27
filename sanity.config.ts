import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "lederer-studio",
  title: "Lederer CMS",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Website-Einstellungen")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("blogPost").title("Blog-Beiträge"),
            S.documentTypeListItem("teamMember").title("Team"),
            S.documentTypeListItem("jobPosting").title("Stellenanzeigen"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("certificate").title("Zertifikate & Partner"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
