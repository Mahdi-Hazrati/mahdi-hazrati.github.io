import { site } from "./portfolio";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  published?: boolean;
  featured?: boolean;
  image?: string;
};

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  html: string;
  toc: TocHeading[];
};

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function postUrl(slug: string): string {
  return `https://${site.domain}/blog/${slug}`;
}

export function blogIndexUrl(): string {
  return `https://${site.domain}/blog`;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
