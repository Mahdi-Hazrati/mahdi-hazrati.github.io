"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import type { BlogPostMeta } from "@/lib/blog-types";
import { PostCard } from "./post-card";
import { TagFilter } from "./tag-filter";
import { useMemo, useState } from "react";

type PostListProps = {
  posts: BlogPostMeta[];
  tags: string[];
};

export function PostList({ posts, tags }: PostListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <>
      <TagFilter tags={tags} activeTag={activeTag} onTagChange={setActiveTag} />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground font-mono text-sm py-12 text-center">
          No posts match this tag.
        </p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((post) => (
                <motion.div key={post.slug} variants={fadeUpItem}>
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <motion.div key={post.slug} variants={fadeUpItem}>
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
