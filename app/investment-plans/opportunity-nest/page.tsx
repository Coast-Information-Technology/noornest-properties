import Newsletter from "@/components/layout/Newsletter";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/ui/CTASection";
import FAQSection from "@/components/ui/FAQSection";
import {
  opportunityTestimonials,
} from "@/data/testimonials";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbGrowth, TbTarget } from "react-icons/tb";

const opportunityNest = [
  {
    title: "Undervalued Entry Point",
    subtitle: "Below Market Prices",
    description: "Invest at a discount for instant equity.",
    image: "/investments/wealth.png",
  },
  {
    title: "Exclusive Access ",
    subtitle: "Off-Market Deals",
    description: "Opportunities rarely available to the general public.",
    image: "/investments/project.png",
  },
  {
    title: "Flexibility",
    subtitle: "Exit Options",
    description: "Flip, rent, or hold long-term for maximum returns.",
    image: "/investments/diversification.png",
  },
  {
    title: "Verified & Vetted",
    subtitle: "Due Diligence",
    description: "All properties undergo Noornest due diligence.",
    image: "/investments/incentives.png",
  },
];

const faqData = [
  {
    question: "How are below-market deals sourced?",
    answer:
      "Through our network of agents, developers, and distressed sale channels.",
  },
  {
    question: "Are these deals risky?",
    answer:
      "They carry higher risk, but also higher reward. Every deal is vetted for legal and financial soundness.",
  },
  {
    question: "Can I finance an Opportunity Nest deal with a mortgage?",
    answer:
      "Yes, though terms depend on lender requirements and property type.",
  },
  {
    question: "Do I need to manage the property?",
    answer: "No — Noornest offers optional property management services.",
  },
  {
    question: "Is my investment guaranteed to increase in value?",
    answer:
      "No — returns depend on the property market, though discounted entry increases potential upside.",
  },
];

const pricing = [
  {
    minimumInvestment: "£10,000",
    expectedDuration: "2-5 years",
    returnType: "Profit-sharing (varies based on performance)",
  },
];

