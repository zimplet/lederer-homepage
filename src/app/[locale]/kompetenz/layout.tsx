import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kompetenz – Technologie & Qualitätssicherung",
  description:
    "Modernste Garnproduktion: 200+ Maschinen, 50.000 Spindeln, ISO 9001:2015 zertifiziert, hauseigenes QS-Labor. Erster LYCRA® 962L Partner in der DACH-Region.",
  alternates: {
    canonical: "https://lederer-elastic.de/kompetenz",
    languages: {
      de: "https://lederer-elastic.de/kompetenz",
      en: "https://lederer-elastic.de/en/expertise",
    },
  },
};

export default function KompetenzLayout({ children }: { children: React.ReactNode }) {
  return children;
}
