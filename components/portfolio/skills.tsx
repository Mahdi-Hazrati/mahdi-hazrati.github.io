"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 scroll-mt-20 border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="02 — Skills"
          title="Stack I reach for daily"
          description="From UI polish to shipping — tools I know well and keep sharpening."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="rounded-xl border border-border/80 bg-card/40 p-6"
            >
              <h3 className="font-mono text-sm text-accent mb-6">{group.name}</h3>
              <ul className="space-y-5">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground font-mono text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-glow-secondary"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
