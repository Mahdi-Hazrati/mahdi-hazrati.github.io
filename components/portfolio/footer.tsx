"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import { site } from "@/lib/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      className="py-10 px-6 border-t border-border/40"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-mono">
          <span className="text-accent">©</span> {year} {site.name}
        </p>
        <p>
          Built with Next.js & Tailwind ·{" "}
          <motion.a
            href={`https://${site.domain}`}
            className="text-foreground hover:text-accent transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {site.domain}
          </motion.a>
        </p>
        <p className="font-mono text-xs opacity-60" title="Konami code hint">
          ↑↑↓↓←→←→BA
        </p>
      </div>
    </motion.footer>
  );
}
