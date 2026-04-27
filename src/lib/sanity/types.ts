import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImageAsset {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
}

export interface SanityBlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: { current: string };
  excerpt: string;
  content: PortableTextBlock[];
  tag: string;
  date: string;
  author: string;
  readingTime: number;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SanityTeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  department?: string;
  email?: string;
  phone?: string;
  image?: SanityImageAsset;
  bio?: string;
  featured: boolean;
  order: number;
}

export interface SanityJobPosting {
  _id: string;
  _type: "jobPosting";
  title: string;
  slug?: { current: string };
  type: string;
  department?: string;
  location: string;
  summary: string;
  content?: PortableTextBlock[];
  requirements?: string[];
  benefits?: string[];
  active: boolean;
  publishedAt?: string;
}

export interface SanityTestimonial {
  _id: string;
  _type: "testimonial";
  author: string;
  role?: string;
  quote: string;
  avatar?: SanityImageAsset;
  type: "employee" | "leadership" | "customer";
  featured: boolean;
  order: number;
}

export interface SanityCertificate {
  _id: string;
  _type: "certificate";
  name: string;
  logo?: SanityImageAsset;
  url?: string;
  type?: string;
  order: number;
}

export interface SanitySiteSettings {
  _id: string;
  companyName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  openingHours?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImageAsset;
}
