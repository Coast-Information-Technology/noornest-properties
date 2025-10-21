import Newsletter from "@/components/layout/Newsletter";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/ui/CTASection";
import FAQSection from "@/components/ui/FAQSection";
import { equityTestimonials } from "@/data/testimonials";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbGrowth, TbTarget } from "react-icons/tb";

const equityNest = [
  {
    title: "Long-Term Wealth",
    subtitle: "Growth",
    description: "Participate in property appreciation.",
    image: "/investments/wealth.png",
  },
  {
    title: "Verified Projects",
    subtitle: "Screened",
    description: "Every deal screened and due-diligenced by Noornest.",
    image: "/investments/project.png",
  },
  {
    title: "Diversification",
    subtitle: "Portfolio",
    description: "Spread risk across multiple developments.",
    image: "/investments/diversification.png",
  },
  {
    title: "Aligned Incentives",
    subtitle: "Partners",
    description: "Partners motivated to maximize project success.",
    image: "/investments/incentives.png",
  },
];

const faqData = [
  {
    question: "What type of projects are included?",
    answer: "Primarily residential and mixed-use developments in the UK.",
  },
  {
    question: "Are returns guaranteed?",
    answer: "No — returns are linked to property performance.",
  },
  {
    question: "How do I receive my profits?",
    answer: "How do I receive my profits?",
  },
  {
    question: "Can I exit early?",
    answer:
      "Generally, equity investments are locked until project completion.",
  },
  {
    question: "Is my capital at risk?",
    answer: "Yes — as with any equity investment, returns are not guaranteed.",
  },
];

const pricing = [
  {
    minimumInvestment: "£5,000",
    expectedDuration: "2-5 years",
    returnType: "Profit-sharing (varies based on performance)",
  },
];

const returnsIllustration = [
  {
    investment: "£10,000",
    term: "3 years",
    exitValue: "25% capital growth",
    totalReturn: "£12,500",
  },
];

const page = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-white overflow-hidden -z-30">
        {/* Absolute Pseudo-Element for Gold Background (bg-primary) 
                This creates the fixed-height gold block sitting underneath the content. */}
        <div
          className="absolute inset-x-0 top-0 h-[90vh] bg-primary z-0"
          // Note: I'm using a fixed height (e.g., 400px) here. Adjust this value
          // to control how much of the gold background you want visible.
        />

        {/* Hero Content Area - Relative z-index to sit on top of the gold background */}
        <div className="relative z-10 py-16">
          {/* Top Section with Text and Buttons */}
          <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Grow with Property. <br />
              Share in the Profits.
            </h1>
            <p className="text-base text-white max-w-2xl mb-8">
              Equity Nest lets you invest in property developments and share in
              the long-term capital growth. A smarter way to build wealth
              alongside verified property partners.
            </p>
            <Link
              href="#"
              className="flex justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"
            >
              <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors duration-300">
                Invest in Equity Nest
              </Button>
            </Link>
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

      {/* Invest Equity Nest */}
      <section className="py-20 px-6 md:px-16 text-center w-full md:max-w-4xl mx-auto">
        <h3 className="text-lg tracking-wide text-black uppercase font-bold">
          Invest
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          Making Strategic Property Investments
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Equity Nest is designed for investors who want to participate in the
          ownership and profit-sharing side of property investment. Instead of
          fixed returns, your investment grows with the project — giving you
          exposure to property appreciation and development profits.
        </p>
      </section>

      {/* How Equity Nest Works */}
      <section className="bg-gray-100 py-20 text-center">
        <div className="w-full px-6 md:px-16 md:max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Process
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            How Equity Nest Works
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
              <h2 className="text-xl font-bold mb-4">Choose a Project</h2>
              <p className="text-gray-600">
                Select from verified property development opportunities.
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
              <h2 className="text-xl font-bold mb-4">Invest in Equitty</h2>
              <p className="text-gray-600">
                Select from verified property development opportunities.
              </p>
            </div>
            <Image
              src="/investments/invest-equity.png"
              alt="Invest in Equitty"
              width={400}
              height={150}
              className="rounded-b-lg mt-4 h-[200px] object-cover"
            />
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div className="p-6">
              <h3 className="font-semibold mb-2">Step 3</h3>
              <h2 className="text-xl font-bold mb-4">Share the Profit</h2>
              <p className="text-gray-600">
                Receive your portion of returns when the property sells or
                appreciates.
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

      {/* Why Choose Equity Nest Section */}
      <section className="text-center py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="max-w-5xl mx-auto gap-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Featured
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Why Choose Equity Nest
          </h2>
          <p className="text-gray-600 mb-12 md:max-w-3xl mx-auto">
            Curated articles that provide strategic perspectives on property
            investment.
          </p>

          {/* Dynamic Content */}
          {equityNest.map((article, idx) => {
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
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <Link
                      href="/about"
                      className="focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Button>Discover</Button>
                    </Link>
                    <Link
                      href="/contact"
                      className="focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <Button variant="ghost">Research</Button>
                    </Link>
                  </div>
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
              Equity Nest Return Examples
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
                    Investment: {section.investment}
                  </h2>
                  <p className="text-xl font-semibold text-gray-700">
                    Term: {section.term}
                  </p>
                  <p className="text-xl font-semibold text-gray-700">
                    Exit Value: {section.exitValue}
                  </p>
                  <p className="text-xl font-semibold text-gray-700">
                    Total Return: {section.totalReturn}
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
                Equity Nest For?
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
                Equity Nest is ideal for:
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 font-semibold max-w-4xl mx-auto leading-relaxed px-4 mb-3"
                delay={0.2}
              >
                <span className="flex items-center gap-4">
                  <TbTarget className="w-6 h-6" />
                  <p>Investors with medium to long-term goals</p>
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
        testimonials={equityTestimonials}
        title="Testimonial"
        backgroundColor="bg-purple-50"
        cardBackgroundColor="#EADBC8"
        primaryColor="#BFA14A"
        accentColor="#EADBC8"
      />

      <FAQSection title="Frequently Asked Questions" faqs={faqData} />

      {/* CTA Section */}
      <CTASection
        title="Ready to Build Long-Term Wealth with Equity Nest?"
        description="Transform your property with design that adds real value and tells a compelling story."
        primaryButton={{
          text: "Invest in Equity Nest",
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
