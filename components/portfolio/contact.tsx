"use client";

import { motion } from "framer-motion";
import { Copy, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
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
          label="05 — Contact"
          title="Let's build something together"
          description="Have a project, idea, or just want to say hi? I'd love to hear from you."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 to-accent/5 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="font-mono text-sm text-muted-foreground mb-2">
                Preferred channel
              </p>
              <a
                href={`mailto:${site.email}`}
                className="text-2xl md:text-3xl font-semibold hover:text-accent transition-colors break-all"
              >
                {site.email}
              </a>
              <p className="mt-4 text-muted-foreground flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-accent" aria-hidden />
                Based in {site.location} · Remote-friendly
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors"
              >
                <Copy className="w-4 h-4" aria-hidden />
                {copied ? "Copied!" : "Copy email"}
              </button>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" aria-hidden />
                Send email
              </a>
            </div>
          </div>

          <div className="mt-10 pt-10 border-t border-border/60 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border/60 p-4 hover:border-accent/40 hover:bg-card/50 transition-colors"
              >
                <p className="font-medium">{link.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{link.handle}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
