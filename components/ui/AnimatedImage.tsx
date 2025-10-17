// components/ui/AnimatedImage.tsx
"use client";

import {
  motion,
  useInView,
  type UseInViewOptions,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { scrollAnimationOptions } from "@/lib/animations";

interface AnimatedImageProps extends Omit<ImageProps, "onLoad" | "className"> {
  variants?: Variants;
  /** Class for the motion wrapper */
  wrapperClassName?: string;
  /** Class for the <Image> element */
  imgClassName?: string;
  delay?: number;
  duration?: number;
  onLoad?: ImageProps["onLoad"];
}

// --- optional helpers if your scrollAnimationOptions is IntersectionObserverInit ---
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
// -------------------------------------------------------------------------------

export default function AnimatedImage({
  variants,
  wrapperClassName = "",
  imgClassName = "",
  delay = 0,
  duration = 0.8,
  onLoad,
  ...imageProps
}: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewOptions = toInViewOptions(scrollAnimationOptions);
  const isInView = useInView(ref, inViewOptions);

  const defaultVariants: Variants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants || defaultVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={wrapperClassName}
    >
      <Image
        {...imageProps}
        onLoad={onLoad}
        alt={imageProps.alt ?? ""}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </motion.div>
  );
}
