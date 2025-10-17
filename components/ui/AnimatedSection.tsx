"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Variants } from "framer-motion";
import { scrollAnimationOptions } from "@/lib/animations";

interface AnimatedSectionProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  variants,
  className = "",
  delay = 0,
  duration = 0.6,
}: // once = true,
AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, scrollAnimationOptions);

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
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
      {children}
    </motion.div>
  );
}
