import Newsletter from "@/components/layout/Newsletter";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/ui/FAQSection";
import { equityTestimonials } from "@/data/testimonials";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
              href="/booking"
              className="flex justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"
            >
              <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors duration-300">
                Book to Invest
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
      <section className="py-20 px-6 md:px-16 text-center">
        <div className="w-full md:max-w-4xl mx-auto">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Invest
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Making property simple, secure, and smarter for everyone.
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl">
            Equity Nest is designed for investors who want to participate in the
            ownership and profit-sharing side of property investment. Instead of
            fixed returns, your investment grows with the project — giving you
            exposure to property appreciation and development profits.
          </p>
          <div className="flex items-center gap-4 justify-center">
            <Link href="/about">
              <Button>Learn more</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Contact us</Button>
            </Link>
          </div>
        </div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 max-w-6xl mx-auto text-center md:text-left">
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

      <Newsletter />
    </>
  );
};

export default page;
