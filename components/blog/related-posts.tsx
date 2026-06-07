import type { BlogPostMeta } from "@/lib/blog-types";
import { PostCard } from "./post-card";
import { BlogSectionHeader } from "./blog-header";

type RelatedPostsProps = {
  posts: BlogPostMeta[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-border/40">
      <BlogSectionHeader
        label="Related"
        title="Continue reading"
        description="More notes on similar topics."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
