import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { ArticleJsonLd } from "@/components/blog/json-ld";
import { PostContent } from "@/components/blog/post-content";
import { PostCover } from "@/components/blog/post-cover";
import { PostNavigation } from "@/components/blog/post-navigation";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ShareLinks } from "@/components/blog/share-links";
import { TableOfContents } from "@/components/blog/table-of-contents";
import {
  formatDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  postUrl,
} from "@/lib/blog";
import { getPostCover } from "@/lib/blog-types";
import { site } from "@/lib/portfolio";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const url = postUrl(post.slug);
  const cover = getPostCover(post);

  return {
    title: `${post.title} — Mahdi Hazrati`,
    description: post.description,
    authors: [{ name: site.name, url: `https://${site.domain}` }],
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      url,
      siteName: site.domain,
      tags: post.tags,
      ...(cover ? { images: [{ url: cover.startsWith("http") ? cover : `https://${site.domain}${cover}` }] } : {}),
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const { prev, next } = getAdjacentPosts(post.slug);
  const url = postUrl(post.slug);
  const cover = getPostCover(post);

  return (
    <>
      <ArticleJsonLd post={post} />
      <main className="pt-24 pb-24 px-6 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-10 font-mono group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ~/blog
          </Link>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
            <article>
              <header className="mb-10">
                <p className="font-mono text-xs text-accent mb-3">
                  {post.slug}.md
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight">
                  {post.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {post.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-sm text-muted-foreground font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                    {post.updated && post.updated !== post.date && (
                      <span className="text-xs opacity-70">
                        (updated {formatDate(post.updated)})
                      </span>
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingMinutes} min read
                  </span>
                </div>

                {post.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mt-5">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted/50 font-mono text-xs text-muted-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8 pt-6 border-t border-border/40">
                  <ShareLinks url={url} title={post.title} />
                </div>
              </header>

              {cover && (
                <PostCover
                  src={cover}
                  alt={post.title}
                  className="mb-10"
                  priority
                />
              )}

              <ReadingProgress>
                <PostContent html={post.html} />
              </ReadingProgress>

              <PostNavigation prev={prev} next={next} />
              <RelatedPosts posts={related} />
            </article>

            <aside className="hidden lg:block">
              <TableOfContents headings={post.toc} />
            </aside>
          </div>

          {post.toc.length > 0 && (
            <div className="lg:hidden mt-12">
              <TableOfContents headings={post.toc} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
