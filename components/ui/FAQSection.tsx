"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  faqs,
}: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-3xl sm:text-4xl font-bold text-center text-primary mb-12"
      >
        {title}
      </h2>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl transition-colors duration-200 focus-within:ring-2 focus-within:ring-[#b9974a]"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full px-5 py-4 text-left focus:outline-none"
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-gray-900 text-base sm:text-lg font-medium">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
              ) : (
                <Plus className="w-5 h-5 text-gray-700" aria-hidden="true" />
              )}
            </button>

            {/* Animated answer section */}
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  key={`faq-${index}-content`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm sm:text-base text-gray-700">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
