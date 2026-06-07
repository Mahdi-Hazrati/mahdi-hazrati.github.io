---
title: "File-Based Blogs on Next.js Static Export"
description: "How to ship a markdown blog with zero database, full SEO, and static export — the same stack powering mahdi.is-a.dev."
date: "2025-05-12"
tags: ["Next.js", "Markdown", "Static Export"]
featured: true
published: true
---

Markdown files in a `content/` folder are underrated. No CMS login, no API keys, no migration scripts — just git history and a build step.

## Why file-based?

For a personal tech blog, the requirements are simple:

1. **Version control** — every edit is a commit
2. **Fast builds** — parse at build time, serve static HTML
3. **Portability** — move hosts without exporting a database
4. **Developer UX** — write in VS Code, preview locally

Static export (`output: 'export'`) on Next.js 13+ makes this especially clean. Server components read the filesystem during `next build`, generate HTML for every route, and you deploy plain files to any CDN.

## The pipeline

A typical setup looks like this:

```typescript
// lib/blog.ts — simplified
import fs from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export async function getPostBySlug(slug: string) {
  const raw = fs.readFileSync(`content/blog/${slug}.md`, "utf8");
  const { data, content } = matter(raw);
  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: "github-dark-dimmed" })
    .use(rehypeStringify)
    .process(content);
  return { ...data, html: String(html) };
}
```

Frontmatter holds metadata; the body stays pure markdown.

## SEO without a server

Even without SSR at request time, you can ship:

- **Per-page metadata** via `generateMetadata`
- **`sitemap.ts`** for crawlers
- **RSS feed** generated at build time into `public/feed.xml`
- **JSON-LD** Article schema on each post

The trick with static export is that dynamic route handlers don't run in production — pre-generate feeds and sitemaps during the build instead.

## Frontmatter schema

Keep it minimal but expressive:

```yaml
---
title: "Your post title"
description: "One sentence for OG tags and RSS"
date: "2025-05-12"
updated: "2025-05-14"   # optional
tags: ["React", "Next.js"]
featured: true
published: true
---
```

Set `published: false` to hide drafts from production builds without deleting files.

## Takeaways

File-based blogs scale down beautifully. You won't outgrow them until you need multi-author workflows, scheduled publishing, or a non-technical editor — and by then you'll know exactly what CMS features you actually need.

Until then: write markdown, commit, deploy.
