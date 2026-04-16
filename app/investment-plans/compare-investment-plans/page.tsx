"use client";

import Newsletter from "@/components/layout/Newsletter";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/ui/CTASection";
import FAQSection from "@/components/ui/FAQSection";
import { testimonialsData } from "@/data/testimonials";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Home,
  Lock,
  TrendingUp,
  ChevronRight,
  Monitor,
  MessageSquare,
  CircleDot,
  BookOpen,
} from "lucide-react";

const plans = [
  {
    title: "Equity Nest",
    description: "Grow with property ownership and share in long-term profits.",
    image: "/investments/equity-nest.jpg",
    icon: <Home className="w-6 h-6 text-white" aria-hidden="true" />,
    buttons: [
      { label: "Details", href: "#", style: "primary" },
      { label: "Learn more", href: "#", style: "secondary" },
    ],
  },
  {
    title: "Yield Nest",
    description: "Steady cash flow from rental income, fully managed.",
    image: "/investments/yield-nest.jpg",
    icon: <LayoutGrid className="w-6 h-6 text-white" aria-hidden="true" />,
    buttons: [
      { label: "Explore", href: "#", style: "primary" },
      { label: "Investigate", href: "#", style: "secondary" },
    ],
  },
  {
    title: "Secure Nest",
    description: "Predictable fixed returns with lower risk exposure.",
    image: "/investments/secure-nest.jpg",
    icon: <Lock className="w-6 h-6 text-white" aria-hidden="true" />,
    buttons: [
      { label: "Details", href: "#", style: "primary" },
      { label: "Learn more", href: "#", style: "secondary" },
    ],
  },
  {
    title: "Opportunity Nest",
    description: "Exclusive below-market deals for instant equity.",
    image: "/investments/opportunity-nest.jpg",
    icon: <TrendingUp className="w-6 h-6 text-white" aria-hidden="true" />,
    buttons: [
      { label: "Explore", href: "#", style: "primary" },
      { label: "Investigate", href: "#", style: "secondary" },
    ],
  },
];

const strategies = [
  {
    id: 1,
    title: "Equity Nest details",
    description: "Profit through strategic property ownership",
    icon: <Monitor className="w-12 h-12 text-primary" aria-hidden="true" />,
    link: "/investment-plans/equity-nest",
    cta: "Dive in",
  },
  {
    id: 2,
    title: "Yield Nest overview",
    description: "Steady income from managed rental properties",
    icon: (
      <MessageSquare className="w-12 h-12 text-primary" aria-hidden="true" />
    ),
    link: "/investment-plans/yield-nest",
    cta: "Explore",
  },
  {
    id: 3,
    title: "Secure Nest approach",
    description: "Predictable returns with minimal risk",
    icon: <CircleDot className="w-12 h-12 text-primary" aria-hidden="true" />,
    link: "/investment-plans/secure-nest",
    cta: "Review",
  },
  {
    id: 4,
    title: "Opportunity Nest strategy",
    description: "High-potential investments for bold investors",
    icon: <BookOpen className="w-12 h-12 text-primary" aria-hidden="true" />,
    link: "/investment-plans/opportunity-nest",
    cta: "Discover",
  },
];

const faqData = [
  {
    question: "Can I invest in more than one plan?",
    answer:
      "Yes — many investors diversify across multiple plans to balance risk and maximize returns.",
  },
  {
    question: "Which plan is the safest?",
    answer:
      "Secure Nest offers the most stability with fixed returns, ideal for conservative investors.",
  },
  {
    question: "Which plan has the highest returns?",
    answer:
      "Opportunity Nest and Equity Nest offer higher potential returns, but they also carry higher risk.",
  },
  {
    question: "Do I need property experience to invest?",
    answer:
      "No — all plans are fully managed by Noornest’s experts, so you can invest confidently without prior experience.",
  },
  {
    question: "Is the consultation free?",
    answer:
      "Yes — we offer free consultations to help you choose the plan that best aligns with your goals.",
  },
];

