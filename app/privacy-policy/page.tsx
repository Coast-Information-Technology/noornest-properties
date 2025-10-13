"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Parallax } from "@/components/parallax/Parallax";

// Data structure for the right-side sections
const principles = [
  {
    title: "Personal details",
    description:
      "We collect names, contact information, and identification documents to verify your identity and provide services.",
    image: "/terms/identity.png", // Replace with your actual image path
    altText: "identity card illustration",
    id: "risk-levels",
  },
  {
    title: "Financial data",
    description:
      "Payment details and investment history help us process transactions and manage your account effectively.",
    image: "/terms/finances.png", // Replace with your actual image path
    altText: "financial data illustration",
    id: "performance-insights",
  },
  {
    title: "Property information",
    description:
      "Details about property transactions and valuations enable us to provide targeted and accurate services.",
    image: "/terms/property.png", // Replace with your actual image path
    altText: "property illustration",
    id: "investment-minimums",
  },
  {
    title: "Technical data",
    description:
      "We track technical information like IP addresses and device data to improve platform performance and security.",
    image: "/terms/data-privacy.png", // Replace with your actual image path
    altText: "data privacy illustration",
    id: "investment-minimums",
  },
];

const leftContent = {
  label: "Data",
  heading: "Information we collect",
  description:
    "We gather essential information to provide secure and personalized services. Your data helps us serve you better.",
};

const PrivacyPolicyPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-background lg:h-screen">
        <div className="bg-primary lg:h-[50vh] pb-12 lg:pb-20">
          <section
            className="relative flex justify-center items-center w-full px-4 sm:px-8 lg:px-16 py-16 lg:py-20"
            aria-labelledby="contact-hero-heading"
          >
            {/* Hero Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex justify-center w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] max-w-7xl mx-auto rounded-[12px] lg:rounded-[20px] overflow-hidden"
            >
              {/* Hero Image */}
              <Image
                src="/privacy-policy/privacy-hero.jpg"
                alt="Simplified properties in the UK"
                fill
                priority
                className="object-cover w-full h-full rounded-[20px]"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/70 rounded-[20px]"
                aria-hidden="true"
              />

              {/* Hero Text */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 sm:px-10 lg:px-20 max-w-3xl mx-auto">
                <h1
                  id="contact-hero-heading"
                  className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-primary"
                >
                  Your Privacy Matters to Us
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-12 max-w-2xl">
                  At Noornest, we are committed to protecting your personal
                  data. This Privacy Policy explains how we collect, use, and
                  safeguard your information.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link href="/privacy-policy">
                    <Button
                      aria-label="Learn more about our privacy policy"
                      className="px-8 py-6"
                    >
                      Learn More
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="ghost"
                      aria-label="Contact us"
                      className="border border-white text-white hover:bg-white hover:text-black hover:shadow-md hover:shadow-white px-8 py-6 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </section>
      {/* Our Terms Section */}
      <section className="bg-background py-12 lg:py-16 text-center px-8 md:px-16 w-full">
        <h3 className="text-lg tracking-wide text-black uppercase font-bold">
          Privacy
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          Privacy Policy
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Noornest is a UK property and investment platform dedicated to
          transparent data management and protection.
        </p>
      </section>
      {/* Our Core Principles */}
      <Parallax principles={principles} leftContent={leftContent} />;
    </main>
  );
};

export default PrivacyPolicyPage;
