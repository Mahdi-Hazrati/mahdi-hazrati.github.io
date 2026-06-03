"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
};

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 md:mb-16"
    >
      <p className="font-mono text-sm text-accent mb-2 tracking-wider uppercase">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
