// components/ui/AnimatedList.tsx
"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
  type UseInViewOptions,
} from "framer-motion";
import { scrollAnimationOptions } from "@/lib/animations";

interface AnimatedListProps {
  children: React.ReactNode;
  variants?: Variants;
  itemVariants?: Variants;
  className?: string;
  staggerDelay?: number;
  itemDelay?: number;
}

function isUseInViewOptions(obj: unknown): obj is UseInViewOptions {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return "amount" in o || "margin" in o || "once" in o || "root" in o;
}

function toMarginType(m?: string): UseInViewOptions["margin"] | undefined {
  if (!m) return undefined;
  const ok = /^-?\d+(\.\d+)?(px|%)(\s+-?\d+(\.\d+)?(px|%)){0,3}$/.test(
    m.trim()
  );
  if (!ok) return undefined;
  return m as unknown as NonNullable<UseInViewOptions["margin"]>;
}

function toInViewOptions(
  opts: unknown,
  fallback: UseInViewOptions = { amount: 0.25 }
): UseInViewOptions {
  if (isUseInViewOptions(opts)) return opts;

  const io = opts as IntersectionObserverInit | undefined;
  if (!io) return fallback;

  const amount = Array.isArray(io.threshold)
    ? (io.threshold[0] as number | undefined)
    : typeof io.threshold === "number"
    ? io.threshold
    : undefined;

  const mapped: UseInViewOptions = {
    ...fallback,
    ...(amount !== undefined ? { amount } : {}),
  };

  const margin = toMarginType(io.rootMargin);
  if (margin) mapped.margin = margin;

  return mapped;
}

export default function AnimatedList({
  children,
  variants,
  itemVariants,
  className = "",
  staggerDelay = 0.1,
  itemDelay = 0.2,
}: AnimatedListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewOptions = toInViewOptions(scrollAnimationOptions);
  const isInView = useInView(ref, inViewOptions);

  const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: itemDelay,
      },
    },
  };

  const defaultItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const items = React.Children.toArray(children);

  return (
    <motion.div
      ref={ref}
      variants={variants || defaultContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {items.map((child, i) => (
        <motion.div
          key={React.isValidElement(child) && child.key != null ? child.key : i}
          variants={itemVariants || defaultItemVariants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
