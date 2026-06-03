"use client";

import { motion } from "framer-motion";
import {
  cardHover,
  fadeUpItem,
  springSmooth,
  staggerContainer,
  tweenSmooth,
  viewport,
} from "@/lib/motion";
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

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.name}
              variants={fadeUpItem}
              initial="rest"
              whileHover="hover"
              className="rounded-xl border border-border/80 bg-card/40 p-6"
            >
              <motion.div variants={cardHover}>
                <h3 className="font-mono text-sm text-accent mb-6">{group.name}</h3>
                <ul className="space-y-5">
                  {group.skills.map((skill, si) => (
                    <motion.li
                      key={skill.name}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewport}
                      transition={{ ...tweenSmooth, delay: si * 0.05 }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground font-mono text-xs">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0, opacity: 0.6 }}
                          whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                          viewport={viewport}
                          transition={{
                            ...springSmooth,
                            delay: si * 0.08,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-accent via-accent/80 to-glow-secondary"
                        />
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
