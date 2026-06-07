---
title: "Every Markdown Feature This Blog Supports"
description: "A living reference for writing posts — thumbnails, code, tables, alerts, footnotes, images, audio, video, and YouTube embeds."
date: "2025-06-07"
tags: ["Markdown", "Blog", "Reference"]
featured: true
published: true
thumbnail: "/blog/thumbnails/markdown-showcase.svg"
image: "/blog/thumbnails/markdown-showcase.svg"
---

This post is the **authoring reference** for mahdi.is-a.dev/blog. Bookmark it when writing new articles.

## Frontmatter fields

Every post lives in `content/blog/*.md` with YAML frontmatter:

```yaml title="content/blog/example.md"
---
title: "Post title"
description: "One-line summary for SEO & cards"
date: "2025-06-07"
updated: "2025-06-08"          # optional
tags: ["React", "Next.js"]
featured: true                  # optional — larger card on index
published: true                 # false = hidden draft
thumbnail: "/blog/thumbs/x.jpg"  # card & post header cover
image: "/blog/og/x.jpg"         # optional OG/Twitter override
---
```

`thumbnail` powers card covers and the post header hero. Falls back to `image` when omitted.

## Typography & text

Regular **bold**, *italic*, ~~strikethrough~~, and `inline code` all render with design-system colors.

Keyboard shortcuts look like <kbd>Ctrl</kbd> + <kbd>S</kbd>.

Autolinks work out of the box: https://nextjs.org

External links open in a new tab with a ↗ indicator — [Next Production](https://nextproduction.dev).

## Lists

Ordered lists:

1. Parse markdown at build time
2. Generate static HTML
3. Deploy to any CDN

Unordered nested lists:

- Frontend
  - React & Next.js
  - TypeScript
- Tooling
  - GitHub Actions
  - Tailwind CSS

Task lists:

- [x] Thumbnails on cards
- [x] YouTube embeds
- [x] Syntax-highlighted code
- [ ] Your next post here

## Code blocks

Fenced blocks get **Shiki highlighting**, line numbers, optional filenames, and line highlights:

```typescript title="lib/blog.ts" {3,10-14}
import { markdownToHtml } from "./markdown-processor";

export async function getPostBySlug(slug: string) {
  const raw = fs.readFileSync(`content/blog/${slug}.md`, "utf8");
  const { content } = matter(raw);

  const html = await markdownToHtml(content);
  const toc = extractToc(content);

  return { slug, html, toc };
}
```

Each block also gets a **Copy** button and terminal-style chrome in the browser.

## Tables

| Feature | Syntax | Rendered |
| --- | --- | --- |
| Thumbnail | `thumbnail:` in frontmatter | Card + header cover |
| YouTube | `::youtube ID` | Responsive iframe |
| Video | `::video /path.mp4` | HTML5 `<video>` |
| Audio | `::audio /path.mp3` | HTML5 `<audio>` |

## GitHub alerts

> [!NOTE]
> Alerts use GFM syntax. Great for callouts without custom components.

> [!TIP]
> Set `featured: true` to pin a post to the top grid on `/blog`.

> [!IMPORTANT]
> Thumbnails should be **16:9** for best results — SVG, PNG, or JPG in `public/`.

> [!WARNING]
> Static export means media files must live in `public/` or on a trusted CDN.

> [!CAUTION]
> YouTube embeds use `youtube-nocookie.com` for slightly better privacy.

## Blockquotes & dividers

> "File-based blogs scale down beautifully."
> — every developer who deleted their CMS

---

## Images

Standard markdown images with optional title as caption:

![Terminal aesthetic grid background](/blog/thumbnails/markdown-showcase.svg "Blog thumbnail — SVG cover art")

## YouTube embeds

Use the directive syntax with a video ID or full URL:

::youtube TzHB9YidXEk

Or paste a standalone link:

https://www.youtube.com/watch?v=jNQXAC9IVRw

Both render as responsive 16:9 iframes with lazy loading.

## Video & audio

Host files in `public/blog/media/` then reference them:

::video https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4 "MDN sample — flower.mp4"

::audio https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3 "MDN sample — T-Rex roar"

Local paths work too once you add files:

```markdown
::video /blog/media/demo.mp4 "My screencast"
::audio /blog/media/episode-01.mp3 "Podcast clip"
```

## Footnotes

Footnotes keep citations out of the main flow[^gfm] without breaking reading rhythm[^mdn].

[^gfm]: GitHub Flavored Markdown spec — alerts, tables, task lists, and more.
[^mdn]: MDN Web Docs — excellent CC0 media samples for testing embeds.

## Quick reference

| Want | Write |
| --- | --- |
| Cover image | `thumbnail: "/path.jpg"` |
| YouTube | `::youtube dQw4w9WgXcQ` |
| Video file | `::video /blog/media/x.mp4 "Caption"` |
| Audio file | `::audio /blog/media/x.mp3 "Caption"` |
| Hide draft | `published: false` |
| Highlight lines | ` ```ts {2,5-8}` ` |
| Filename in code | ` ```ts title="app/page.tsx"` ` |

That covers everything this blog engine supports today. Copy a section, start writing, and ship.