const returnsIllustration = [
  {
    marketValue: "£200,000",
    purchasePrice: "£160,000",
    immediateEquityGain: "£40,000",
    rentalYield: "7% annually",
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
              Exclusive Below-Market Deals. <br />
              Unlock Hidden Value.
            </h1>
            <div>
              <p className="text-base text-white max-w-2xl lg:max-w-lg mb-8 lg:mb-4">
                Opportunity Nest connects investors with exclusive property
                deals priced below market value — giving you access to
                opportunities others can’t reach.
              </p>
              <Link
                href="#"
                className="flex justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"
              >
                <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-md shadow-lg transition-colors duration-300">
                  Invest in Opportunity Nest
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section - Positioned relative to the main content flow, pulled down to overlap */}
          <div className="relative flex justify-center w-full md:w-[80%] h-full md:h-[450px] max-w-4xl mx-auto">
            <div className="relative w-[90%] md:w-[80%] h-full md:h-[450px] max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden mx-auto">
              <Image
                src="/investments/equity-main.png"
                alt="Modern family house"
                width={800}
                height={300}
                layout="responsive"
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl h-full w-full object-cover object-center"
              />
            </div>

            <Image
              src="/investments/equity-right.png"
              alt="Modern family house"
              width={250}
              height={200}
              className="rounded-xl absolute top-4 -right-4 object-cover shadow-md hidden sm:block"
            />

            <Image
              src="/investments/equity-left.png"
              alt="Modern family house"
              width={180}
              height={300}
              className="rounded-xl absolute -bottom-4 -left-4 object-cover shadow-md hidden sm:block"
            />
          </div>
        </div>
      </section>

      {/* Invest Opportunity Nest */}
      <section className="py-20 px-6 md:px-16 text-center w-full md:max-w-4xl mx-auto">
        <h3 className="text-lg tracking-wide text-black uppercase font-bold">
          Invest
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          Making Strategic Property Investments
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          The best investments are often about timing and access. Opportunity
          Nest is designed for investors who want to capture undervalued
          properties — whether through distressed sales, motivated sellers, or
          off-market opportunities — and enjoy strong capital growth potential.
        </p>
      </section>

      {/* How Opportunity Nest Works */}
      <section className="bg-gray-100 py-20 text-center">
        <div className="w-full px-6 md:px-16 md:max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Process
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            How Opportunity Nest Works
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl">
            Simple steps to invest
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16 max-w-6xl mx-auto text-center md:text-left">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div className="p-6">
              <h3 className="font-semibold mb-2">Step 1</h3>
              <h2 className="text-xl font-bold mb-4">Access Exclusive Deals</h2>
              <p className="text-gray-600">
                Handpicked, below-market properties not found on public portals.
              </p>
            </div>
            <Image
              src="/investments/choose-project.png"
              alt="Choose a Project"
              width={400}
              height={150}
              className="rounded-b-lg mt-4 h-[200px] object-cover"
            />
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div className="p-6">
              <h3 className="font-semibold mb-2">Step 2</h3>
              <h2 className="text-xl font-bold mb-4">
                Invest at Discounted Prices
              </h2>
              <p className="text-gray-600">
                Enter at a lower cost than standard market value.
              </p>
            </div>
            <Image
              src="/investments/invest-equity.png"
              alt="Invest in Equity"
              width={400}
              height={150}
              className="rounded-b-lg mt-4 h-[200px] object-cover"
            />
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div className="p-6">
              <h3 className="font-semibold mb-2">Step 3</h3>
              <h2 className="text-xl font-bold mb-4">
                Benefit from Capital Growth
              </h2>
              <p className="text-gray-600">
                Sell later or rent out for higher long-term returns.
              </p>
            </div>
            <Image
              src="/investments/share-profit.png"
              alt="Share the Profit"
              width={400}
              height={150}
              className="rounded-b-lg mt-4 h-[200px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Opportunity Nest Section */}
      <section className="text-center py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="max-w-5xl mx-auto gap-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Featured
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Why Choose Opportunity Nest
          </h2>
          <p className="text-gray-600 mb-12 md:max-w-3xl mx-auto">
            Curated articles that provide strategic perspectives on property
            investment.
          </p>

          {/* Dynamic Content */}
          {opportunityNest.map((article, idx) => {
            const isReversed = idx % 2 !== 0; // Alternate layout for odd items

            return (
              <div
                key={idx}
                className={`flex flex-col lg:flex-row ${
                  isReversed ? "lg:flex-row-reverse" : ""
                } items-center justify-center border-primary border rounded-[10px] mt-8 overflow-hidden bg-white gap-12`}
              >
                {/* Image Section */}
                <div className="w-full h-[250px] lg:w-1/2 lg:h-[350px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority={idx === 0}
                  />
                </div>

                {/* Text Section */}
                <div
                  className={`w-full lg:w-1/2 text-center lg:text-left px-6 md:px-12 py-8 ${
                    isReversed ? "lg:pl-12 lg:pr-6" : "lg:pl-6 lg:pr-12"
                  }`}
                >
                  <h3 className="text-base md:text-lg tracking-wide text-gray-700 uppercase font-semibold mb-3 md:mb-5">
                    {article.subtitle}
                  </h3>
                  <h2 className="text-2xl md:text-4xl font-bold text-primary leading-snug mb-4">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-6 md:max-w-md mx-auto lg:mx-0 leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Returns Section */}
      <section className="bg-amber-100/50 min-h-screen py-16 md:py-20 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Top Section: Header Content */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-2">
              Returns Illustrative
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
              Opportunity Nest Return Examples
            </h2>
          </div>

          {/* Bottom Section: Two-Column Layout (Text Left, Image Right) */}
          {/* On mobile, stacks vertically. On medium screens and up, becomes two columns. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto mb-8">
            {/* Left Column */}
            <div className="relative w-full min-h-[300px] bg-gray-200 rounded-xl shadow-lg overflow-hidden">
              <Image
                src="/investments/investment-returns.jpg"
                alt="A modern, detached house with a beige facade, white window frames, and solar panels on the roof."
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
                priority
              />
            </div>

            {/* Right Column */}
            <div className="pr-0 md:pr-8 lg:pr-12">
              {/* Add some right padding on larger screens */}
              {returnsIllustration.map((section, id) => (
                <div
                  key={id}
                  className={`py-6 ${
                    id < returnsIllustration.length - 1
                      ? "border-b border-gray-300 space-y-6"
                      : "space-y-6"
                  }`}
                >
                  {/* WCAG: Use appropriate heading levels (h2 here as sub-sections to the main h1) */}
                  <h2 className="text-2xl font-bold text-gray-900">
                    Market Value: {section.marketValue}
                  </h2>
                  <p className="text-xl font-semibold text-gray-700">
                    Purchase Price: {section.purchasePrice}
                  </p>
                  <p className="text-xl font-semibold text-gray-700">
                    Immediate Equity Gain: {section.immediateEquityGain}
                  </p>
                  <p className="text-xl font-semibold text-gray-700">
                    Rental Yield (if let): {section.rentalYield}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 italic">
            (Figures are illustrative only. Actual returns may vary.)
          </p>
        </div>
      </section>

      {/* Who is Equity Nest For? */}
      <section className="bg-background pb-12">
        <AnimatedSection
          variants={fadeInUp}
          className="space-y-6 grid grid-cols-1 lg:grid-cols-2 lg:items-center w-full py-12 px-6 md:px-16"
        >
          {/* Text Content */}
          <div className="space-y-4">
            <div className="text-center space-y-4 sm:space-y-6 lg:text-left">
              <AnimatedText
                as="h3"
                className="text-lg tracking-wide text-black uppercase font-bold"
              >
                Equity Nest
              </AnimatedText>
              <AnimatedText
                as="h2"
                className="text-3xl lg:text-[2.5rem] font-bold tracking-tight text-primary leading-tight"
                delay={0.2}
              >
                Who is <br />
                Opportunity Nest For?
              </AnimatedText>
            </div>
          </div>

          {/* Description + Buttons */}
          <div className="space-y-4">
            <div className="text-left">
              <AnimatedText
                as="h2"
                className="text-xl text-gray-900 font-bold flex max-w-4xl mx-auto leading-relaxed px-4 mb-5"
              >
                Opportunity Nest is ideal for:
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 font-semibold max-w-4xl mx-auto leading-relaxed px-4 mb-3"
                delay={0.2}
              >
                <span className="flex items-center gap-4">
                  <TbTarget className="w-6 h-6" />
                  <p>
                    Experienced investors seeking higher-value opportunities
                  </p>
                </span>
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 font-semibold max-w-4xl mx-auto leading-relaxed px-4 mb-3"
                delay={0.2}
              >
                <span className="flex items-center gap-4">
                  <BsGraphUpArrow className="w-6 h-6" />
                  Those seeking growth over fixed returns
                </span>
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 font-semibold max-w-4xl mx-auto leading-relaxed px-4 mb-3"
                delay={0.2}
              >
                <span className="flex items-center gap-4">
                  <TbGrowth className="w-6 h-6" />
                  Individuals looking to diversify into property ownership
                  without direct management
                </span>
              </AnimatedText>
            </div>
          </div>
        </AnimatedSection>

        {/* Hero Image */}
        <div className="flex justify-center w-full h-[250px] md:max-w-[60vw] lg:h-[400px] mx-auto rounded-[10px] lg:rounded-[20px] px-8 mb-16">
          <Image
            src="/about/about-hero.png"
            alt="simplified properties in the UK"
            width={500}
            height={300}
            className="object-cover w-full h-full rounded-[20px]"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="py-16 px-6 md:px-10 lg:px-20 text-center bg-white text-gray-900"
        aria-labelledby="pricing-heading"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
          Investments
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Flexible design solutions for every budget and vision.
        </p>

        {/* Plans */}
        <div className="mt-12 w-fit mx-auto text-left">
          {pricing.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 shadow-sm bg-white p-8 flex flex-col items-start justify-between focus-within:ring-2 focus-within:ring-primary transition hover:shadow-md"
              role="region"
              aria-labelledby={`plan-${i}`}
            >
              <TbGrowth className="w-10 h-10 mb-4" />
              <h4
                id={`plan-${i}`}
                className="text-2xl font-semibold text-primaey"
              >
                Minimum Investment: {plan.minimumInvestment}
              </h4>
              <p className="mt-3 text-xl font-bold text-gray-900">
                Investment Duration: {plan.expectedDuration}
              </p>
              <p className="mt-3 text-lg text-gray-600">
                Type: {plan.returnType}
              </p>

              {/* CTA */}
              <Link href="/booking" aria-label="Book a Design Consultation">
                <Button
                  className="mt-12 inline-block w-full"
                  aria-label="Book a Design Consultation"
                >
                  Book an Investment Consultation
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialCarousel
        testimonials={opportunityTestimonials}
        title="Testimonial"
        backgroundColor="bg-purple-50"
        cardBackgroundColor="#EADBC8"
        primaryColor="#BFA14A"
        accentColor="#EADBC8"
      />

      <FAQSection title="Frequently Asked Questions" faqs={faqData} />

      {/* CTA Section */}
      <CTASection
        title="Ready to Unlock High-Value Property Opportunities?"
        description="Start your journey with Opportunity Nest today."
        primaryButton={{
          text: "Invest in Opportunity Nest",
          href: "#",
          className: "bg-accent text-primary hover:bg-white hover:shadow-lg",
        }}
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
