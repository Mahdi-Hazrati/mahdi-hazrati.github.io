import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { markdownToHtml } from "./markdown-processor";
import { site } from "./portfolio";
import type {
  BlogFrontmatter,
  BlogPost,
  BlogPostMeta,
  TocHeading,
} from "./blog-types";
import { blogIndexUrl, postUrl, slugifyHeading } from "./blog-types";

export type { BlogFrontmatter, BlogPost, BlogPostMeta, TocHeading } from "./blog-types";
export { formatDate, postUrl, blogIndexUrl } from "./blog-types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function extractToc(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
    headings.push({ id: slugifyHeading(text), text, level });
  }

  return headings;
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function parseMeta(slug: string, raw: string): BlogPostMeta | null {
  const { data, content } = matter(raw);
  const fm = data as Partial<BlogFrontmatter>;

  if (fm.published === false) return null;

  const stats = readingTime(content);

  return {
    slug,
    title: fm.title ?? slug,
    description: fm.description ?? "",
    date: fm.date ?? new Date().toISOString(),
    updated: fm.updated,
    tags: fm.tags ?? [],
    published: fm.published ?? true,
    featured: fm.featured ?? false,
    image: fm.image,
    thumbnail: fm.thumbnail ?? fm.image,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getMarkdownFiles()
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      return parseMeta(slug, raw);
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const resolved = fs.existsSync(filePath)
    ? filePath
    : fs.existsSync(mdxPath)
      ? mdxPath
      : null;

  if (!resolved) return null;

  const raw = fs.readFileSync(resolved, "utf8");
  const meta = parseMeta(slug, raw);
  if (!meta) return null;

  const { content } = matter(raw);
  const [html, toc] = await Promise.all([
    markdownToHtml(content),
    Promise.resolve(extractToc(content)),
  ]);

  return { ...meta, content, html, toc };
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getAllPosts().find((p) => p.slug === slug);
  if (!current) return [];

  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function generateRssFeed(): string {
  const posts = getAllPosts().slice(0, 20);
  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl(post.slug)}</link>
      <guid isPermaLink="true">${postUrl(post.slug)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name} — Tech Blog</title>
    <link>${blogIndexUrl()}</link>
    <description>Notes on React, Next.js, design systems, and shipping products.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://${site.domain}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
