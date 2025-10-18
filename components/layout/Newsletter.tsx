"use client";

import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { motion } from "framer-motion";

export default function Newsletter() {
  const handleNewsletterSubmit = async (email: string) => {
    // Here you can integrate with your newsletter service
    // For now, we'll simulate the API call
    console.log("Subscribing email:", email);

    // Example: Send to your newsletter service
    // await newsletterService.subscribe(email);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="relative z-10 px-6 md:px-16">
        <AnimatedSection className="flex flex-col min-[1150px]:flex-row justify-between items-center py-16 px-4 lg:px-8 text-center text-white">
          <motion.div
            className="lg:max-w-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatedText
              as="h2"
              className="text-3xl lg:text-4xl font-bold mb-4 text-center min-[1150px]:text-left bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Stay Ahead of the Market
            </AnimatedText>
            <AnimatedText
              as="p"
              className="text-lg mb-8 opacity-90 max-w-lg mx-auto text-center min-[1150px]:text-left leading-relaxed"
              delay={0.2}
            >
              Get exclusive access to the latest property deals, investment
              opportunities, and expert insights delivered directly to your
              inbox.
            </AnimatedText>
          </motion.div>

          <motion.div
            className="w-full lg:w-auto"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <NewsletterForm
              placeholder="Enter your email address"
              buttonText="Subscribe Now"
              buttonClassName="text-center"
              onSubmit={handleNewsletterSubmit}
            />
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
