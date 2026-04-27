// Server component – no 'use client' needed
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Jörg Lederer GmbH",
  alternateName: "Lederer Elastic-Garne",
  url: "https://lederer-elastic.de",
  logo: "https://lederer-elastic.de/images/Lederer Logo.svg",
  foundingDate: "1948",
  description:
    "Jörg Lederer GmbH – Ihr Spezialist für elastische Garne seit 1948. Umwundene und luftverwirbelte Garne für Strumpfwaren, Kompressionsartikel und technische Textilien. Made in Germany.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hauptstraße 115",
    addressLocality: "Amstetten",
    postalCode: "73340",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+49-7331-2006-0",
    contactType: "customer service",
    availableLanguage: ["German", "English"],
  },
  sameAs: [
    "https://www.youtube.com/@ledererelasticyarns",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 130,
  },
  areaServed: ["DE", "AT", "CH", "IT", "TR", "FR", "ES", "PT"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Elastische Garne",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Umwundene Garne (Single & Double Cover)" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Luftverwirbelte Garne" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Elasto Twist" } },
    ],
  },
};

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lederer Elastic-Garne",
  url: "https://lederer-elastic.de",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://lederer-elastic.de/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostLd(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      worksFor: { "@type": "Organization", name: "Jörg Lederer GmbH" },
    },
    publisher: {
      "@type": "Organization",
      name: "Jörg Lederer GmbH",
      logo: { "@type": "ImageObject", url: "https://lederer-elastic.de/images/Lederer Logo.svg" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lederer-elastic.de/blog/${post.slug}`,
    },
  };
}
