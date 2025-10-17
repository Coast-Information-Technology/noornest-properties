"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image, { ImageProps } from "next/image";
import { Variants } from "framer-motion";
import { scrollAnimationOptions } from "@/lib/animations";

interface AnimatedImageProps extends Omit<ImageProps, "onLoad"> {
  variants?: Variants;
  className?: string;
  delay?: number;
  duration?: number;
  onLoad?: () => void;
}

export default function AnimatedImage({
  variants,
  className = "",
  delay = 0,
  duration = 0.8,
  onLoad,
  ...imageProps
}: AnimatedImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, scrollAnimationOptions);

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
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
      <Image
        {...imageProps}
        onLoad={onLoad}
        alt=""
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
