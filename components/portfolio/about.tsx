"use client";

import { motion } from "framer-motion";
import { about, nowBuilding, stats } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function About() {
  return (
    <section id="about" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="01 — About"
          title="Building for the web, one commit at a time"
          description={about.intro}
        />

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border/80 bg-card/40 p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-accent font-mono">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {about.highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border border-border/60 bg-card/30 p-5"
              >
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-accent/30 bg-accent/5 p-6"
          >
            <p className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
              Currently exploring
            </p>
            <ul className="space-y-3">
              {nowBuilding.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="text-accent mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
