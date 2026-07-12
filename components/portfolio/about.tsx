"use client";

import { motion } from "framer-motion";
import {
  fadeUpItem,
  scaleIn,
  slideInLeft,
  slideInRight,
  springSnappy,
  springSmooth,
  staggerContainer,
  viewport,
} from "@/lib/motion";
import { about, nowBuilding, stats } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function About() {
  return (
    <section id="about" className="py-24 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="01   About"
          title="Building for the web, one commit at a time"
          description={about.intro}
        />

        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={springSnappy}
              className="rounded-xl border border-border/80 bg-card/40 p-6 text-center"
            >
              <motion.p
                className="text-3xl md:text-4xl font-bold text-accent font-mono"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={springSmooth}
              >
                {stat.value}
              </motion.p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {about.highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={slideInLeft}
                whileHover={{ x: 6, borderColor: "hsl(var(--accent) / 0.35)" }}
                transition={springSmooth}
                className="rounded-lg border border-border/60 bg-card/30 p-5"
              >
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideInRight}
            whileHover={{ scale: 1.01 }}
            transition={springSmooth}
            className="rounded-xl border border-accent/30 bg-accent/5 p-6"
          >
            <p className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
              Currently exploring
            </p>
            <motion.ul
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {nowBuilding.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUpItem}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <motion.span
                    className="text-accent mt-1"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
