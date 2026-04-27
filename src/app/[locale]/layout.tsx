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

const roboto = localFont({
  src: [
    {
      path: "../../../public/fonts/Roboto-VariableFont_wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

const splineSans = localFont({
  src: [
    {
      path: "../../../public/fonts/SplineSans-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-spline-sans",
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
      className={`${roboto.variable} ${splineSans.variable} h-full antialiased`}
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
