"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Star } from "lucide-react";
import Link from "next/link";
import { cardHover, fadeUpItem, springSnappy, viewport } from "@/lib/motion";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatDate, getPostCover } from "@/lib/blog-types";
import { PostCover } from "./post-cover";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: BlogPostMeta;
  variant?: "default" | "related";
};

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const cover = getPostCover(post);
  const isRelated = variant === "related";

  return (
    <motion.article
      variants={fadeUpItem}
      initial={isRelated ? false : "rest"}
      whileHover={isRelated ? undefined : "hover"}
      viewport={viewport}
      className={cn(
        "group relative rounded-xl border border-border/80 bg-card/40 overflow-hidden flex flex-col h-full"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl z-0" />

      {cover && (
        <Link
          href={`/blog/${post.slug}`}
          className="relative z-10 block shrink-0"
          tabIndex={-1}
          aria-hidden
        >
          <PostCover
            src={cover}
            alt=""
            className={cn(
              "rounded-none border-0 border-b border-border/60",
              isRelated ? "aspect-[16/10]" : "aspect-[16/9]"
            )}
          />
        </Link>
      )}

      <motion.div
        variants={isRelated ? undefined : cardHover}
        className={cn("relative z-10 flex flex-col flex-1", isRelated ? "p-5" : "p-6")}
      >
        <div className={cn("flex gap-3", isRelated ? "flex-col flex-1" : "items-start justify-between")}>
          <div className="min-w-0 flex-1">
            {post.featured && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-accent mb-2">
                <Star className="w-3 h-3 fill-accent" aria-hidden />
                Featured
              </span>
            )}
            <Link href={`/blog/${post.slug}`} className="block group/title">
              <h3
                className={cn(
                  "font-semibold group-hover/title:text-accent transition-colors duration-300",
                  isRelated ? "text-base leading-snug line-clamp-2" : "text-xl line-clamp-2"
                )}
              >
                {post.title}
              </h3>
            </Link>
            <p className="font-mono text-xs text-muted-foreground mt-1.5 flex items-center gap-2 flex-wrap">
              {!isRelated && (
                <>
                  <span className="truncate max-w-[160px]">{post.slug}.md</span>
                  <span className="text-border">·</span>
                </>
              )}
              <span>{formatDate(post.date)}</span>
            </p>
          </div>

          {!isRelated && (
            <motion.div whileHover={{ scale: 1.1, rotate: 6 }} transition={springSnappy}>
              <Link
                href={`/blog/${post.slug}`}
                className="p-2 rounded-lg border border-border/60 hover:border-accent/50 hover:text-accent inline-flex shrink-0"
                aria-label={`Read ${post.title}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        <p
          className={cn(
            "text-muted-foreground leading-relaxed mt-3",
            isRelated ? "text-sm line-clamp-3 flex-1" : "line-clamp-2"
          )}
        >
          {post.description}
        </p>

        <div
          className={cn(
            "flex items-center justify-between gap-3 flex-wrap mt-auto",
            isRelated ? "pt-4 mt-4 border-t border-border/40" : "mt-5"
          )}
        >
          <ul className="flex flex-wrap gap-1.5 min-w-0">
            {post.tags.slice(0, isRelated ? 2 : post.tags.length).map((tag) => (
              <li
                key={tag}
                className="px-2 py-0.5 rounded-md bg-muted/50 font-mono text-[10px] md:text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-mono text-muted-foreground shrink-0">
            <Clock className="w-3 h-3" />
            {post.readingMinutes} min
          </span>
        </div>
      </motion.div>
    </motion.article>
  );
}
