"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Rss } from "lucide-react";
import Link from "next/link";
import { fadeUp, viewport } from "@/lib/motion";

type BlogHeaderProps = {
  title: string;
  description: string;
  postCount: number;
};

export function BlogHeader({ title, description, postCount }: BlogHeaderProps) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mb-12 md:mb-16"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8 font-mono group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        ~/home
      </Link>

      <div className="rounded-xl border border-border/80 bg-card/40 backdrop-blur-sm overflow-hidden mb-8">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
          {["bg-red-500/80", "bg-amber-500/80", "bg-emerald-500/80"].map((c) => (
            <span key={c} className={`w-3 h-3 rounded-full ${c}`} />
          ))}
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            ~/blog   ls posts/
          </span>
        </div>
        <div className="p-6 md:p-8 font-mono text-sm space-y-2">
          <p>
            <span className="text-accent">$</span> ls -la content/blog/
          </p>
          <p className="text-muted-foreground">
            total {postCount}   {postCount} markdown files, 0 directories
          </p>
        </div>
      </div>

      <p className="font-mono text-sm text-accent mb-2 tracking-wider uppercase">
        Tech Blog
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl text-lg leading-relaxed">
        {description}
      </p>
      <a
        href="/feed.xml"
        className="inline-flex items-center gap-2 mt-6 text-sm font-mono text-muted-foreground hover:text-accent transition-colors"
        title="RSS feed"
      >
        <Rss className="w-4 h-4" />
        Subscribe via RSS
      </a>
    </motion.header>
  );
}

export function BlogSectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      className="mb-8"
    >
      <p className="font-mono text-sm text-accent mb-2 tracking-wider uppercase">
        {label}
      </p>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-2 text-muted-foreground max-w-2xl">{description}</p>
      )}
    </motion.div>
  );
}
