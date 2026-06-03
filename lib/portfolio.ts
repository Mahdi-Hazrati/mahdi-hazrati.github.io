export const site = {
  name: "Mahdi Hazrati",
  domain: "mahdi.is-a.dev",
  title: "Software Engineer",
  headline: "Software Engineer · Excited by creating",
  tagline:
    "I build complete digital products—from architecture and UI to shipping—with React, Next.js, and open source.",
  email: "mahdi@nextproduction.dev",
  cvUrl:
    "https://mahdihazrati.ir/assets/files/Mahdi%20Hazrati%20Portfolio%20-%20v3.0.3%20-%202024%2010%2024-encrypted.pdf",
  location: "Tehran, Iran",
  availability: "Open to collaborations",
  github: "https://github.com/mahdi-hazrati",
  linkedin: "https://www.linkedin.com/in/mahdihazratidev",
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
    href: site.github,
    handle: "@mahdi-hazrati",
  },
  {
    name: "LinkedIn",
    href: site.linkedin,
    handle: "mahdihazratidev",
  },
  {
    name: "Next Production",
    href: "https://nextproduction.dev",
    handle: "nextproduction.dev",
  },
  {
    name: "Website",
    href: "https://mahdihazrati.ir",
    handle: "mahdihazrati.ir",
  },
] as const;

export const roles = [
  "Software Engineer",
  "Frontend Developer @ Sadad",
  "Founder @ Next Production",
  "Building Analytick",
] as const;

export const about = {
  intro:
    "I'm a software engineer based in Tehran with 6+ years in the field—shipping web apps with React and Next.js, founding Next Production, and building privacy-focused tools like Analytick. I turn UI/UX designs into fast, accessible products and contribute actively to open source (150+ public repos on GitHub).",
  highlights: [
    {
      label: "Current role",
      value: "Frontend Developer at Sadad Informatic Corporation",
    },
    {
      label: "Founded",
      value: "Next Production (product studio) · Analytick (privacy-aware analytics)",
    },
    {
      label: "Languages",
      value: "Persian & Azerbaijani (native) · English & Turkish (professional)",
    },
  ],
} as const;

export const skillGroups = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "UI / UX implementation", level: 90 },
    ],
  },
  {
    name: "Product & Studio",
    skills: [
      { name: "Design systems (NPUI)", level: 85 },
      { name: "Web analytics & MVP builds", level: 82 },
      { name: "Open source", level: 90 },
      { name: "Component-driven architecture", level: 88 },
    ],
  },
  {
    name: "Tools & Beyond",
    skills: [
      { name: "Git & GitHub Actions", level: 90 },
      { name: "Node.js / APIs", level: 78 },
      { name: "Linux / Ubuntu", level: 82 },
      { name: "Python", level: 72 },
    ],
  },
] as const;

export const projects = [
  {
    title: "NPUI",
    description:
      "Open-source React component library and design system from Next Production—developer-friendly primitives for shipping UI faster.",
    tags: ["React", "TypeScript", "Design System"],
    href: "https://github.com/NextProduction/npui",
    github: "https://github.com/NextProduction/npui",
    featured: true,
    year: "2025",
  },
  {
    title: "Analytick",
    description:
      "Privacy-focused web analytics platform (MVP)—real-time dashboards, lightweight integration, and GDPR-aligned design for teams in Iran and beyond.",
    tags: ["Analytics", "Privacy", "SaaS"],
    href: "https://analytick.ir",
    github: null,
    featured: true,
    year: "2025",
  },
  {
    title: "Breakthrough",
    description:
      "Neuroscience-based habit tracker by Next Production—TypeScript app focused on sustainable behavior change.",
    tags: ["TypeScript", "Product", "Health"],
    href: "https://github.com/NextProduction/Breakthrough",
    github: "https://github.com/NextProduction/Breakthrough",
    featured: false,
    year: "2025",
  },
  {
    title: "Samarayaneh products",
    description:
      "Mid-level frontend work at Samarayaneh—launched abrsama.ir and samateb.ir with React/Next.js, responsive components, and close design collaboration.",
    tags: ["Next.js", "React", "Production"],
    href: "https://samateb.ir",
    github: null,
    featured: false,
    year: "2023–2025",
  },
  {
    title: "mahdi.is-a.dev",
    description:
      "This portfolio—terminal aesthetic, motion, and a Konami easter egg—hosted on the is-a.dev program.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    href: "https://mahdi.is-a.dev",
    github: "https://github.com/mahdi-hazrati/mahdi.is-a.dev",
    featured: true,
    year: "2024",
  },
  {
    title: "Emoji Select Panel",
    description:
      "Telegram-style emoji picker with full feature parity—TypeScript component for rich chat UIs.",
    tags: ["TypeScript", "UI Component"],
    href: "https://github.com/mahdi-hazrati/Emoji-Select-Panel",
    github: "https://github.com/mahdi-hazrati/Emoji-Select-Panel",
    featured: false,
    year: "2025",
  },
] as const;

export const experience = [
  {
    period: "Nov 2025 — Present",
    role: "Frontend Developer",
    company: "Sadad Informatic Corporation",
    description:
      "Building and maintaining front-end experiences for Sadad's software products in Tehran.",
  },
  {
    period: "Jan 2025 — Present",
    role: "Founder",
    company: "Analytick",
    description:
      "Bootstrapping a privacy-aware analytics platform—MVP with real-time dashboards, developer-friendly setup, and GDPR-aligned practices.",
  },
  {
    period: "Feb 2024 — Present",
    role: "Founder",
    company: "Next Production",
    description:
      "Product studio shipping open-source tools and apps: NPUI design system, Breakthrough, GigaCaptcha, and nextproduction.dev.",
  },
  {
    period: "Nov 2023 — Nov 2025",
    role: "Frontend Developer",
    company: "Samarayaneh",
    description:
      "React/Next.js development—launched abrsama.ir and samateb.ir, translated UI/UX into accessible components, and partnered with backend and design teams.",
  },
  {
    period: "Jan 2020 — Oct 2023",
    role: "Freelance Software Developer",
    company: "Independent",
    description:
      "Three+ years delivering client web apps and custom solutions—foundation in React, Next.js, and end-to-end project ownership.",
  },
] as const;

export const nowBuilding = [
  "Analytick MVP — privacy-first analytics for production sites",
  "NPUI — expanding the Next Production component library",
  "Open source at github.com/mahdi-hazrati (150+ public repos)",
] as const;

export const stats = [
  { value: "6+", label: "Years in software" },
  { value: "150+", label: "Public GitHub repos" },
  { value: "4+", label: "Studio products" },
] as const;
