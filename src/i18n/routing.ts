import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/unternehmen": {
      de: "/unternehmen",
      en: "/company",
    },
    "/produkte": {
      de: "/produkte",
      en: "/products",
    },
    "/kompetenz": {
      de: "/kompetenz",
      en: "/expertise",
    },
    "/karriere": {
      de: "/karriere",
      en: "/careers",
    },
    "/blog": {
      de: "/blog",
      en: "/blog",
    },
    "/blog/[slug]": {
      de: "/blog/[slug]",
      en: "/blog/[slug]",
    },
    "/kontakt": {
      de: "/kontakt",
      en: "/contact",
    },
    "/impressum": {
      de: "/impressum",
      en: "/imprint",
    },
    "/datenschutz": {
      de: "/datenschutz",
      en: "/privacy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
