import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Jörg Lederer GmbH Amstetten",
  description:
    "Kontaktieren Sie die Jörg Lederer GmbH: Hauptstraße 115, 73340 Amstetten. Tel: +49 7331 2006-0. Mo.–Fr. 08:00–16:30 Uhr. Produktanfragen, Musterbestellungen und Karriere.",
  alternates: {
    canonical: "https://lederer-elastic.de/kontakt",
    languages: {
      de: "https://lederer-elastic.de/kontakt",
      en: "https://lederer-elastic.de/en/contact",
    },
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
