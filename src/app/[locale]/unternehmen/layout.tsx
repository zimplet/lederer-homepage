import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unternehmen – Geschichte, Team & Werte",
  description:
    "Die Jörg Lederer GmbH – 75 Jahre Erfahrung, Familientradition seit 1948, GRS-zertifiziert, 130 Mitarbeiter:innen. Geschichte, Führungsteam und Werte.",
  alternates: {
    canonical: "https://lederer-elastic.de/unternehmen",
    languages: {
      de: "https://lederer-elastic.de/unternehmen",
      en: "https://lederer-elastic.de/en/company",
    },
  },
};

export default function UnternehmenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
