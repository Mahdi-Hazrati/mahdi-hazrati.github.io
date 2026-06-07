"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type ReadingProgressProps = {
  children: React.ReactNode;
};

export function ReadingProgress({ children }: ReadingProgressProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start 0.9", "end 0.1"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      <div
        className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-border/30 pointer-events-none"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full origin-left bg-accent"
          style={{ scaleX }}
        />
      </div>
      <div ref={contentRef}>{children}</div>
    </>
  );
}