const page = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-white overflow-hidden -z-30">
        <div className="absolute inset-x-0 top-0 h-[90vh] bg-primary z-0" />

        {/* Hero Content Area - Relative z-index to sit on top of the gold background */}
        <div className="relative z-10 py-16">
          {/* Top Section with Text and Buttons */}
          <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-between text-center lg:text-left px-4 sm:px-6 lg:px-16  mx-auto">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              Find the Right <br />
              Investment Plan for You
            </h1>
            <div>
              <p className="text-base text-white max-w-2xl lg:max-w-lg mb-8 lg:mb-4">
                Every investor is different. That’s why Noornest offers four
                tailored property investment plans — compare them side by side
                to choose the best fit for your goals.
              </p>
              <Link
                href="/booking"
                className="flex justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"
              >
                <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-md shadow-lg transition-colors duration-300">
                  Book to Investment Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section - Positioned relative to the main content flow, pulled down to overlap */}
          <div className="relative flex justify-center w-full md:w-[80%] h-full md:h-[450px] max-w-4xl mx-auto">
            <div className="relative w-[90%] md:w-[80%] h-full md:h-[450px] max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden mx-auto">
              <Image
                src="/investments/compare-hero.png"
                alt="Modern family house"
                width={800}
                height={300}
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Invest Opportunity Nest */}
      <section className="py-20 px-6 md:px-16 text-center w-full md:max-w-4xl mx-auto">
        <h3 className="text-lg tracking-wide text-black uppercase font-bold">
          Overview
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          Explore Our Investment Plans
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Property investment is not one-size-fits-all. Whether you’re looking
          for long-term growth, steady rental income, predictable fixed returns,
          or exclusive below-market opportunities, Noornest has a plan designed
          for you.
        </p>
      </section>

      {/* Investments Comparison Table */}
      <section
        className="bg-white py-20 px-4 md:px-12 lg:px-20"
        aria-labelledby="investment-strategies"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3
            id="investment-strategies"
            className="text-lg font-semibold text-gray-800 uppercase tracking-wide"
          >
            Plans
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Investment Strategies Compared
          </h2>
          <p className="text-gray-600 text-base">
            Four paths to property investment success
          </p>
        </div>

        <div className="overflow-x-auto text-left">
          <table className="w-full border-collapse text-sm md:text-base text-gray-800">
            <caption className="sr-only">
              Comparison of investment strategies across four plans
            </caption>
            <thead className="bg-primary text-white">
              <tr>
                <th
                  scope="col"
                  className="text-left p-4 font-semibold rounded-tl-2xl"
                >
                  Feature
                </th>
                <th scope="col" className="p-4 font-semibold">
                  Equity Nest
                </th>
                <th scope="col" className="p-4 font-semibold">
                  Yield Nest
                </th>
                <th scope="col" className="p-4 font-semibold">
                  Secure Nest
                </th>
                <th scope="col" className="p-4 font-semibold rounded-tr-2xl">
                  Opportunity Nest
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  feature: "Type",
                  values: [
                    "Profit-sharing (equity growth)",
                    "Rental income",
                    "Fixed-return",
                    "Below-market deals",
                  ],
                },
                {
                  feature: "Return Style",
                  values: [
                    "Variable, based on project profits",
                    "Steady monthly/quarterly income",
                    "Steady monthly/quarterly income",
                    "Capital growth + rental yield",
                  ],
                },
                {
                  feature: "Risk Level",
                  values: ["High", "Medium", "Low", "High"],
                },
                {
                  feature: "Typical Returns",
                  values: [
                    "15–30% over 2–5 years",
                    "5–8% annually",
                    "5–8% annually (fixed)",
                    "20%+ (discounted entry + growth)",
                  ],
                },
                {
                  feature: "Minimum Investment",
                  values: ["£5,000", "£2,500", "£2,500", "£10,000"],
                },
                {
                  feature: "Investment Duration",
                  values: [
                    "2–5 years",
                    "1–3 years",
                    "6–24 months",
                    "1–5 years",
                  ],
                },
                {
                  feature: "Best For",
                  values: [
                    "Long-term growth investors",
                    "Income-focused investors",
                    "Conservative, stability-seekers",
                    "High-risk, high-reward investors",
                  ],
                },
                {
                  feature: "Liquidity",
                  values: [
                    "Income throughout term",
                    "Income throughout term",
                    "Locked until maturity",
                    "Locked until resale/exit",
                  ],
                },
                {
                  feature: "Example Use Case",
                  values: [
                    "Participate in property development profits",
                    "Earn steady rent from managed units",
                    "Safe fixed % return",
                    "Secure instant equity from distressed sales",
                  ],
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b border-gray-200`}
                >
                  <th
                    scope="row"
                    className="text-left p-4 font-semibold text-gray-900"
                  >
                    {row.feature}
                  </th>
                  {row.values.map((val, j) => (
                    <td
                      key={j}
                      className="p-4 text-gray-700 text-sm md:text-base"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {strategies.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6 flex flex-col justify-between h-full transition hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              <div>
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">{item.description}</p>
              </div>

              <Link
                href={item.link}
                aria-label={`${item.cta} ${item.title}`}
                className="flex items-center gap-2 text-primary font-medium hover:underline focus:outline-none"
              >
                {item.cta}
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className="bg-[#f5ebd0] py-20 px-4 md:px-12 lg:px-20"
        aria-labelledby="investment-strategies"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3
            id="investment-strategies"
            className="text-lg font-semibold text-gray-800 uppercase tracking-wide"
          >
            Highlights
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Investment plans at a glance
          </h2>
          <p className="text-gray-700 text-base">
            Four distinct paths to property investment success
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-2xl focus-within:ring-4 focus-within:ring-primary/70"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              role="region"
              aria-label={plan.title}
            >
              <Image
                src={plan.image}
                alt={`${plan.title} background`}
                width={600}
                height={400}
                className="object-cover w-full h-64 sm:h-72 md:h-80 transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end p-6 text-left text-white">
                <div className="mb-3">{plan.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-white/90 mb-6 text-sm md:text-base leading-relaxed">
                  {plan.description}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {plan.buttons.map((btn, i) => (
                    <Link
                      key={i}
                      href={btn.href}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        btn.style === "primary"
                          ? "bg-primary hover:shadow-lg text-gray-900 focus:ring-primary/70"
                          : "border border-white/70 hover:bg-white/20 text-white focus:ring-white"
                      }`}
                      aria-label={btn.label}
                    >
                      {btn.label}
                      {btn.style === "secondary" && (
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="bg-white py-20 px-4 md:px-12 lg:px-20"
        aria-labelledby="why-compare-heading"
      >
        {/* Header Section */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h3
            id="why-compare-heading"
            className="text-sm md:text-base font-semibold text-gray-800 uppercase tracking-wide mb-2"
          >
            Precision
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Why Compare with Noornest?
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Tailored strategies for every investor&apos;s unique financial
            landscape
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary row-span-2">
            <div className="w-full h-56 md:h-[350px] relative">
              <Image
                src="/investments/investment-handshake.jpg"
                alt="Two people shaking hands with a model house on the table, representing partnership"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 text-left">
              <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
                Verified
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Crafted with rigorous investment intelligence
              </h3>
              <p className="text-gray-600 mb-6">
                We cut through complexity. Our plans are sharp, direct,
                engineered for clear results.
              </p>
              <div className="flex items-center gap-5">
                <Link href="/analyze" aria-label="Analyze your investments">
                  <button className="bg-primary text-white font-medium px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition">
                    Analyze
                  </button>
                </Link>
                <Link
                  href="/explore"
                  className="flex items-center gap-2 text-gray-900 hover:text-primary font-medium"
                >
                  Explore <ChevronRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col md:flex-row transition hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
            <div className="relative md:w-1/2 w-full h-56 md:h-auto">
              <Image
                src="/investments/investment-graph.jpg"
                alt="House model beside stacked coins showing upward growth trend"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 md:w-1/2 text-left flex flex-col justify-center">
              <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
                Flexible
              </p>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                Adapt your investment approach
              </h3>
              <p className="text-gray-600 mb-6">
                Mix strategies to balance risk and maximize potential across
                different market conditions.
              </p>
              <Link
                href="/customize"
                className="flex items-center gap-2 text-gray-900 hover:text-primary font-medium"
              >
                Customize <ChevronRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col md:flex-row transition hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
            <div className="relative md:w-1/2 w-full h-56 md:h-auto">
              <Image
                src="/investments/investment-portfolio.jpg"
                alt="Hand holding a miniature house model representing portfolio building"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 md:w-1/2 text-left flex flex-col justify-center">
              <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
                Strategic
              </p>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                Build your investment portfolio
              </h3>
              <p className="text-gray-600 mb-6">
                Create a personalized investment blueprint that reflects your
                financial goals and risk tolerance.
              </p>
              <Link
                href="/design"
                className="flex items-center gap-2 text-gray-900 hover:text-primary font-medium"
              >
                Design <ChevronRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialCarousel
        testimonials={testimonialsData}
        title="Testimonial"
        backgroundColor="bg-purple-50"
        cardBackgroundColor="#EADBC8"
        primaryColor="#BFA14A"
        accentColor="#EADBC8"
      />

      <FAQSection title="Frequently Asked Questions" faqs={faqData} />

      {/* CTA Section */}
      <CTASection
        title="Not Sure Which Plan is Right for You?"
        secondaryButton={{
          text: "Book a consultation",
          href: "/properties",
          className:
            "border border-black bg-transparent text-black hover:bg-black hover:shadow-lg hover:shadow-black hover:text-white",
        }}
        backgroundColor="bg-primary"
        className="text-white"
        overlayClassName="bg-gradient-to-r from-black/40 to-black/60 backdrop-blur-sm"
      />

      <Newsletter />
    </>
  );
};

export default page;
