"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-border/30 pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent/90 to-glow-secondary shadow-[0_0_12px_hsl(var(--accent)/0.45)]"
        style={{ scaleX }}
      />
    </div>
  );
}
