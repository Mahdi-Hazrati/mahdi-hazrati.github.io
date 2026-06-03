"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { SectionHeader } from "./section-header";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 scroll-mt-20 border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="03 — Projects"
          title="Selected work"
          description="A few things I've built or maintain — swap in your latest repos anytime."
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} large />
          ))}
        </div>

        {other.length > 0 && (
          <div className="grid gap-6">
            {other.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group relative rounded-xl border border-border/80 bg-card/40 p-6 hover:border-accent/40 transition-colors ${
        large ? "md:min-h-[220px] flex flex-col" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-xs font-mono text-accent mb-2">
              <Star className="w-3 h-3 fill-accent" aria-hidden />
              Featured
            </span>
          )}
          <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            {project.year}
          </p>
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border/60 hover:border-accent/50 hover:text-accent transition-colors"
              aria-label={`${project.title} on GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-border/60 hover:border-accent/50 hover:text-accent transition-colors"
            aria-label={`Visit ${project.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <p className={`text-muted-foreground leading-relaxed ${large ? "flex-1" : ""}`}>
        {project.description}
      </p>

      <ul className="flex flex-wrap gap-2 mt-6">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="px-2.5 py-1 rounded-md bg-muted/50 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
