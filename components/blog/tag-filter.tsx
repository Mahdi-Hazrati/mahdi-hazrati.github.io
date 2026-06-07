"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TagFilterProps = {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
};

export function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <FilterChip
        label="all"
        active={activeTag === null}
        onClick={() => onTagChange(null)}
      />
      {tags.map((tag) => (
        <FilterChip
          key={tag}
          label={tag}
          active={activeTag === tag}
          onClick={() => onTagChange(activeTag === tag ? null : tag)}
        />
      ))}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "px-3 py-1.5 rounded-md font-mono text-xs border transition-colors",
        active
          ? "bg-accent/15 border-accent/40 text-accent"
          : "bg-muted/30 border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
      )}
    >
      {label}
    </motion.button>
  );
}
