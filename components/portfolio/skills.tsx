"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  fadeUp,
  springSnappy,
  springSmooth,
  tweenSmooth,
  viewport,
} from "@/lib/motion";
import { skillGroups } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  const boardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, hsl(var(--accent) / 0.12), transparent 55%)`;

  const cores = group.skills.filter((s) => s.role === "core");
  const dailies = group.skills.filter((s) => s.role === "daily");

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3;
      if (!inView) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      e.preventDefault();
      setActive((i) =>
        e.key === "ArrowRight"
          ? (i + 1) % skillGroups.length
          : (i - 1 + skillGroups.length) % skillGroups.length
      );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 scroll-mt-20 border-t border-border/40"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="02   Skills"
          title="Tools with fingerprints on them"
          description="Not every library I've touched — the ones that still show up in my commits."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mb-8 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillGroups.map((g, i) => {
            const selected = i === active;
            return (
              <button
                key={g.slug}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-lg border border-accent/35 bg-accent/10"
                    transition={springSmooth}
                  />
                )}
                <span className="relative z-10 font-mono text-[11px] opacity-60 mr-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative z-10">{g.name}</span>
              </button>
            );
          })}
          <span className="ml-auto hidden md:inline font-mono text-[11px] text-muted-foreground/70">
            ← → to switch
          </span>
        </motion.div>

        <motion.div
          ref={boardRef}
          onMouseMove={onMove}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/50"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: spotlight }}
            aria-hidden
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={group.slug}
              role="tabpanel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={tweenSmooth}
              className="relative z-10 grid md:grid-cols-[0.9fr_1.1fr] min-h-[20rem]"
            >
              <div className="relative p-7 md:p-10 border-b md:border-b-0 md:border-r border-border/50">
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-mono text-[7rem] md:text-[9rem] leading-none font-bold text-foreground/[0.04] select-none"
                  aria-hidden
                >
                  {String(active + 1).padStart(2, "0")}
                </span>

                <p className="font-mono text-xs text-accent mb-4 tracking-wider">
                  ./{group.slug}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                  {group.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  {group.focus}
                </p>

                <p className="mt-10 font-mono text-[11px] text-muted-foreground/70 truncate">
                  <span className="text-accent">$</span> {group.prompt}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
                    Core
                  </p>
                  <ul className="space-y-3">
                    {cores.map((skill, si) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ...springSmooth, delay: 0.05 + si * 0.07 }}
                        whileHover={{ x: 6 }}
                        className="group/skill list-none"
                      >
                        <span className="inline-flex items-baseline gap-3">
                          <span className="text-2xl sm:text-3xl md:text-[2.15rem] font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover/skill:text-accent">
                            {skill.name}
                          </span>
                          <motion.span
                            className="hidden sm:block h-px w-0 group-hover/skill:w-10 bg-accent/70 transition-[width] duration-300 origin-left"
                            aria-hidden
                          />
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
                    Also in the bag
                  </p>
                  <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
                    {dailies.map((skill, si) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...tweenSmooth, delay: 0.2 + si * 0.05 }}
                        className="list-none inline-flex items-center"
                      >
                        <motion.span
                          whileHover={{ y: -2, color: "hsl(var(--accent))" }}
                          transition={springSnappy}
                          className="font-mono text-sm text-muted-foreground cursor-default px-1"
                        >
                          {skill.name}
                        </motion.span>
                        {si < dailies.length - 1 && (
                          <span className="text-border px-1 select-none" aria-hidden>
                            ·
                          </span>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
