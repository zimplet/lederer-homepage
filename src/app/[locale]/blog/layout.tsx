import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Aktuelles",
  description:
    "Neuigkeiten aus der Jörg Lederer GmbH: Partnerschaften, Zertifizierungen, Karriere und Unternehmenskultur aus der Textilbranche.",
  alternates: {
    canonical: "https://lederer-elastic.de/blog",
    languages: {
      de: "https://lederer-elastic.de/blog",
      en: "https://lederer-elastic.de/en/blog",
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
