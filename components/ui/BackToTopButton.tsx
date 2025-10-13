"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BackToTopButtonProps {
  threshold?: number; // Scroll threshold to show button (default: 300px)
  className?: string;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "custom";
  customColor?: string;
}

export default function BackToTopButton({
  threshold = 300,
  className = "",
  position = "bottom-right",
  size = "md",
  color = "primary",
  customColor,
}: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Listen to scroll events
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [threshold]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
  };

  // Size classes
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  // Icon size classes
  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Color classes
  const getColorClasses = () => {
    if (customColor) {
      return customColor;
    }

    switch (color) {
      case "primary":
        return "bg-primary hover:bg-primary/90 text-primary-foreground";
      case "secondary":
        return "bg-secondary hover:bg-secondary/90 text-secondary-foreground";
      case "accent":
        return "bg-accent hover:bg-accent/90 text-accent-foreground";
      default:
        return "bg-primary hover:bg-primary/90 text-primary-foreground";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={`
            fixed z-[9995] rounded-full p-6 shadow-lg transition-all duration-300
            ${positionClasses[position]}
            ${sizeClasses[size]}
            ${getColorClasses()}
            ${className}
          `}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className={iconSizeClasses[size]} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
