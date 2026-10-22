import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { JsonLd, ORGANIZATION_LD, WEBSITE_LD } from "@/components/seo/json-ld";
import "../globals.css";

// Styleguide-Schrift: Proxima Nova – Text 400–700, Headlines ExtraBold/Black (800/900).
const proxima = localFont({
  src: [
    {
      path: "../../../public/fonts/ProximaNova-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ProximaNova-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/ProximaNova-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ProximaNova-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ProximaNova-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ProximaNova-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ProximaNova-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-proxima",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lederer Elastic-Garne | Tradition. Innovation. Qualität.",
    template: "%s | Lederer Elastic-Garne",
  },
  description:
    "Jörg Lederer GmbH – Seit 1948 Ihr Spezialist für elastische Garne. Hochwertige umwundene und luftverwirbelte Garne für Strumpfwaren, Kompressionsartikel und technische Textilien. Made in Germany.",
  metadataBase: new URL("https://lederer-elastic.de"),
  keywords: [
    "elastische Garne",
    "Garnhersteller Deutschland",
    "umwundene Garne",
    "luftverwirbelte Garne",
    "Elasto Twist",
    "Kompressionsstrumpf Garn",
    "LYCRA Garn",
    "Textilunternehmen Amstetten",
    "Made in Germany Garne",
  ],
  authors: [{ name: "Jörg Lederer GmbH", url: "https://lederer-elastic.de" }],
  creator: "Jörg Lederer GmbH",
  publisher: "Jörg Lederer GmbH",
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "en_US",
    siteName: "Lederer Elastic-Garne",
    url: "https://lederer-elastic.de",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lederer Elastic-Garne – Tradition. Innovation. Qualität.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lederer Elastic-Garne | Tradition. Innovation. Qualität.",
    description:
      "Jörg Lederer GmbH – Seit 1948 Ihr Spezialist für elastische Garne. Made in Germany.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lederer-elastic.de",
    languages: {
      de: "https://lederer-elastic.de",
      en: "https://lederer-elastic.de/en",
    },
  },
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${proxima.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-dark font-body">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={ORGANIZATION_LD} />
          <JsonLd data={WEBSITE_LD} />
          <SmoothScrollProvider>
            <Header />
            {children}
            <Footer />
            <CookieConsent />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
