// components/ui/AnimatedCounter.tsx

"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.5 });
  const controls = useAnimation();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 },
      });

      // Animate the counter
      const startTime = Date.now();
      const startValue = 0;
      const endValue = value;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue =
          startValue + (endValue - startValue) * easeOutQuart;

        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration, controls]);

  return (
    <motion.div ref={ref} animate={controls} className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </motion.div>
  );
}
