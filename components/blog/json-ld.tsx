import type { BlogPostMeta } from "@/lib/blog-types";
import { postUrl, formatDate, getPostCover } from "@/lib/blog-types";
import { site } from "@/lib/portfolio";

type ArticleJsonLdProps = {
  post: BlogPostMeta;
};

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: site.name,
      url: `https://${site.domain}`,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl(post.slug),
    },
    keywords: post.tags.join(", "),
    ...(getPostCover(post) ? { image: getPostCover(post) } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type BlogJsonLdProps = {
  posts: BlogPostMeta[];
};

export function BlogJsonLd({ posts }: BlogJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name}   Tech Blog`,
    description: "Notes on React, Next.js, design systems, and shipping products.",
    url: `https://${site.domain}/blog`,
    author: {
      "@type": "Person",
      name: site.name,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: postUrl(post.slug),
      datePublished: post.date,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
