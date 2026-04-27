import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/ui/cookie-consent";
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
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "en_US",
    siteName: "Lederer Elastic-Garne",
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
