import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karriere – Jobs & Ausbildung in der Textilbranche",
  description:
    "Werde Teil der Jörg Lederer GmbH – sicherer Arbeitgeber seit 1948 in Amstetten. Offene Stellen, Ausbildungsplätze und Initiativbewerbungen. Textiltechnologie mit Zukunft.",
  alternates: {
    canonical: "https://lederer-elastic.de/karriere",
    languages: {
      de: "https://lederer-elastic.de/karriere",
      en: "https://lederer-elastic.de/en/careers",
    },
  },
  keywords: ["Textil Jobs Amstetten", "Ausbildung Textiltechnologie", "Garnhersteller Karriere", "Jobs Baden-Württemberg"],
};

export default function KarriereLayout({ children }: { children: React.ReactNode }) {
  return children;
}
