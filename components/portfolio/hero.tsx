"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { roles, site, socialLinks } from "@/lib/portfolio";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-card/50 text-sm text-muted-foreground mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {site.availability}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-xl border border-border/80 bg-card/40 backdrop-blur-sm overflow-hidden mb-10 shadow-2xl shadow-black/20"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              ~/welcome — zsh
            </span>
          </div>
          <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-3">
            <p>
              <span className="text-accent">$</span> whoami
            </p>
            <p className="text-foreground text-lg md:text-2xl font-semibold font-sans tracking-tight">
              {site.name}
            </p>
            <p>
              <span className="text-accent">$</span> cat role.txt
            </p>
            <p className="text-muted-foreground h-8">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
              <span className="cursor-blink text-accent ml-0.5">|</span>
            </p>
            <p>
              <span className="text-accent">$</span> echo &quot;{site.tagline}&quot;
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" aria-hidden />
            Download CV
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
          >
            <Sparkles className="w-4 h-4 text-accent" aria-hidden />
            View work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <span className="text-foreground font-medium">{link.name}</span>
              <span className="mx-2 text-border">/</span>
              {link.handle}
            </a>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto md:mx-0"
          aria-label="Scroll to about"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
