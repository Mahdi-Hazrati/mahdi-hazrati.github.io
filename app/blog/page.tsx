import type { Metadata } from "next";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogJsonLd } from "@/components/blog/json-ld";
import { PostList } from "@/components/blog/post-list";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { site } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Tech Blog   Mahdi Hazrati",
  description:
    "Notes on React, Next.js, design systems, privacy-first analytics, and shipping products.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Tech Blog   Mahdi Hazrati",
    description:
      "Notes on React, Next.js, design systems, and shipping products.",
    url: `https://${site.domain}/blog`,
    siteName: site.domain,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main className="pt-24 pb-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <BlogJsonLd posts={posts} />
        <BlogHeader
          title="Writing about what I build"
          description="Deep dives on frontend architecture, design systems, and product engineering   straight from the terminal."
          postCount={posts.length}
        />
        <PostList posts={posts} tags={tags} />
      </div>
    </main>
  );
}
