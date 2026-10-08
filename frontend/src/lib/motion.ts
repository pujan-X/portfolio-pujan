import { Variants } from "framer-motion";

/* ===== SHARED FRAMER MOTION VARIANTS ===== */

/** Masked slide-up reveal for headings */
export const lineReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.12,
    },
  }),
};

/** Fade up for body text */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

/** Card stagger */
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.06,
    },
  }),
};

/** Clip-path wipe up */
export const clipWipe: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
};

/** Scale in */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
};

/** Spring config for magnetic / cursor effects */
export const springConfig = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
  mass: 0.5,
};

/** Viewport settings for whileInView */
export const viewport = { once: true, margin: "-10%" };
