"use client";

import Newsletter from "@/components/layout/Newsletter";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/ui/CTASection";
import { interiorTestimonials, salesTestimonials } from "@/data/testimonials";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Camera,
  Megaphone,
  Tags,
  UserCheck,
  BarChart3,
  ClipboardList,
  Rocket,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import FAQSection from "@/components/ui/FAQSection";

const services = [
  {
    id: 1,
    icon: <Camera className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "High-Impact Listings",
    description:
      "Professional photography, video tours, and floor plans that make your property stand out.",
    image: "/sales/high-impact-listing.jpg",
    actions: [
      {
        label: "Create My Listing",
        href: "/sales/listing",
        variant: "primary",
      },
      {
        label: "View Examples",
        href: "/sales/listing/examples",
        variant: "link",
      },
    ],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-3",
  },
  {
    id: 2,
    icon: <Megaphone className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "Targeted Marketing",
    description:
      "Digital campaigns across social and buyer networks to reach the right audience fast.",
    image: "/sales/targeted-marketing.jpg",
    actions: [
      {
        label: "Launch Campaign",
        href: "/sales/marketing",
        variant: "primary",
      },
      {
        label: "Channel Strategy",
        href: "/sales/marketing/channels",
        variant: "link",
      },
    ],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    id: 3,
    icon: <Tags className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "Property Valuation Support",
    description:
      "Data-led pricing strategies that attract serious offers without underselling.",
    image: "/sales/valuation-support.jpg",
    actions: [
      {
        label: "Get Valuation Help",
        href: "/sales/valuation",
        variant: "primary",
      },
      {
        label: "Pricing Guide",
        href: "/sales/valuation/guide",
        variant: "link",
      },
    ],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-3",
  },
  {
    id: 4,
    icon: <UserCheck className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "Buyer Matching",
    description:
      "Connect with verified, pre-screened buyers interested in your property type.",
    image: "/sales/buyer-matching.jpg",
    actions: [
      {
        label: "Match Buyers",
        href: "/sales/buyer-matching",
        variant: "primary",
      },
    ],
    rowSpan: "md:row-span-2",
  },
  {
    id: 5,
    icon: <BarChart3 className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "Performance Tracking",
    description:
      "Transparent reports on views, enquiries, and offers—see what’s working in real time.",
    image: "/sales/performance-tracking.jpg",
    actions: [
      { label: "View Reports", href: "/sales/analytics", variant: "primary" },
    ],
    rowSpan: "md:row-span-2",
  },
];

const faqData = [
  {
    question: "How quickly can you list my property?",
    answer:
      "Most properties go live within 48 hours once we have all details and photos.",
  },
  {
    question: "Do you handle negotiations?",
    answer:
      "Yes, we assist in connecting you with buyers and guiding offers transparently.",
  },
  {
    question: "What types of properties can you market?",
    answer:
      "We handle apartments, houses, land, commercial units, and developer projects.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes — you can upgrade at any time to access premium marketing services.",
  },
  {
    question: "Do you charge commission?",
    answer:
      "We offer flexible flat-fee and commission-based options depending on the package.",
  },
];

const steps = [
  {
    icon: (
      <ClipboardList className="w-7 h-7 text-yellow-700" aria-hidden="true" />
    ),
    title: "Submit Your Property",
    desc: "Share details, photos, and documents.",
  },
  {
    icon: <Rocket className="w-7 h-7 text-yellow-700" aria-hidden="true" />,
    title: "Marketing Launch",
    desc: "We create and publish a high-impact listing.",
  },
  {
    icon: <BadgeCheck className="w-7 h-7 text-yellow-700" aria-hidden="true" />,
    title: "Sell Confidently",
    desc: "Connect with verified buyers until closing.",
  },
];

const SalesMarketingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const monthlyPlans = [
    {
      title: "Standard Plan",
      price: "From £299 flat fee",
      features: [
        "Basic listing on Noornest",
        "Standard property photography",
        "Enquiry handling",
      ],
      button: "Request a Sales Package",
    },
    {
      title: "Professional Plan",
      price: "From £599 flat fee",
      features: [
        "Premium listing placement",
        "Pro photography & video tour",
        "Social campaign (FB, IG, LinkedIn)",
        "Buyer pre-screening",
      ],
      button: "Request a Sales Package",
    },
    {
      title: "Premium Plan",
      price: "Custom pricing",
      features: [
        "All Professional features",
        "Dedicated marketing manager",
        "Homepage feature placement",
        "Advanced analytics & reporting",
        "Multi-property bundle discounts",
      ],
      button: "Request a Sales Package",
    },
  ];

  // If your UI expects a yearly toggle, mirror the same structures:
  const yearlyPlans = [
    {
      title: "Standard Plan (Annual)",
      price: "From £299 flat fee",
      features: [
        "Basic listing on Noornest",
        "Standard property photography",
        "Enquiry handling",
      ],
      button: "Request a Sales Package",
    },
    {
      title: "Professional Plan (Annual)",
      price: "From £599 flat fee",
      features: [
        "Premium listing placement",
        "Pro photography & video tour",
        "Social campaign (FB, IG, LinkedIn)",
        "Buyer pre-screening",
      ],
      button: "Request a Sales Package",
    },
    {
      title: "Premium Plan (Annual)",
      price: "Custom pricing",
      features: [
        "All Professional features",
        "Dedicated marketing manager",
        "Homepage feature placement",
        "Advanced analytics & reporting",
        "Multi-property bundle discounts",
      ],
      button: "Request a Sales Package",
    },
  ];

  const plans = isYearly ? yearlyPlans : monthlyPlans;

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
              Sell Smarter with Noornest
            </h1>
            <p className="text-base text-white max-w-2xl mb-8">
              From creating compelling listings to reaching verified buyers,
              Noornest helps you sell your property faster, with transparency
              and confidence.
            </p>
            <Link
              href="/properties"
              className="flex justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"
            >
              <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors duration-300">
                Properties Listing
              </Button>
            </Link>
          </div>

          {/* Image Section - Positioned relative to the main content flow, pulled down to overlap */}
          <div className="flex justify-center">
            <div className="w-[90%] md:w-[80%] h-full md:h-[500px] max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden mx-auto">
              <Image
                src="/blog/blog-hero.png"
                alt="Modern family house"
                width={800}
                height={300}
                layout="responsive"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-center py-12 lg:py-16 px-8 md:px-16 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          Sales Property
        </h2>
        <p className="text-gray-600 md:max-w-3xl mx-auto">
          Selling property in today’s market requires more than just a “For
          Sale” sign. With Noornest, you gain access to professional marketing,
          wide exposure, and a trusted platform that connects your property to
          serious buyers.
        </p>
      </section>

      {/* What We Offer Section */}
      <section className="bg-white py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="max-w-5xl mx-auto gap-12 text-center">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-4">
            Solution
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            What We Offer
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
            At Noornest, we believe every space tells a story. Our services are
            designed to transform properties into stylish, functional, and
            market-ready homes. Whether you’re seeking curated design concepts,
            turnkey furnishing packages, or full end-to-end management, we
            provide solutions that blend creativity with practicality—helping
            you unlock the true potential of your property.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[400px] lg:auto-rows-[200px] mt-8">
          {services.map((service) => (
            <div
              key={service.id}
              role="group"
              tabIndex={0}
              aria-labelledby={`service-${service.id}-title`}
              className={`relative overflow-hidden rounded-2xl focus:ring-4 focus:ring-offset-2 focus:ring-yellow-600 ${
                service.colSpan ?? ""
              } ${service.rowSpan ?? ""}`}
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70 transition-all duration-300 hover:bg-black/80" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center p-6 text-white space-y-6">
                <div className="">
                  {service.icon}
                  <h3
                    id={`service-${service.id}-title`}
                    className="text-lg sm:text-xl font-semibold mt-6"
                  >
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-100 mb-10 max-w-md">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  {service.actions.map((action, i) =>
                    action.variant === "primary" ? (
                      <Link
                        key={i}
                        href={action.href}
                        aria-label={action.label}
                        className="inline-block bg-primary hover:bg-[#a7843e] text-white text-sm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
                      >
                        {action.label}
                      </Link>
                    ) : (
                      <Link
                        key={i}
                        href={action.href}
                        aria-label={action.label}
                        className="inline-flex items-center text-sm font-medium text-white hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      >
                        {action.label}
                        <span aria-hidden="true" className="ml-1">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Noornest */}
      <section
        className="bg-accent px-6 md:px-12 lg:px-20 py-12 lg:py-20 w-full"
        aria-labelledby="why-noornest-heading"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12">
          {/* Left Column - Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <div>
              <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-4">
                Highlights
              </h3>
              <h2
                id="why-noornest-heading"
                className="text-3xl md:text-4xl font-bold text-primary leading-tight"
              >
                Why choose Noornest <br /> interiors
              </h2>
            </div>

            <ul
              role="list"
              className="list-disc text-gray-700 text-sm md:text-base pl-5 space-y-3 text-left"
            >
              <li role="listitem">
                <strong>Style Meets Function:</strong> Designs that look great
                and work in real life.
              </li>
              <li role="listitem">
                <strong>Value-Focused:</strong> Interiors that boost sales &
                rental appeal.
              </li>
              <li role="listitem">
                <strong>Tailored Packages:</strong> From budget-friendly
                furnishing to bespoke design.
              </li>
              <li role="listitem">
                <strong>Full Service:</strong> Design, sourcing, logistics, and
                setup handled for you.
              </li>
            </ul>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/explore" aria-label="Explore Noornest interiors">
                <Button>Explore</Button>
              </Link>

              <Link href="/get-started" aria-label="Get started with Noornest">
                <Button variant="ghost" className="flex items-center gap-2">
                  Get Started <ChevronRight size={18} aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Image collage */}
          <div
            className="relative w-full lg:w-1/2 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-md h-[420px] sm:h-[500px]">
              {/* Main Image */}
              <div className="w-[350px] h-[500px] shadow-2xl shadow-black rounded-2xl mx-auto">
                <Image
                  src="/services/why-3.png"
                  alt="Modern living room interior with cozy decor"
                  width={300}
                  height={500}
                  objectFit="cover"
                  className="rounded-2xl object-cover w-full h-full shadow-md mx-auto"
                />
              </div>

              {/* Top-right small image */}
              <Image
                src="/services/why-2.png"
                alt="Elegant classic room design"
                width={180}
                height={120}
                className="absolute top-4 right-0 rounded-xl object-cover shadow-md hidden sm:block"
              />

              {/* Bottom-left small image */}
              <Image
                src="/services/why-1.png"
                alt="Contemporary open space living area"
                width={200}
                height={120}
                className="absolute bottom-6 -left-12 rounded-xl object-cover shadow-md hidden sm:block"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-6 md:px-10 lg:px-20 text-center bg-white text-gray-900"
        aria-labelledby="pricing-heading"
      >
        <h3
          id="pricing-heading"
          className="text-lg tracking-wide text-black uppercase font-bold mb-4"
        >
          Investment
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
          Pricing
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Flexible design solutions for every budget and vision.
        </p>

        {/* Toggle */}
        <div
          role="tablist"
          aria-label="Billing Options"
          className="mt-6 inline-flex border border-gray-300 rounded-full overflow-hidden"
        >
          <button
            role="tab"
            aria-selected={!isYearly}
            tabIndex={isYearly ? -1 : 0}
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 text-sm font-medium transition ${
              !isYearly
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Monthly
          </button>
          <button
            role="tab"
            aria-selected={isYearly}
            tabIndex={isYearly ? 0 : -1}
            onClick={() => setIsYearly(true)}
            className={`px-5 py-2 text-sm font-medium transition ${
              isYearly
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Plans */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 shadow-sm bg-white p-8 flex flex-col justify-between focus-within:ring-2 focus-within:ring-primary transition hover:shadow-md"
              role="region"
              aria-labelledby={`plan-${i}`}
            >
              <div>
                <h4
                  id={`plan-${i}`}
                  className="text-lg font-semibold text-gray-900"
                >
                  {plan.title}
                </h4>
                <p className="mt-3 text-3xl font-bold text-primary">
                  {plan.price}
                </p>
                <ul className="mt-5 space-y-2 text-left text-gray-700">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-primary">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="mt-6" aria-label={plan.button}>
                {plan.button}
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/booking" aria-label="Book a Design Consultation">
          <Button
            className="mt-12 inline-block "
            aria-label="Book a Design Consultation"
          >
            Book a Design Consultation
          </Button>
        </Link>
      </section>

      <section
        className="bg-[#f5e8d5] py-20 px-6 md:px-10 lg:px-20"
        aria-labelledby="how-it-works-heading"
      >
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Section */}
          <div>
            <h3
              id="how-it-works-heading"
              className="text-lg tracking-wide text-black uppercase font-bold mb-4"
            >
              Process
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
              How It Works
            </h2>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button aria-label="Book a Free Consultation">
                Book a Free Consultation
              </Button>
              <Link
                href="#"
                className="flex items-center gap-2 text-gray-800 font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
                aria-label="Get Started"
              >
                Get Started{" "}
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex flex-col gap-10 lg:gap-14">
            {/* Vertical line for large screens */}
            <div
              className="absolute left-[14px] top-8 bottom-8 border-l border-gray-400 hidden lg:block"
              aria-hidden="true"
            ></div>

            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="relative z-10 flex-shrink-0">{step.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-gray-700 mt-1 text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialCarousel
        testimonials={salesTestimonials}
        title="Testimonial"
        backgroundColor="bg-purple-50"
        cardBackgroundColor="#EADBC8"
        primaryColor="#BFA14A"
        accentColor="#EADBC8"
      />

      <FAQSection title="Frequently Asked Questions" faqs={faqData} />

      {/* CTA Section */}
      <CTASection
        title="Ready to Sell with Confidence?"
        primaryButton={{
          text: "Book a consultation",
          href: "/properties",
          className:
            "bg-black hover:bg-black/90 hover:shadow-lg hover:shadow-black/25",
        }}
        backgroundColor="bg-primary"
        className="text-white"
        overlayClassName="bg-gradient-to-r from-black/40 to-black/60 backdrop-blur-sm"
      />

      <Newsletter />
    </>
  );
};

export default SalesMarketingPage;
