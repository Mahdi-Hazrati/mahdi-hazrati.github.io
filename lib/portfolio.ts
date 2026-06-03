export const site = {
  name: "Mahdi Hazrati",
  domain: "mahdi.is-a.dev",
  title: "Frontend Developer",
  tagline: "I craft fast, accessible interfaces and ship them with care.",
  email: "hello@mahdihazrati.ir",
  cvUrl:
    "https://mahdihazrati.ir/assets/files/Mahdi%20Hazrati%20Portfolio%20-%20v3.0.3%20-%202024%2010%2024-encrypted.pdf",
  location: "Iran",
  availability: "Open to collaborations",
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Mahdi-Hazrati",
    handle: "@Mahdi-Hazrati",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mahdihazratidev",
    handle: "mahdihazratidev",
  },
  {
    name: "Website",
    href: "https://mahdihazrati.ir",
    handle: "mahdihazrati.ir",
  },
] as const;

export const roles = [
  "Frontend Developer",
  "React & Next.js Builder",
  "Open Source Contributor",
  "UI Craftsperson",
] as const;

export const about = {
  intro:
    "I'm a frontend developer with three years of experience turning ideas into polished web experiences. I work mainly with React and Next.js, care about performance and accessibility, and enjoy the loop of breaking things in dev so users never have to in prod.",
  highlights: [
    {
      label: "Focus",
      value: "React, Next.js, TypeScript, design systems",
    },
    {
      label: "Also into",
      value: "Python automation, Linux tooling, open source",
    },
    {
      label: "Outside code",
      value: "Chai, side projects, learning in public",
    },
  ],
} as const;

export const skillGroups = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    name: "Tools & Workflow",
    skills: [
      { name: "Git", level: 88 },
      { name: "Linux / Ubuntu", level: 82 },
      { name: "Framer Motion", level: 80 },
      { name: "CI / GitHub Actions", level: 75 },
    ],
  },
  {
    name: "Beyond the browser",
    skills: [
      { name: "Python", level: 72 },
      { name: "REST APIs", level: 78 },
      { name: "Open Source", level: 85 },
    ],
  },
] as const;

export const projects = [
  {
    title: "mahdi.is-a.dev",
    description:
      "Personal dev portfolio on is-a.dev — terminal aesthetic, motion, and a hidden Konami easter egg.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    href: "https://mahdi.is-a.dev",
    github: "https://github.com/Mahdi-Hazrati/mahdi.is-a.dev",
    featured: true,
    year: "2024",
  },
  {
    title: "mahdihazrati.ir",
    description:
      "Main portfolio hub with project showcase, CV download, and extended work history.",
    tags: ["React", "Portfolio", "Design"],
    href: "https://mahdihazrati.ir",
    github: null,
    featured: true,
    year: "2024",
  },
  {
    title: "Open Source Experiments",
    description:
      "Scripts, UI prototypes, and small tools — shared on GitHub for anyone to fork or learn from.",
    tags: ["TypeScript", "Python", "Automation"],
    href: "https://github.com/Mahdi-Hazrati",
    github: "https://github.com/Mahdi-Hazrati",
    featured: false,
    year: "Ongoing",
  },
] as const;

export const experience = [
  {
    period: "2022 — Present",
    role: "Frontend Developer",
    company: "Independent & contract work",
    description:
      "Building responsive apps with React/Next.js, integrating APIs, and iterating with designers on pixel-perfect UIs.",
  },
  {
    period: "2021 — 2022",
    role: "Software Engineering",
    company: "Learning & open source",
    description:
      "Deep dive into modern JavaScript, component architecture, and contributing to community projects.",
  },
] as const;

export const nowBuilding = [
  "Sharpening Next.js App Router patterns",
  "Exploring accessible animation systems",
  "Publishing more open source snippets",
] as const;

export const stats = [
  { value: "3+", label: "Years coding" },
  { value: "10+", label: "Projects shipped" },
  { value: "∞", label: "Cups of chai" },
] as const;
