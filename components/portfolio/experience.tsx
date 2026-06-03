"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function Experience() {
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

        <div className="relative">
          <div className="absolute left-[7px] md:left-8 top-2 bottom-2 w-px bg-border" />

          <ul className="space-y-10">
            {experience.map((item, i) => (
              <motion.li
                key={item.period}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-10 md:pl-14"
              >
                <span className="absolute left-0 md:left-2 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-background" />
                <p className="font-mono text-xs text-accent mb-1">{item.period}</p>
                <h3 className="text-lg font-semibold">{item.role}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
