"use client";

import Newsletter from "@/components/layout/Newsletter";
import CTASection from "@/components/ui/CTASection";
import { faqData } from "@/data/faq";
import { PlusIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FAQsPage = () => {
  const categories = Object.keys(faqData);
  const [activeTab, setActiveTab] = useState("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-background lg:h-screen">
        <div className="bg-primary lg:h-[70vh] pb-12 lg:pb-20">
          <AnimatedSection
            variants={fadeInUp}
            className="space-y-6 grid grid-cols-1 lg:grid-cols-2 lg:items-center w-full py-12 px-6 md:px-16"
          >
            {/* Text Content */}
            <div className="space-y-4">
              <div className="text-center space-y-4 sm:space-y-6 lg:text-left">
                <AnimatedText
                  as="h1"
                  className="text-4xl lg:text-[3rem] font-bold tracking-tight text-white leading-tight"
                  delay={0.2}
                >
                  Got Questions?
                  <br />
                  We’ve Got Answers
                </AnimatedText>
              </div>
            </div>

            {/* Description + Buttons */}
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <AnimatedText
                  as="p"
                  className="text-sm text-white max-w-4xl mx-auto leading-relaxed px-4"
                  delay={0.2}
                >
                  From property services to investment plans, find clear answers
                  to the most common questions about Noornest.
                </AnimatedText>
              </div>

              <AnimatedSection
                className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start px-4"
                delay={0.4}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-sm"
                >
                  <Link href="#faq-tab-heading">
                    <span className="hidden sm:inline">
                      Still Have Questions
                    </span>
                    <span className="sm:hidden">have questions</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto text-sm"
                >
                  <Link href="/contact#contact-form">
                    <span className="hidden sm:inline">Contact Us</span>
                    <span className="sm:hidden">Contact us</span>
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Hero Image */}
          <div className="flex justify-center w-full h-[250px] md:max-w-[60vw] lg:h-[400px] mx-auto rounded-[10px] lg:rounded-[20px] px-8">
            <Image
              src="/faqs/faq-hero.png"
              alt="simplified properties in the UK"
              width={500}
              height={300}
              className="object-cover w-full h-full rounded-[20px]"
            />
          </div>
        </div>
      </section>
      {/* Tab Section */}
      <section
        className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-12"
        aria-labelledby="faq-tab-heading"
      >
        <div className="text-center mb-10 mt-8">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            faqs
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Common Questions Answered
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
            Navigate through our comprehensive guide to understanding Noornest.
            Get direct answers about our services and investment strategies.
          </p>
        </div>

        <div className="w-full lg:max-w-5xl mx-auto">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="FAQ Categories"
            className="flex justify-between border-b rounded-t-xl bg-[#bda053] bg-opacity-80"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeTab === cat}
                onClick={() => {
                  setActiveTab(cat);
                  setOpenIndex(0);
                }}
                className={`flex-1 text-center py-3 text-sm md:text-base font-semibold transition-all ${
                  activeTab === cat
                    ? "bg-white text-black shadow-sm"
                    : "text-white hover:bg-[#bda053]/90"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Image */}
            <div className="flex justify-center items-start w-[500px] h-[400px]">
              <Image
                src="/faqs/faq-section.png"
                alt="Modern UK property"
                width={500}
                height={400}
                className="rounded-xl object-cover w-full h-full max-w-md shadow-md"
              />
            </div>

            {/* Accordion */}
            <div className="flex flex-col gap-3">
              {faqData[activeTab as keyof typeof faqData].map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary transition-all"
                >
                  <button
                    className="flex justify-between w-full text-left p-4 font-medium"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-${index}`}
                    onClick={() => handleToggle(index)}
                  >
                    <span>{item.question}</span>
                    {openIndex === index ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <PlusIcon className="w-5 h-5" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div
                      id={`faq-${index}`}
                      className="px-4 pb-4 text-sm text-gray-700 leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <CTASection
        title="Didn’t Find What You Were Looking For?"
        description="Our team is here to help. Reach out directly for tailored advice."
        primaryButton={{
          text: "Contact Us",
          href: "/contact#contact-form",
          //   className: "bg-black hover:bg-black/90 hover:shadow-lg hover:shadow-black/25",
        }}
        secondaryButton={{
          text: "Book a Consultation",
          href: "/booking",
          //   className: "text-primary hover:shadow-lg hover:shadow-black/25",
        }}
        backgroundImage="/hero-img3.webp"
        className="text-white"
        overlayClassName="bg-gradient-to-r from-black/40 to-black/60 backdrop-blur-sm"
      />
      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default FAQsPage;
