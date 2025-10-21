import Newsletter from "@/components/layout/Newsletter";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/ui/CTASection";
import FAQSection from "@/components/ui/FAQSection";
import { equityTestimonials, secureTestimonials } from "@/data/testimonials";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbGrowth, TbTarget } from "react-icons/tb";

const secureNest = [
  {
    title: "Predictable Earnings",
    subtitle: "Fixed Returns",
    description: "Know your return from day one.",
    image: "/investments/wealth.png",
  },
  {
    title: "Lower Risk",
    subtitle: "Property-Backed",
    description: "Backed by verified property projects.",
    image: "/investments/project.png",
  },
  {
    title: "Flexible Terms",
    subtitle: "Duration Options",
    description: "Short- to medium-term durations available.",
    image: "/investments/diversification.png",
  },
  {
    title: "Accessible Entry Point",
    subtitle: "Lower Minimums",
    description: "Lower minimum than equity-based plans.",
    image: "/investments/incentives.png",
  },
];

const faqData = [
  {
    question: "Are returns guaranteed?",
    answer: "Yes — your return is fixed and predefined when you invest.",
  },
  {
    question: "What happens if the property market drops?",
    answer:
      "Your return is unaffected; Secure Nest payouts are not tied to market fluctuations.",
  },
  {
    question: "Can I withdraw before the term ends?",
    answer:
      "Generally, investments are locked until maturity, though early-exit options may be available with conditions.",
  },
  {
    question: "What is the typical return rate?",
    answer: "Secure Nest returns usually range between 5–8% annually.",
  },
  {
    question: "Is my capital completely risk-free?",
    answer:
      "All investments carry some risk, but Secure Nest is structured for maximum security.",
  },
];

const pricing = [
  {
    minimumInvestment: "£1,000",
    expectedDuration: "6-24 months",
    returnType: "Fixed return (guaranteed % yield)",
  },
];

const returnsIllustration = [
  {
    investment: "£5,000",
    term: "12 months",
    fixedReturn: "7% annual",
    totalReturn: "£5,350 (before fees & taxes)",
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
              Predictable Returns. <br />
              Peace of Mind.
            </h1>
            <div>
              <p className="text-base text-white max-w-2xl lg:max-w-lg mb-8 lg:mb-4">
                Secure Nest offers fixed-return property investments, giving you
                certainty and stability in an often-uncertain market. Invest
                confidently with predefined outcomes.
              </p>
              <Link
                href="/booking"
                className="flex justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"
              >
                <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-md shadow-lg transition-colors duration-300">
                  Book to Invest
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

      {/* Invest Secure Nest */}
      <section className="py-20 px-6 md:px-16 text-center w-full md:max-w-4xl mx-auto">
        <h3 className="text-lg tracking-wide text-black uppercase font-bold">
          Invest
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          Making property simple, secure, and smarter for everyone.
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Not every investor wants risk or volatility. Secure Nest is designed
          for those who prefer safety and predictability. By offering fixed
          returns over a set period, this plan ensures you know exactly what
          you’ll earn, regardless of market swings.
        </p>
      </section>

      {/* How Secure Nest Works */}
      <section className="bg-gray-100 py-20 text-center">
        <div className="w-full px-6 md:px-16 md:max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Process
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            How Secure Nest Works
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
              <h2 className="text-xl font-bold mb-4">Choose a Secure Plan</h2>
              <p className="text-gray-600">
                Select from fixed-term investment options.
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
              <h2 className="text-xl font-bold mb-4">Invest with Confidence</h2>
              <p className="text-gray-600">
                Funds are allocated into verified property-backed projects.
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
              <h2 className="text-xl font-bold mb-4">Earn Fixed Returns</h2>
              <p className="text-gray-600">
                Receive guaranteed payouts at maturity.
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

      {/* Why Choose Secure Nest Section */}
      <section className="text-center py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="max-w-5xl mx-auto gap-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Featured
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Why Choose Secure Nest
          </h2>
          <p className="text-gray-600 mb-12 md:max-w-3xl mx-auto">
            Curated articles that provide strategic perspectives on property
            investment.
          </p>

          {/* Dynamic Content */}
          {secureNest.map((article, idx) => {
            const isReversed = idx % 2 !== 0; // Alternate layout for odd items

            return (
              <div
                key={idx}
                className={`flex flex-col lg:flex-row ${
                  isReversed ? "lg:flex-row-reverse" : ""
                } items-center justify-center border-primary border rounded-[10px] mt-8 overflow-hidden bg-white gap-12`}
              >
                {/* Image Section */}
                <div className="w-full h-[250px] lg:w-1/2 lg:h-[400px]">
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
              Secure Nest Return Examples
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
                    Fixed Return: {section.fixedReturn}
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

      {/* Who is Secure Nest For? */}
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
                Secure Nest
              </AnimatedText>
              <AnimatedText
                as="h2"
                className="text-3xl lg:text-[2.5rem] font-bold tracking-tight text-primary leading-tight"
                delay={0.2}
              >
                Who is <br />
                Secure Nest For?
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
                Secure Nest is ideal for:
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 font-semibold max-w-4xl mx-auto leading-relaxed px-4 mb-3"
                delay={0.2}
              >
                <span className="flex items-center gap-4">
                  <TbTarget className="w-6 h-6" />
                  <p>Investors who prefer certainty over variable growth</p>
                </span>
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 font-semibold max-w-4xl mx-auto leading-relaxed px-4 mb-3"
                delay={0.2}
              >
                <span className="flex items-center gap-4">
                  <BsGraphUpArrow className="w-6 h-6" />
                  Retirees or conservative investors seeking steady returns
                </span>
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 font-semibold max-w-4xl mx-auto leading-relaxed px-4 mb-3"
                delay={0.2}
              >
                <span className="flex items-center gap-4">
                  <TbGrowth className="w-6 h-6" />
                  Those new to property investing who want a safe entry point
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
        testimonials={secureTestimonials}
        title="Testimonial"
        backgroundColor="bg-purple-50"
        cardBackgroundColor="#EADBC8"
        primaryColor="#BFA14A"
        accentColor="#EADBC8"
      />

      <FAQSection title="Frequently Asked Questions" faqs={faqData} />

      {/* CTA Section */}
      <CTASection
        title="Ready for Stable, Fixed Returns with Secure Nest?"
        description="Take the first step towards predictable property investment today."
        primaryButton={{
          text: "Invest in Secure Nest",
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
