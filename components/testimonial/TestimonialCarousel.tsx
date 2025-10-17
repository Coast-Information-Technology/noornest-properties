// components/testimonial/TestimonialCarousel.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ImQuotesLeft } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

// Types
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  autoSlideInterval?: number; // in milliseconds
  showNavigation?: boolean;
  showDots?: boolean;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  primaryColor?: string;
  accentColor?: string;
  className?: string;
}

export default function TestimonialCarousel({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "TESTIMONIALS",
  autoSlideInterval = 6000,
  showNavigation = true,
  showDots = true,
  backgroundColor = "bg-white",
  cardBackgroundColor = "#EADBC8",
  primaryColor = "#EADBC8",
  accentColor = "#b3925d",
  className = "",
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlideInterval > 0) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, autoSlideInterval);
      return () => clearInterval(timer);
    }
  }, [autoSlideInterval, testimonials.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const testimonial = testimonials[current];

  return (
    <section
      className={`w-full ${backgroundColor} py-20 ${className}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.h3
          className="text-md tracking-wide text-black uppercase font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.h3>
        <motion.h2
          id="testimonials-heading"
          className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        {/* Testimonial Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              {/* Left side (quote) */}
              <motion.blockquote
                key={`quote-${current}`}
                className="rounded-lg px-12 py-6 shadow-sm flex flex-col justify-between relative min-h-[300px] mr-8"
                style={{ backgroundColor: cardBackgroundColor }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.p
                  className="text-gray-800 text-md italic leading-relaxed mb-8 md:max-w-[18rem] lg:max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {testimonial.quote}
                </motion.p>

                <motion.footer
                  className="mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-semibold text-gray-900 text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-700 italic text-md">
                    {testimonial.role}
                  </p>
                </motion.footer>

                {/* Large decorative quote mark */}
                <motion.span
                  aria-hidden="true"
                  className="absolute translate-y-1/2 translate-x-1/2 text-8xl font-bold text-[#ababab]/20 select-none"
                  style={{ fontFamily: "serif" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <ImQuotesLeft size={120} />
                </motion.span>
              </motion.blockquote>
            </AnimatePresence>

            {/* Right side (image + button) - positioned absolutely */}
            <div className="absolute top-1/2 right-20 w-[300px] h-[400px] -translate-y-1/2">
              {/* Background decorative element */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-lg -z-10"
                style={{ backgroundColor: cardBackgroundColor }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              ></motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`image-${current}`}
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative z-10 h-full border-2 border-primary rounded-[10px]"
                >
                  <Image
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.author}`}
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full h-full"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {showNavigation && (
                <motion.button
                  onClick={nextSlide}
                  className="absolute -right-6 bottom-6 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors shadow-lg z-20 bg-primary cursor-pointer"
                  style={
                    {
                      backgroundColor: primaryColor,
                      "--hover-color": accentColor,
                    } as React.CSSProperties
                  }
                  aria-label="Next testimonial"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 10px 25px ${primaryColor}30`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Tablet & Mobile Layout */}
          <div className="md:hidden space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-testimonial-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="rounded-lg p-6 shadow-sm relative"
                style={{ backgroundColor: cardBackgroundColor }}
              >
                {/* Client Image - Small */}
                <div className="w-32 h-48 rounded-lg overflow-hidden flex-shrink-0 mb-3">
                  <Image
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.author}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Quote */}
                <motion.p
                  className="text-gray-800 text-base italic leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {testimonial.quote}
                </motion.p>

                {/* Author Info */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-700 italic text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>

                {/* Decorative quote mark */}
                <motion.span
                  aria-hidden="true"
                  className="absolute top-4 right-4 text-4xl font-bold text-[#ababab]/20 select-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <ImQuotesLeft size={32} />
                </motion.span>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            {showNavigation && (
              <div className="flex justify-center items-center gap-4">
                {/* Previous Button */}
                <motion.button
                  onClick={prevSlide}
                  className="bg-white border-2 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 hover:text-white transition-colors cursor-pointer"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                  }}
                  aria-label="Previous testimonial"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Prev
                </motion.button>

                {/* Dots Indicator */}
                {showDots && (
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === current ? "bg-gray-300" : "bg-gray-300"
                        }`}
                        style={{
                          backgroundColor:
                            index === current ? primaryColor : "#d1d5db",
                        }}
                        aria-label={`Go to testimonial ${index + 1}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                )}

                {/* Next Button */}
                <motion.button
                  onClick={nextSlide}
                  className="text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                  aria-label="Next testimonial"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
