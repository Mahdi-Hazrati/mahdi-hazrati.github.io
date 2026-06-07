import type { BlogPostMeta } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PostNavigationProps = {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
};

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="grid sm:grid-cols-2 gap-4 mt-16 pt-8 border-t border-border/40"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group rounded-xl border border-border/80 bg-card/40 p-5 hover:border-accent/40 transition-colors"
        >
          <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground mb-2">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Older
          </span>
          <p className="font-medium group-hover:text-accent transition-colors line-clamp-2">
            {prev.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {formatDate(prev.date)}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group rounded-xl border border-border/80 bg-card/40 p-5 hover:border-accent/40 transition-colors sm:text-right"
        >
          <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground mb-2 sm:justify-end sm:w-full">
            Newer
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
          <p className="font-medium group-hover:text-accent transition-colors line-clamp-2">
            {next.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {formatDate(next.date)}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
