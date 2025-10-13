"use client";

import Image from "next/image";
import React, { useState } from "react";
import HowItWorksSection from "@/components/ui/HowItWorksSection";
import CTASection from "@/components/ui/CTASection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Mail,
  Phone,
  Calendar,
  List,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";
import { FaUserTie } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { BsFillTelephoneFill, BsFillCalendarDateFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import { bookingTestimonials } from "@/data/testimonials";
import Newsletter from "@/components/layout/Newsletter";
import { FaUser } from "react-icons/fa6";

const steps = [
  {
    icon: "Calendar",
    title: "Choose a Date & Time",
    description: "Pick what works for you",
  },
  {
    icon: "Target",
    title: "Tell Us Your Goals",
    description: "Property, investment, or services",
  },
  {
    icon: "User",
    title: "Meet an Advisor",
    description: "Online or in-person, you decide",
  },
];

const faqs = [
  {
    question: "Is the consultation free?",
    answer:
      "Yes, your first consultation is completely free with no obligations.",
  },
  {
    question: "How long is a session?",
    answer: "Each consultation lasts around 30 minutes.",
  },
  {
    question: "Can I reschedule or cancel?",
    answer:
      "Yes, simply reply to your confirmation email to reschedule or cancel at no cost.",
  },
  {
    question: "Who will I speak to?",
    answer:
      "You’ll be matched with a Noornest advisor who specializes in property or investments based on your booking type.",
  },
  {
    question: "Do you offer online consultations?",
    answer: "Yes, you can choose online (video call) or in-person (UK office).",
  },
];

const BookingPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <main>
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
                  className="text-3xl lg:text-[2.5rem] font-bold tracking-tight text-white leading-tight"
                  delay={0.2}
                >
                  Book Your Free Consultation <br />
                  with Noornest Advisors
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
                  Get 30 minutes of expert guidance on property or investment
                  opportunities in the UK. No obligations, no hidden fees — just
                  clarity for your next move.
                </AnimatedText>
              </div>

              <AnimatedSection
                className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start px-4"
                delay={0.4}
              >
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto text-sm bg-black text-white hover:bg-gray-800"
                >
                  <Link href="/booking#booking-form">
                    <span className="hidden sm:inline">Send Message</span>
                    <span className="sm:hidden">send message</span>
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Hero Image */}
          <div className="flex justify-center w-full h-[250px] md:max-w-[60vw] lg:h-[400px] mx-auto rounded-[10px] lg:rounded-[20px] px-8">
            <Image
              src="/booking/booking-hero.png"
              alt="simplified properties in the UK"
              width={500}
              height={300}
              className="object-cover w-full h-full rounded-[20px]"
            />
          </div>
        </div>
      </section>

      <HowItWorksSection
        title="How It Works"
        steps={steps}
        footerText="First consultation is completely free."
        backgroundColor="bg-white"
        titleColor="text-[#C8A970]"
        iconBackgroundColor="bg-[#C8A970]"
        connectorColor="border-[#C8A970]"
      />

      {/* Booking Form Section */}
      <section className="min-h-screen flex items-center justify-center bg-white py-16 px-4">
        <div className="w-full max-w-6xl rounded-[1rem] p-6 sm:p-10 relative overflow-hidden">
          <h2
            id="booking-form"
            className="text-center text-[#bda053] text-2xl sm:text-3xl font-semibold mb-8"
          >
            Consultation Booking Form
          </h2>
          {/* Decorative Circles */}
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#bda053] rounded-full opacity-30"></div>
          <div className="absolute -bottom-10 left-20 w-32 h-32 bg-[#dba69d] rounded-full opacity-20"></div>

          {/* Title */}

          {/* Form */}
          <form className="relative space-y-6 z-10 shadow-lg p-8 rounded-[10px]">
            {/* Full Name */}
            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-accent">
              <FaUserTie className="w-7 h-7 text-accent" aria-hidden="true" />
              <input
                type="text"
                placeholder="Full Name"
                aria-label="Full Name"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-accent">
                <TbMailFilled
                  className="w-7 h-7 text-accent"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-accent">
                <BsFillTelephoneFill
                  className="w-7 h-7 text-accent"
                  aria-hidden="true"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-accent">
                <BsFillCalendarDateFill
                  className="w-7 h-7 text-accent"
                  aria-hidden="true"
                />
                <input
                  type="date"
                  aria-label="Preferred Date"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-accent">
                <FaList className="w-7 h-7 text-accent" aria-hidden="true" />
                <input
                  type="time"
                  aria-label="Preferred Time"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Consultation Type */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-800">Consultation Type</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "Property Enquiry",
                  "Investment Plans",
                  "Services",
                  "General Advisory",
                ].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name="consultationType"
                      aria-label={type}
                      className="accent-[#bda053]"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-accent">
              <AiFillMessage
                className="w-7 h-7 text-accent mt-1"
                aria-hidden="true"
              />
              <textarea
                placeholder="Notes"
                aria-label="Notes"
                rows={4}
                className="w-full bg-transparent outline-none resize-none text-gray-700 placeholder-gray-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                className="bg-[#bda053] text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-[#a88c43] transition-all focus:ring-2 focus:ring-[#bda053] focus:outline-none cursor-pointer"
              >
                Confirm My Consultation
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialCarousel
        testimonials={bookingTestimonials}
        title="What Our Clients Say"
        subtitle="TESTIMONIALS"
        backgroundColor="bg-purple-50"
        cardBackgroundColor="#EADBC8"
        primaryColor="#BFA14A"
        accentColor="#EADBC8"
      />

      {/* FAQ Section */}
      <section
        className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold text-primary mb-8"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 font-medium focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="font-bold">{faq.question}</span>
                {openIndex === index ? (
                  <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" aria-hidden="true" />
                )}
              </button>
              {openIndex === index && (
                <div
                  id={`faq-${index}`}
                  role="region"
                  aria-label={faq.question}
                  className="px-6 pb-4 text-gray-600 text-sm sm:text-base"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Take the First Step With Noornest Today"
        primaryButton={{
          text: "Book Now",
          href: "/booking#booking-form",
          className:
            "bg-black hover:bg-black/90 hover:shadow-lg hover:shadow-black/25",
        }}
        secondaryButton={{
          text: "Explore Investment Plan",
          href: "/investment",
          className: "text-primary hover:shadow-lg hover:shadow-black/25",
        }}
        backgroundColor="bg-primary"
        className="text-white"
        overlayClassName="bg-gradient-to-r from-black/40 to-black/60 backdrop-blur-sm"
      />

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
};

export default BookingPage;
