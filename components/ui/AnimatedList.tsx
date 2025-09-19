"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Variants } from "framer-motion";
import { scrollAnimationOptions } from "@/lib/animations";

interface AnimatedListProps {
  children: React.ReactNode;
  variants?: Variants;
  itemVariants?: Variants;
  className?: string;
  staggerDelay?: number;
  itemDelay?: number;
}

export default function AnimatedList({
  children,
  variants,
  itemVariants,
  className = "",
  staggerDelay = 0.1,
  itemDelay = 0.2,
}: AnimatedListProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, scrollAnimationOptions);

  const defaultContainerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: itemDelay,
      },
    },
  };

  const defaultItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants || defaultContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={itemVariants || defaultItemVariants}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants || defaultItemVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
