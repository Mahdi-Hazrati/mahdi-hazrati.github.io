"use client";

import { motion } from "framer-motion";

export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="absolute inset-0 opacity-[0.4] overflow-hidden">
        <div
          className="absolute inset-[-64px] grid-drift"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--grid-line)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--grid-line)) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <motion.div
        className="absolute top-[-10%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/12 blur-[130px] glow-float"
        animate={{ opacity: [0.25, 0.45, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-5%] right-[-5%] h-[420px] w-[420px] rounded-full bg-glow-secondary/18 blur-[110px] glow-float-delayed"
        animate={{ opacity: [0.2, 0.38, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[40%] left-[-8%] h-[280px] w-[280px] rounded-full bg-accent/8 blur-[90px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
