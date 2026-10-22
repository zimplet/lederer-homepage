import { getClient } from "./client";
import type {
  SanityTeamMember,
  SanityJobPosting,
  SanityTestimonial,
  SanityCertificate,
  SanitySiteSettings,
} from "./types";

// ─── Team ────────────────────────────────────────────────────────────────────

export async function getTeamMembers(
  featuredOnly = false
): Promise<SanityTeamMember[]> {
  const filter = featuredOnly
    ? `_type == "teamMember" && featured == true`
    : `_type == "teamMember"`;
  return getClient().fetch(
    `*[${filter}] | order(order asc) {
      _id, name, role, department, email, phone, bio, featured, order,
      image { asset->{ _id, url, metadata { dimensions } }, hotspot }
    }`,
    {},
    { next: { tags: ["team"] } }
  );
}

// ─── Jobs ────────────────────────────────────────────────────────────────────

export async function getActiveJobs(): Promise<SanityJobPosting[]> {
  return getClient().fetch(
    `*[_type == "jobPosting" && active == true] | order(publishedAt desc) {
      _id, title, "slug": slug.current, type, department, location,
      summary, requirements, benefits, publishedAt
    }`,
    {},
    { next: { tags: ["jobs"] } }
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export async function getTestimonials(
  featuredOnly = false
): Promise<SanityTestimonial[]> {
  const filter = featuredOnly
    ? `_type == "testimonial" && featured == true`
    : `_type == "testimonial"`;
  return getClient().fetch(
    `*[${filter}] | order(order asc) {
      _id, author, role, quote, type, featured, order,
      avatar { asset->{ _id, url, metadata { dimensions } }, hotspot }
    }`,
    {},
    { next: { tags: ["testimonials"] } }
  );
}

// ─── Certificates ─────────────────────────────────────────────────────────────

export async function getCertificates(): Promise<SanityCertificate[]> {
  return getClient().fetch(
    `*[_type == "certificate"] | order(order asc) {
      _id, name, url, type, order,
      logo { asset->{ _id, url, metadata { dimensions } } }
    }`,
    {},
    { next: { tags: ["certificates"] } }
  );
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  const results = await getClient().fetch<SanitySiteSettings[]>(
    `*[_type == "siteSettings"][0..0] {
      _id, companyName, email, phone, address, openingHours,
      seoTitle, seoDescription,
      ogImage { asset->{ _id, url } }
    }`,
    {},
    { next: { tags: ["siteSettings"] } }
  );
  return results[0] ?? null;
}
