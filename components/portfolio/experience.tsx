"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUpItem, springSmooth, staggerContainer, viewport } from "@/lib/motion";
import { experience } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <section
      id="experience"
      className="py-24 px-6 scroll-mt-20 border-t border-border/40"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="04 — Experience"
          title="Where I've been shipping"
        />

        <div ref={ref} className="relative">
          <div className="absolute left-[7px] md:left-8 top-2 bottom-2 w-px bg-border/60 overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-accent via-accent/60 to-transparent origin-top"
              style={{ scaleY: lineScale }}
            />
          </div>

          <motion.ul
            className="space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {experience.map((item) => (
              <motion.li
                key={`${item.period}-${item.company}`}
                variants={fadeUpItem}
                className="relative pl-10 md:pl-14 group"
              >
                <motion.span
                  className="absolute left-0 md:left-2 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-background z-10"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={viewport}
                  transition={springSmooth}
                />
                <motion.span
                  className="absolute left-0 md:left-2 top-1.5 w-4 h-4 rounded-full bg-accent/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                />
                <p className="font-mono text-xs text-accent mb-1">{item.period}</p>
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors duration-300">
                  {item.role}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
