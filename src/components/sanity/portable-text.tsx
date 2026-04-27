import { PortableText as PortableTextBase } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";

interface PortableTextProps {
  value: PortableTextBlock[];
}

export function PortableText({ value }: PortableTextProps) {
  return (
    <PortableTextBase
      value={value}
      components={{
        types: {
          image: ({ value: img }) => {
            if (!img?.asset) return null;
            const src = urlFor(img).width(800).auto("format").url();
            return (
              <figure className="my-[var(--space-lg)]">
                <Image
                  src={src}
                  alt={img.alt ?? ""}
                  width={800}
                  height={500}
                  className="w-full rounded-[var(--radius-lg)] object-cover"
                />
                {img.caption && (
                  <figcaption className="mt-2 text-center font-body text-[var(--text-sm)] text-gray-400">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            );
          },
        },
        block: {
          h2: ({ children }) => (
            <h2 className="mt-[var(--space-xl)] mb-[var(--space-md)] font-heading text-[var(--text-2xl)] font-black text-dark-deep">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-[var(--space-lg)] mb-[var(--space-sm)] font-heading text-[var(--text-xl)] font-bold text-dark-deep">
              {children}
            </h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-[var(--space-lg)] border-l-4 border-red pl-[var(--space-md)] font-body text-[var(--text-lg)] italic text-gray-600">
              {children}
            </blockquote>
          ),
          normal: ({ children }) => (
            <p className="mb-[var(--space-md)] font-body text-[var(--text-base)] leading-relaxed text-gray-700">
              {children}
            </p>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="mb-[var(--space-md)] space-y-2 pl-[var(--space-md)]">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="mb-[var(--space-md)] list-decimal space-y-2 pl-[var(--space-md)]">
              {children}
            </ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="relative font-body text-[var(--text-base)] text-gray-700 before:absolute before:-left-4 before:text-red before:content-['›']">
              {children}
            </li>
          ),
          number: ({ children }) => (
            <li className="font-body text-[var(--text-base)] text-gray-700">
              {children}
            </li>
          ),
        },
        marks: {
          strong: ({ children }) => (
            <strong className="font-bold text-dark-deep">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          link: ({ children, value }) => (
            <a
              href={value?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red underline decoration-red/30 underline-offset-2 transition-colors hover:decoration-red"
            >
              {children}
            </a>
          ),
        },
      }}
    />
  );
}
