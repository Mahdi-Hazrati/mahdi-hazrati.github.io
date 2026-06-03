"use client";

import { motion } from "framer-motion";
import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { Experience } from "@/components/portfolio/experience";
import { Footer } from "@/components/portfolio/footer";
import { GridBackground } from "@/components/portfolio/grid-background";
import { Hero } from "@/components/portfolio/hero";
import { KonamiEgg } from "@/components/portfolio/konami-egg";
import { Nav } from "@/components/portfolio/nav";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";

export default function Home() {
  return (
    <>
      <GridBackground />
      <KonamiEgg />
      <Nav />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </motion.main>
      <Footer />
    </>
  );
}
