"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { fadeUpItem, springSnappy, staggerContainer } from "@/lib/motion";
import { navLinks, site } from "@/lib/portfolio";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const backdrop = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: useTransform(
          backdrop,
          (v) => `hsl(var(--background) / ${0.72 + v * 0.23})`
        ),
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md"
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div whileHover={{ x: 2 }} transition={springSnappy}>
          <Link
            href="#"
            className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            <span className="text-accent">~/</span>
            {site.domain}
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ y: -2 }}
                  transition={springSnappy}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={springSnappy}
                    style={{ width: "100%" }}
                  />
                </motion.a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <motion.button
            type="button"
            className="p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <motion.ul
              className="px-6 py-4 flex flex-col gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={fadeUpItem}>
                  <a
                    href={link.href}
                    className="block text-muted-foreground hover:text-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={fadeUpItem} className="flex items-center gap-2 pt-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
