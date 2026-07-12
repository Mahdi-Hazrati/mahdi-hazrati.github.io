"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";
import {
  cardHover,
  fadeUpItem,
  springSnappy,
  staggerContainer,
  viewport,
} from "@/lib/motion";
import { projects } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 scroll-mt-20 border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="03   Projects"
          title="Selected work"
          description="A few things I've built or maintain   swap in your latest repos anytime."
        />

        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} large />
          ))}
        </motion.div>

        {other.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer}
          >
            {other.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  return (
    <motion.article
      variants={fadeUpItem}
      initial="rest"
      whileHover="hover"
      className={`group relative rounded-xl border border-border/80 bg-card/40 p-6 overflow-hidden ${
        large ? "md:min-h-[220px] flex flex-col" : ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
      <motion.div
        variants={cardHover}
        className={`relative z-10 ${large ? "flex flex-col flex-1" : ""}`}
      >

        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {project.featured && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                className="inline-flex items-center gap-1 text-xs font-mono text-accent mb-2"
              >
                <Star className="w-3 h-3 fill-accent animate-pulse-soft" aria-hidden />
                Featured
              </motion.span>
            )}
            <h3 className="text-xl font-semibold group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {project.year}
            </p>
          </div>
          <div className="flex gap-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -6 }}
                whileTap={{ scale: 0.95 }}
                transition={springSnappy}
                className="p-2 rounded-lg border border-border/60 hover:border-accent/50 hover:text-accent"
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            <motion.a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              transition={springSnappy}
              className="p-2 rounded-lg border border-border/60 hover:border-accent/50 hover:text-accent"
              aria-label={`Visit ${project.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        <p className={`text-muted-foreground leading-relaxed ${large ? "flex-1" : ""}`}>
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag, ti) => (
            <motion.li
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ delay: ti * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-2.5 py-1 rounded-md bg-muted/50 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              {tag}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  );
}
