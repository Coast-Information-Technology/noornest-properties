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
  const ref = useRef<HTMLDivElement>(null);
  // ✅ use amount (replaces threshold)
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const controls = useAnimation();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 },
    });

    let rafId = 0;
    const startTime = performance.now();
    const startValue = 0;
    const endValue = value;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(startValue + (endValue - startValue) * easeOutQuart);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, duration, controls]);

  return (
    <motion.div ref={ref} animate={controls} className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </motion.div>
  );
}
