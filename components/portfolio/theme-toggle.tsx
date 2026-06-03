"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { springSnappy } from "@/lib/motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 rounded-lg border border-border/60 bg-card/50 ${className}`}
        aria-hidden
      />
    );
  }

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  const icon =
    theme === "system" ? (
      <Monitor className="h-4 w-4" aria-hidden />
    ) : resolvedTheme === "dark" ? (
      <Moon className="h-4 w-4" aria-hidden />
    ) : (
      <Sun className="h-4 w-4" aria-hidden />
    );

  const label =
    theme === "system"
      ? "Using system theme. Click for light mode."
      : resolvedTheme === "dark"
        ? "Switch to light mode"
        : "Switch to system theme";

  return (
    <motion.button
      type="button"
      onClick={cycleTheme}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={springSnappy}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-muted-foreground hover:border-accent/40 hover:text-accent transition-colors ${className}`}
      aria-label={label}
      title={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme === "system" ? "system" : resolvedTheme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
