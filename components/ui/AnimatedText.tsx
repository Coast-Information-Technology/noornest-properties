// components/ui/AnimatedText.tsx
"use client";

import React, { useRef, type ElementType } from "react";
import {
  motion,
  useInView,
  type Variants,
  type UseInViewOptions,
} from "framer-motion";
import { scrollAnimationOptions } from "@/lib/animations";

interface AnimatedTextProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  duration?: number;
  as?: ElementType; // ✅ works for 'div' and custom components
  once?: boolean;
}

/** Detect if an object already matches Framer Motion's UseInViewOptions */
function isUseInViewOptions(obj: unknown): obj is UseInViewOptions {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return "amount" in o || "margin" in o || "once" in o || "root" in o;
}

/** Narrow a rootMargin string to Framer Motion's branded MarginType */
function toMarginType(m?: string): UseInViewOptions["margin"] | undefined {
  if (!m) return undefined;
  const ok = /^-?\d+(\.\d+)?(px|%)(\s+-?\d+(\.\d+)?(px|%)){0,3}$/.test(
    m.trim()
  );
  if (!ok) return undefined;
  return m as unknown as NonNullable<UseInViewOptions["margin"]>;
}

/** Map IntersectionObserverInit → UseInViewOptions (best-effort) */
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

  // Note: UseInViewOptions.root expects a RefObject<Element>; IO gives Element/Document.
  // If you need a custom root, create a ref elsewhere and pass it via your own options.
  return mapped;
}

export default function AnimatedText({
  children,
  variants,
  className = "",
  delay = 0,
  duration = 0.6,
  as: Component = "div",
  once,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  const base = toInViewOptions(scrollAnimationOptions);
  const options: UseInViewOptions =
    typeof once === "boolean" ? { ...base, once } : base;

  const isInView = useInView(ref, options);

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants || defaultVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      <Component>{children}</Component>
    </motion.div>
  );
}
