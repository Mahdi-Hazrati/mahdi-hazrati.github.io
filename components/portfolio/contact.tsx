"use client";

import { motion } from "framer-motion";
import { Copy, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import {
  fadeUp,
  fadeUpItem,
  scaleIn,
  springSnappy,
  staggerContainer,
  viewport,
} from "@/lib/motion";
import { site, socialLinks } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="py-24 px-6 scroll-mt-20 border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="05   Contact"
          title="Let's build something together"
          description="Have a project, idea, or just want to say hi? I'd love to hear from you."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          whileHover={{ scale: 1.005 }}
          transition={springSnappy}
          className="rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 to-accent/5 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <motion.div variants={fadeUpItem}>
              <p className="font-mono text-sm text-muted-foreground mb-2">
                Preferred channel
              </p>
              <motion.a
                href={`mailto:${site.email}`}
                className="text-2xl md:text-3xl font-semibold hover:text-accent transition-colors break-all inline-block"
                whileHover={{ x: 4 }}
                transition={springSnappy}
              >
                {site.email}
              </motion.a>
              <p className="mt-4 text-muted-foreground flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-accent animate-pulse-soft" aria-hidden />
                Based in {site.location} · Remote-friendly
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                type="button"
                onClick={copyEmail}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springSnappy}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:border-accent/50"
              >
                <Copy className="w-4 h-4" aria-hidden />
                {copied ? "Copied!" : "Copy email"}
              </motion.button>
              <motion.a
                href={`mailto:${site.email}`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springSnappy}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium shadow-lg shadow-accent/20"
              >
                <Mail className="w-4 h-4" aria-hidden />
                Send email
              </motion.a>
            </div>
          </div>

          <motion.div
            className="mt-10 pt-10 border-t border-border/60 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUpItem}
                whileHover={{ y: -4, borderColor: "hsl(var(--accent) / 0.4)" }}
                transition={springSnappy}
                className="rounded-lg border border-border/60 p-4 hover:bg-card/50"
              >
                <p className="font-medium">{link.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{link.handle}</p>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
