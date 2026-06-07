"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Star } from "lucide-react";
import Link from "next/link";
import { cardHover, fadeUpItem, springSnappy, viewport } from "@/lib/motion";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";

type PostCardProps = {
  post: BlogPostMeta;
  index?: number;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <motion.article
      variants={fadeUpItem}
      initial="rest"
      whileHover="hover"
      viewport={viewport}
      className="group relative rounded-xl border border-border/80 bg-card/40 p-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
      <motion.div variants={cardHover} className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0">
            {post.featured && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-accent mb-2">
                <Star className="w-3 h-3 fill-accent" aria-hidden />
                Featured
              </span>
            )}
            <Link href={`/blog/${post.slug}`} className="block group/title">
              <h3 className="text-xl font-semibold group-hover/title:text-accent transition-colors duration-300 truncate">
                {post.title}
              </h3>
            </Link>
            <p className="font-mono text-xs text-muted-foreground mt-1 flex items-center gap-3 flex-wrap">
              <span>{post.slug}.md</span>
              <span className="text-border">·</span>
              <span>{formatDate(post.date)}</span>
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.1, rotate: 6 }} transition={springSnappy}>
            <Link
              href={`/blog/${post.slug}`}
              className="p-2 rounded-lg border border-border/60 hover:border-accent/50 hover:text-accent inline-flex"
              aria-label={`Read ${post.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <p className="text-muted-foreground leading-relaxed line-clamp-2">
          {post.description}
        </p>

        <div className="flex items-center justify-between mt-5 gap-4 flex-wrap">
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="px-2.5 py-1 rounded-md bg-muted/50 font-mono text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground shrink-0">
            <Clock className="w-3.5 h-3.5" />
            {post.readingMinutes} min
          </span>
        </div>
      </motion.div>
    </motion.article>
  );
}
