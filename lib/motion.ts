import type { Variants } from "framer-motion";

export const easeSmooth = [0.22, 1, 0.36, 1] as const;

export const springSmooth = {
  type: "spring" as const,
  stiffness: 100,
  damping: 22,
  mass: 0.9,
};

export const springSnappy = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};

export const tweenSmooth = {
  duration: 0.65,
  ease: easeSmooth,
};

export const viewport = {
  once: true,
  margin: "-72px" as const,
  amount: 0.15 as const,
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: tweenSmooth,
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenSmooth,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeSmooth },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: tweenSmooth,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: tweenSmooth,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSmooth,
  },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.02,
    transition: springSnappy,
  },
};
