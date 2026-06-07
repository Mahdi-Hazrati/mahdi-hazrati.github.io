import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const SITE = {
  name: "Mahdi Hazrati",
  domain: "mahdi.is-a.dev",
};

function postUrl(slug) {
  return `https://${SITE.domain}/blog/${slug}`;
}

function getPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data } = matter(raw);
      if (data.published === false) return null;
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? new Date().toISOString(),
        tags: data.tags ?? [],
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

const posts = getPosts().slice(0, 20);

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

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name} — Tech Blog</title>
    <link>https://${SITE.domain}/blog</link>
    <description>Notes on React, Next.js, design systems, and shipping products.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://${SITE.domain}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

const outPath = path.join(process.cwd(), "public", "feed.xml");
fs.writeFileSync(outPath, feed.trim() + "\n", "utf8");
console.log(`Generated ${outPath} (${posts.length} posts)`);
