/**
 * Scroll Animation Utilities for Noornest Properties
 * Using Framer Motion for smooth, performant animations
 */

import type { Variants, Variant, Target, Transition } from "framer-motion";

const DEFAULT_EASE: Transition["ease"] = [0.25, 0.46, 0.45, 0.94];

/* --------------------------- Common animation variants --------------------------- */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: DEFAULT_EASE },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: DEFAULT_EASE },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: DEFAULT_EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: DEFAULT_EASE },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: DEFAULT_EASE },
  },
};

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: DEFAULT_EASE },
  },
};

/* ------------------------------- Staggered lists -------------------------------- */

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: DEFAULT_EASE },
  },
};

/* -------------------------- Property card hover effect -------------------------- */

export const propertyCardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: DEFAULT_EASE },
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: DEFAULT_EASE },
  },
};

/* -------------------------------- Button effects -------------------------------- */

export const buttonHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
    transition: { duration: 0.2, ease: DEFAULT_EASE },
  },
  tap: { scale: 0.95 },
};

/* ------------------------------- Text / image reveal ------------------------------ */

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: DEFAULT_EASE },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: DEFAULT_EASE },
  },
};

/* --------------------------------- Counters / FX --------------------------------- */

export const counterAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: DEFAULT_EASE } },
};

export const parallaxVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: DEFAULT_EASE },
  },
};

/* -------------------------- Safe helpers for composing --------------------------- */

const toTarget = (v: Variant | undefined): Target =>
  typeof v === "function" ? {} : v ?? {};

const extendVariant = (
  base: Variants,
  overrides: Target = {},
  transition: Partial<Transition> = {}
): Variants => ({
  hidden: base.hidden,
  visible: {
    ...toTarget(base.visible),
    ...overrides,
    transition: {
      duration: 0.6,
      ease: DEFAULT_EASE,
      ...transition,
    },
  },
});

/* -------------------------- Animation presets per section ------------------------- */

export const animationPresets = {
  hero: {
    title: fadeInUp,
    subtitle: extendVariant(fadeInUp, {}, { delay: 0.2 }),
    button: extendVariant(fadeInUp, {}, { delay: 0.4 }),
  },
  features: {
    container: staggerContainer,
    item: staggerItem,
  },
  properties: {
    container: staggerContainer,
    card: propertyCardHover,
  },
  testimonials: {
    container: staggerContainer,
    item: fadeInUp,
  },
  stats: {
    container: staggerContainer,
    item: scaleIn,
  },
} as const;

/* ------------------------------ Custom animation API ----------------------------- */

export const createAnimation = (
  from: Target,
  to: Target,
  transition: Transition = {}
): Variants => ({
  hidden: from,
  visible: {
    ...to,
    transition: { duration: 0.6, ease: DEFAULT_EASE, ...transition },
  },
});

/* ---------------------- IntersectionObserver default options --------------------- */

export const scrollAnimationOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
