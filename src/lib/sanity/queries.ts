import { getClient } from "./client";
import type {
  SanityBlogPost,
  SanityTeamMember,
  SanityJobPosting,
  SanityTestimonial,
  SanityCertificate,
  SanitySiteSettings,
} from "./types";

// ─── Blog ────────────────────────────────────────────────────────────────────

const blogPostFields = `
  _id, title, "slug": slug.current, excerpt, tag, date,
  author, readingTime, featured, seoTitle, seoDescription
`;

const blogPostFullFields = `
  ${blogPostFields}, content
`;

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  return getClient().fetch(
    `*[_type == "blogPost"] | order(date desc) { ${blogPostFields} }`,
    {},
    { next: { tags: ["blog"] } }
  );
}

export async function getFeaturedBlogPost(): Promise<SanityBlogPost | null> {
  const posts = await getClient().fetch<SanityBlogPost[]>(
    `*[_type == "blogPost" && featured == true] | order(date desc)[0..0] { ${blogPostFields} }`,
    {},
    { next: { tags: ["blog"] } }
  );
  return posts[0] ?? null;
}

export async function getRecentBlogPosts(
  limit = 3,
  excludeSlug?: string
): Promise<SanityBlogPost[]> {
  const condition = excludeSlug
    ? `_type == "blogPost" && slug.current != $excludeSlug`
    : `_type == "blogPost"`;
  return getClient().fetch(
    `*[${condition}] | order(date desc)[0...$limit] { ${blogPostFields} }`,
    { limit: limit - 1, excludeSlug: excludeSlug ?? "" },
    { next: { tags: ["blog"] } }
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<SanityBlogPost | null> {
  const posts = await getClient().fetch<SanityBlogPost[]>(
    `*[_type == "blogPost" && slug.current == $slug][0..0] { ${blogPostFullFields} }`,
    { slug },
    { next: { tags: [`blog-${slug}`] } }
  );
  return posts[0] ?? null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getClient().fetch<{ slug: string }[]>(
    `*[_type == "blogPost"] { "slug": slug.current }`,
    {},
    { next: { tags: ["blog"] } }
  );
  return posts.map((p) => p.slug);
}

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
