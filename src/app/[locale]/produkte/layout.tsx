import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produkte – Umwundene Garne, Luftverwirbelt & Elasto Twist",
  description:
    "Hochwertige elastische Garne aus Amstetten: Umwundene Garne (Single & Double Cover), Luftverwirbelte Garne, Elasto Twist. LYCRA® 962L Partner. Individuelle Garnentwicklung möglich.",
  alternates: {
    canonical: "https://lederer-elastic.de/produkte",
    languages: {
      de: "https://lederer-elastic.de/produkte",
      en: "https://lederer-elastic.de/en/products",
    },
  },
  keywords: ["umwundene Garne", "luftverwirbelte Garne", "Elasto Twist", "LYCRA Garn", "elastische Garne kaufen"],
};

export default function ProdukteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
