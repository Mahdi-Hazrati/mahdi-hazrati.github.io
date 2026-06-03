"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fadeUpItem,
  springSnappy,
  springSmooth,
  staggerContainer,
  tweenSmooth,
} from "@/lib/motion";
import { roles, site, socialLinks } from "@/lib/portfolio";

const terminalLines = [
  { type: "cmd" as const, text: "whoami" },
  { type: "out" as const, text: site.name, large: true },
  { type: "cmd" as const, text: "cat role.txt" },
  { type: "role" as const },
  { type: "cmd" as const, text: `echo "${site.tagline}"` },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6">
      <motion.div
        className="max-w-5xl mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUpItem}
          whileHover={{ scale: 1.02 }}
          transition={springSnappy}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-card/50 text-sm text-muted-foreground mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {site.availability}
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          whileHover={{ y: -4 }}
          transition={springSmooth}
          className="rounded-xl border border-border/80 bg-card/40 backdrop-blur-sm overflow-hidden mb-10 shadow-2xl shadow-black/20"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
            {["bg-red-500/80", "bg-amber-500/80", "bg-emerald-500/80"].map((c) => (
              <motion.span
                key={c}
                className={`w-3 h-3 rounded-full ${c}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...springSnappy, delay: 0.1 }}
              />
            ))}
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              ~/welcome — zsh
            </span>
          </div>
          <motion.div
            className="p-6 md:p-8 font-mono text-sm md:text-base space-y-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {terminalLines.map((line, i) => {
              if (line.type === "role") {
                return (
                  <motion.p
                    key="role"
                    variants={fadeUpItem}
                    className="text-muted-foreground h-8 overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={roleIndex}
                        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                        transition={tweenSmooth}
                        className="text-accent inline-block"
                      >
                        {roles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <span className="cursor-blink text-accent ml-0.5">|</span>
                  </motion.p>
                );
              }
              if (line.type === "cmd") {
                return (
                  <motion.p key={i} variants={fadeUpItem}>
                    <span className="text-accent">$</span> {line.text}
                  </motion.p>
                );
              }
              if (line.type === "out") {
                return (
                  <motion.p
                    key={i}
                    variants={fadeUpItem}
                    className={`text-foreground font-semibold font-sans tracking-tight ${
                      line.large ? "text-lg md:text-2xl" : ""
                    }`}
                  >
                    {line.text}
                  </motion.p>
                );
              }
              return null;
            })}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUpItem} className="flex flex-wrap gap-4">
          <motion.a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium shadow-lg shadow-accent/20"
          >
            <Download className="w-4 h-4" aria-hidden />
            Download CV
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, y: -2, borderColor: "hsl(var(--accent) / 0.5)" }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card/50 hover:bg-card/80"
          >
            <Sparkles className="w-4 h-4 text-accent" aria-hidden />
            View work
          </motion.a>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUpItem}
              custom={i}
              whileHover={{ x: 4, color: "hsl(var(--accent))" }}
              transition={springSnappy}
              className="hover:text-accent"
            >
              <span className="text-foreground font-medium">{link.name}</span>
              <span className="mx-2 text-border">/</span>
              {link.handle}
            </motion.a>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          variants={fadeUpItem}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-20 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors md:mx-0 mx-auto"
          aria-label="Scroll to about"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
