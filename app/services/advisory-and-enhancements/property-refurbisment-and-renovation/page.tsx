"use client";

import Newsletter from "@/components/layout/Newsletter";
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/ui/CTASection";
import { refurbishmentTestimonials } from "@/data/testimonials";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Palette,
  Home,
  ClipboardCheck,
  ChevronRight,
  MessageSquare,
  Brush,
  Bath,
  Building2,
  Zap,
} from "lucide-react";
import FAQSection from "@/components/ui/FAQSection";

const services = [
  {
    id: 1,
    icon: <Brush className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "Cosmetic Refurbishments",
    description:
      "Painting, flooring, and finishing touches that refresh and modernize your property.",
    image: "/services/cosmetic-refurbishment.jpg",
    actions: [
      {
        label: "View Projects",
        href: "/refurbishment-projects",
        variant: "primary",
      },
      { label: "Get Quote", href: "/quote", variant: "link" },
    ],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-3",
  },
  {
    id: 2,
    icon: <Bath className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "Interior Upgrades",
    description:
      "Kitchens, bathrooms, and living spaces redesigned for comfort and value.",
    image: "/services/interior-upgrades.jpg",
    actions: [
      { label: "Explore Designs", href: "/designs", variant: "primary" },
    ],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    id: 3,
    icon: <Building2 className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "Structural Renovations",
    description:
      "Extensions, loft conversions, and major layout transformations handled seamlessly.",
    image: "/services/structural-renovations.jpg",
    actions: [
      { label: "Start Project", href: "/start-project", variant: "primary" },
    ],
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-3",
  },
  {
    id: 4,
    icon: <Zap className="w-10 h-10 text-white" aria-hidden="true" />,
    title: "Energy Efficiency Improvements",
    description:
      "Upgrades like insulation, double glazing, and eco-friendly systems for sustainable living.",
    image: "/services/energy-efficiency.jpg",
    actions: [{ label: "Learn More", href: "/energy", variant: "primary" }],
    rowSpan: "md:row-span-2",
  },
  {
    id: 5,
    icon: (
      <ClipboardCheck className="w-10 h-10 text-white" aria-hidden="true" />
    ),
    title: "Project Management",
    description:
      "End-to-end supervision and contractor coordination to ensure smooth delivery.",
    image: "/services/project-management.jpg",
    actions: [{ label: "View Process", href: "/process", variant: "primary" }],
    rowSpan: "md:row-span-2",
  },
];

const faqData = [
  {
    question: "Do you handle both small refurbishments and large renovations?",
    answer:
      "Yes, we cover everything from cosmetic updates to structural projects.",
  },
  {
    question: "Do you provide project management?",
    answer: "Yes, all packages include end-to-end project supervision.",
  },
  {
    question: "Can you work within my budget?",
    answer: "We create tailored solutions based on your budget and goals.",
  },
  {
    question: "Do you handle planning permissions?",
    answer: "Yes, we manage applications and compliance for structural works.",
  },
  {
    question: "Is the consultation free?",
    answer: "Yes, your first consultation is free and carries no obligation.",
  },
];

const steps = [
  {
    icon: (
      <MessageSquare className="w-7 h-7 text-yellow-700" aria-hidden="true" />
    ),
    title: "Consult & Plan",
    desc: "Share your goals, budget, and timeline.",
  },
  {
    icon: <Palette className="w-7 h-7 text-yellow-700" aria-hidden="true" />,
    title: "Design & Build",
    desc: "We coordinate contractors and deliver quality work.",
  },
  {
    icon: <Home className="w-7 h-7 text-yellow-700" aria-hidden="true" />,
    title: "Enjoy or Sell",
    desc: "Move in, rent out, or list your upgraded property.",
  },
];

const PropertyRefurbishmentPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const monthlyPlans = [
    {
      title: "Refurbishment Essentials",
      subtitle: "For minor upgrades",
      price: "£3,000",
      features: [
        "Painting & flooring refresh",
        "Kitchen & bathroom updates",
        "Compliance checks",
      ],
      button: "Start now",
    },
    {
      title: "Investor Upgrade Package",
      subtitle: "For landlords & rentals",
      price: "£8,000",
      features: [
        "Full flat/house refurbishment",
        "Fixtures & fittings upgrades",
        "Energy efficiency improvements",
        "Ready-to-rent finish",
      ],
      button: "Explore package",
    },
    {
      title: "Premium Renovation Package",
      subtitle: "For major projects",
      price: "Custom",
      features: [
        "Structural changes (extensions, conversions)",
        "Full project management",
        "Bespoke design & build",
        "Dedicated renovation consultant",
      ],
      button: "Get started",
    },
  ];

  const yearlyPlans = [
    {
      title: "Refurbishment Essentials",
      subtitle: "For minor upgrades",
      price: "From £3,000",
      features: [
        "Painting & flooring refresh",
        "Kitchen & bathroom updates",
        "Compliance checks",
      ],
      button: "Start now",
    },
    {
      title: "Investor Upgrade Package",
      subtitle: "For landlords & rentals",
      price: "From £8,000",
      features: [
        "Full flat/house refurbishment",
        "Fixtures & fittings upgrades",
        "Energy efficiency improvements",
        "Ready-to-rent finish",
      ],
      button: "Explore package",
    },
    {
      title: "Premium Renovation Package",
      subtitle: "For major projects",
      price: "Custom pricing",
      features: [
        "Structural changes (extensions, conversions)",
        "Full project management",
        "Bespoke design & build",
        "Dedicated renovation consultant",
      ],
      button: "Get started",
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
              Transform Your Property, <br />
              Maximize Its Value
            </h1>
            <p className="text-base text-white max-w-2xl mb-8">
              From cosmetic updates to full-scale renovations, Noornest delivers
              professional refurbishment services that enhance comfort, style,
              and long-term value.
            </p>
            <Link
              href="/booking"
              className="flex justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"
            >
              <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors duration-300">
                Book a renovation consultation
              </Button>
            </Link>
          </div>

          {/* Image Section - Positioned relative to the main content flow, pulled down to overlap */}
          <div className="flex justify-center">
            <div className="w-[90%] md:w-[80%] h-[500px] max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden mx-auto">
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
          Refurbishment beyond aesthetics
        </h2>
        <p className="text-gray-600 md:max-w-3xl mx-auto">
          Refurbishment and renovation are more than aesthetics — they’re about
          adding value and future-proofing your property. Whether you’re
          preparing to sell, rent, or simply modernize, Noornest ensures every
          project is done with quality and transparency.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px] mt-8">
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
                        className="inline-block bg-[#b9974a] hover:bg-[#a7843e] text-white text-sm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
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
                <strong>Trusted Experts:</strong> Vetted contractors and skilled
                craftsmen.
              </li>
              <li role="listitem">
                <strong>End-to-End Service:</strong> From planning to delivery.
              </li>
              <li role="listitem">
                <strong>Increase Property Value:</strong> Boost resale and
                rental yields.
              </li>
              <li role="listitem">
                <strong>Compliance Guaranteed:</strong> Work meets UK building
                regulations and safety codes.
              </li>
            </ul>
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
          Refurbishment
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
          Pricing
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Transparent packages for every type of project
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
        testimonials={refurbishmentTestimonials}
        title="Testimonial"
        backgroundColor="bg-purple-50"
        cardBackgroundColor="#EADBC8"
        primaryColor="#BFA14A"
        accentColor="#EADBC8"
      />

      <FAQSection title="Frequently Asked Questions" faqs={faqData} />

      {/* CTA Section */}
      <CTASection
        title="Ready to Upgrade your property with Noornest?"
        description="Transform your property with design that adds real value and tells a compelling story."
        primaryButton={{
          text: "Book a consultation",
          href: "/booking",
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

export default PropertyRefurbishmentPage;
