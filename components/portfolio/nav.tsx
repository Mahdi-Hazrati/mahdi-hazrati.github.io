"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navLinks, site } from "@/lib/portfolio";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const backdrop = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header
      style={{
        backgroundColor: useTransform(
          backdrop,
          (v) => `hsla(222, 47%, 6%, ${0.6 + v * 0.35})`
        ),
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md"
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="#"
          className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors"
        >
          <span className="text-accent">~/</span>
          {site.domain}
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md"
        >
          <ul className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
