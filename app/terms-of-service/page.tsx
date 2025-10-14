"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  FileWarning,
  Settings,
  PhoneCallIcon,
} from "lucide-react";
import Newsletter from "@/components/layout/Newsletter";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { fadeInUp } from "@/lib/animations";
import AnimatedText from "@/components/ui/AnimatedText";
import { BsEnvelope, BsPhoneFill } from "react-icons/bs";
import { TbLocationFilled } from "react-icons/tb";

const cards = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-black" aria-hidden="true" />,
    title: "Age requirements",
    description:
      "Users must be 18 years or older with verified personal information.",
    actions: [
      { label: "Verify", href: "/verify", variant: "default" },
      { label: "Learn more", href: "/requirements", variant: "link" },
    ],
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-black" aria-hidden="true" />,
    title: "Investor verification process",
    description: "Must provide accurate and truthful information.",
    actions: [{ label: "Details", href: "/verification", variant: "link" }],
  },
  {
    icon: <Shield className="w-10 h-10 text-black" aria-hidden="true" />,
    title: "Compliance standards",
    description: "KYC and AML verification ensures platform integrity.",
    actions: [{ label: "Review", href: "/compliance", variant: "link" }],
  },
];

// Data structure for the right-side sections
const rightSections = [
  {
    title: "Personal details",
    description:
      "We collect names, contact information, and identification documents to verify your identity and provide services.",
    imageSrc: "/privacy-policy/investment-1.jpg", // Replace with your actual image path
    altText:
      "Modern housing development showing a clear, well-maintained environment.",
    id: "risk-levels",
  },
  {
    title: "Performance Insights",
    description:
      "Our detailed reports offer a view of the past performance of each plan's historical data while considering your investment horizon.",
    imageSrc: "/privacy-policy/investment-2.jpg", // Replace with your actual image path
    altText: "A white house on a sunny day with cars parked in the driveway.",
    id: "performance-insights",
  },
  {
    title: "Investment Minimums",
    description:
      "We set minimum investment thresholds to each plan, ensuring that you can start investing at a level that suits your purse. Detailed information on these can be found in our FAQ section.",
    imageSrc: "/privacy-policy/investment-3.jpg", // Replace with your actual image path
    altText:
      "A close-up view of the roof and front facade of a new suburban home.",
    id: "investment-minimums",
  },
  {
    title: "Get Started",
    description: "Minimum investment thresholds apply as disclosed per plan.",
    imageSrc: "/privacy-policy/investment-4.jpg", // Replace with your actual image path
    altText:
      "A close-up view of the roof and front facade of a new suburban home.",
    id: "investment-minimums",
  },
];

const features = [
  {
    id: 1,
    icon: ShieldAlert, // Replace with your actual icon component or SVG/Emoji
    title: "Service usage",
    description:
      "Platform may be used for personal and business property transactions.",
    linkText: "Details",
    linkHref: "/service-details",
    ariaLabel: "Service usage details",
  },
  {
    id: 2,
    icon: FileWarning,
    title: "Prohibited actions",
    description:
      "Users must not engage in fraudulent or unlawful platform activities.",
    linkText: "Learn more",
    linkHref: "/prohibited-actions",
    ariaLabel: "Learn more about prohibited actions",
  },
  {
    id: 3,
    icon: Settings,
    title: "Account management",
    description:
      "Noorvest reserves rights to suspend accounts for terms violations.",
    linkText: "Review",
    linkHref: "/account-review",
    ariaLabel: "Review account management policy",
  },
];

const responsibilitySections = [
  {
    title: "Client responsibilities",
    description:
      "Users must complete independent due diligence before property transactions.",
  },
  {
    title: "Fee disclosure",
    description:
      "All service fees will be clearly communicated before agreement.",
  },
  {
    title: "Transparency",
    description:
      "Complete financial information provided upfront for user understanding.",
  },
];

const accountTermination = [
  {
    id: 1,
    title: "User options",
    description:
      "Users can close accounts at any time through platform settings.",
  },
  {
    id: 2,
    title: "Platform rights",
    description:
      "Noornest reserves right to terminate access for terms violations.",
  },
  {
    id: 3,
    title: "Ongoing obligations",
    description:
      "Certain financial and confidentiality requirements persist after account closure.",
  },
];

const TermsOfServicePage = () => {
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
                src="/terms/terms-hero.jpg"
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
                  Terms of Service
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-gray-100 mb-12 max-w-2xl">
                  These terms govern your use of Noornest's property and
                  investment platform. By accessing our services, you agree to
                  these binding conditions.
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
          Our terms
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          About Our Terms
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Noornest provides a transparent UK-first property investment platform
          designed to ensure clarity and fairness for all users.
        </p>
      </section>
      {/* Legal Section */}
      <section className="bg-accent text-center py-12 lg:py-16 px-8 md:px-16 w-full">
        <h3 className="text-lg tracking-wide text-black uppercase font-bold">
          Legal
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
          User Eligibility
        </h2>
        <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
          Clear rules for platform access and participation.
        </p>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between items-start text-left border border-black/40 rounded-xl p-6 sm:p-8 bg-accent hover:scale-3d transition-colors duration-300 focus-within:ring-2 focus-within:ring-yellow-700 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
              role="group"
              tabIndex={0}
            >
              {/* Icon + Title */}
              <div>
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                {card.actions.map((action, i) =>
                  action.variant === "default" ? (
                    <Link key={i} href={action.href} aria-label={action.label}>
                      <Button className="bg-[#b9974a] hover:bg-[#a7843e] text-white focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        {action.label}
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      key={i}
                      href={action.href}
                      aria-label={action.label}
                      className="inline-flex items-center text-sm font-medium text-black hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
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
          ))}
        </div>
      </section>
      {/* Use of Services Section */}
      <section
        className="w-full bg-white text-black py-16"
        aria-labelledby="use-of-services-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[50%_50%] gap-10 items-center">
          {/* Left: Image */}
          <div className="order-2 lg:order-1 flex justify-center h-[400px] lg:h-[500px] w-full">
            <Image
              src="/terms/usage.png"
              alt="Residential property exterior"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl object-cover"
              priority
            />
          </div>

          {/* Right: Text and Features */}
          <div className="order-1 lg:order-2 space-y-8">
            <h2
              id="use-of-services-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Use of Services
            </h2>

            <ul className="space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li
                    key={feature.id}
                    className="flex items-start gap-4"
                    role="listitem"
                  >
                    <div className="flex-shrink-0 p-2 rounded-md bg-gray-100">
                      <Icon
                        className="w-6 h-6 text-black"
                        aria-hidden="true"
                        focusable="false"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-700 mb-2">
                        {feature.description}
                      </p>
                      <Link
                        href={feature.linkHref}
                        aria-label={feature.ariaLabel}
                        className="inline-flex items-center text-sm font-medium text-black hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        {feature.linkText}
                        <span aria-hidden="true" className="ml-1">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      {/* Property Verification Section */}
      <section className="bg-amber-100/50 min-h-screen py-16 md:py-20 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Section: Header Content */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
            <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-2">
              Services
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
              Property verification process
            </h2>
            <p className="text-gray-600 mb-8 md:max-w-3xl mx-autoo">
              Noorvest conducts thorough property checks while maintaining
              transparent standards.
            </p>
            <div className="flex justify-center items-center space-x-6">
              {/* CTA Button */}
              <Link href="/verify-now">
                <Button>Verify</Button>
              </Link>
              {/* Learn More Link */}
              <Link href="/learn-more-verification">
                <Button variant="ghost">
                  Learn more
                  <span className="ml-2" aria-hidden="true">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Section: Two-Column Layout (Text Left, Image Right) */}
          {/* On mobile, stacks vertically. On medium screens and up, becomes two columns. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Left Column: Text Content */}
            <div className="pr-0 md:pr-8 lg:pr-12">
              {" "}
              {/* Add some right padding on larger screens */}
              {responsibilitySections.map((section, index) => (
                <div
                  key={index}
                  className={`py-6 ${
                    index < responsibilitySections.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  {/* WCAG: Use appropriate heading levels (h2 here as sub-sections to the main h1) */}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {section.title}
                  </h2>
                  <p className="text-base text-gray-700">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-200 rounded-xl shadow-lg overflow-hidden">
              <Image
                src="/terms/property-verification.png"
                alt="A modern, detached house with a beige facade, white window frames, and solar panels on the roof."
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
                priority // Prioritize loading for this main image
              />
            </div>
          </div>
        </div>
      </section>
      {/* Investment Plans Section */}
      <section className="relative min-h-screen bg-white">
        <div className="container mx-auto max-w-7xl lg:flex">
          {/* 1. Left Column (Sticky on large screens, standard on mobile) */}
          <div className="lg:w-1/2 px-6 pt-16 pb-12 md:p-12 lg:p-16 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center">
            <div className="max-w-xl lg:mx-auto lg:pl-10">
              {/* Context/Category */}
              <h3 className="text-lg tracking-wide text-black uppercase font-bold">
                Invest
              </h3>

              {/* Title (WCAG: Ensure sufficient heading contrast) */}
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
                Investment Plans
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
                At <span className="font-bold">Noorvest</span>, we offer a range
                of investment plans tailored to suit various risk appetites,
                choose from Equity First, Yield Next, Secure Bound and
                Opportunity Nest to start your wealth growth journey.
              </p>

              {/* Call to Action Button/Link (WCAG: Clear focus state, good contrast) */}
              <Link href="/start-investing">
                <Button className="inline-flex items-center justify-center px-8 py-6  shadow-lg">
                  Start Now
                </Button>
              </Link>

              {/* "Learn More" Link (Optional) */}
              <Link href="/learn-more">
                <Button
                  variant="ghost"
                  className="ml-4 py-6 text-base font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:underline"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* 2. Right Column (Scrollable content) */}
          <div className="lg:w-1/2 overflow-y-auto">
            {rightSections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className="relative h-screen flex flex-col justify-end p-6 md:px-12 md:py-20"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  {/* WCAG: Images must have relevant alt text for context */}
                  {/* Next/Image optimizes loading */}
                  <Image
                    src={section.imageSrc}
                    alt={section.altText}
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    priority={index === 0} // Prioritize first image for faster loading
                  />
                  {/* Dark overlay for contrast over text (WCAG 1.4.3) */}
                  <div
                    className="absolute inset-0 bg-black opacity-60"
                    aria-hidden="true"
                  ></div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 max-w-md text-white">
                  {/* Title (WCAG: Correct heading level (h2) for sectional content) */}
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                    {section.title}
                  </h2>
                  {/* Description */}
                  <p className="text-lg sm:text-xl font-light">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Intellectual Section */}
      <section className="bg-accent text-center py-20 px-8 md:px-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between max-w-5xl mx-auto gap-12">
          {/* Left Column */}
          <div className="w-full h-[300px] lg:w-[400px] lg:h-[400px] rounded-[10px]">
            <Image
              src="/terms/intellectual-property.png"
              alt="Image representing intellectual property"
              width={400}
              height={500}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          {/* Right Column */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-8">
              Legal
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
              Intellectual Property Right
            </h2>
            <ul
              role="list"
              className="list-disc mb-12 pl-5 space-y-2 text-gray-600 text-left"
            >
              <li role="listItem">
                All content on the site (text, graphics, logos, etc.) is owned
                by Noornest.
              </li>
              <li role="listItem">
                You may not reproduce or distribute content without written
                consent.
              </li>
            </ul>
            <div className="flex items-center gap-4 justify-center lg:justify-start mb-8">
              <Link href="/about">
                <Button>Learn more</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost">Contact us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Liability Section */}
      <section className="bg-white text-center py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="max-w-5xl mx-auto gap-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Risk
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Liability limits
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
            Noornest provides services on a best-effort basis.
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between border-accent border-2 rounded-[10px]">
            {/* Left Column */}
            <div className="text-center lg:text-left px-12 w-full pt-8 lg:pt-0 lg:w-1/2">
              <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-4 md:mb-8">
                Caution
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                Scope of responsibility
              </h2>
              <ul
                role="list"
                className="list-disc mb-12 pl-5 space-y-2 text-gray-600 text-left"
              >
                <li role="listItem">
                  We are not liable for losses arising from market conditions,
                  investment risks, or third-party actions.
                </li>
                <li role="listItem">
                  Liability limited to the extent permitted by UK law.
                </li>
              </ul>
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-8">
                <Link href="/about">
                  <Button>Understand</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost">Learn more</Button>
                </Link>
              </div>
            </div>
            {/* Right Column */}
            <div className="w-full h-[300px] lg:w-1/2 lg:h-[500px] rounded-r-[10px]">
              <Image
                src="/terms/scope-of-responsibility.png"
                alt="Image representing scope of responsibility"
                width={400}
                height={500}
                className="w-full h-full object-cover rounded-r-[10px]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Account Termination Section */}
      <section className="bg-amber-100/50 min-h-screen py-16 md:py-20 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Section: Header Content */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
            <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-2">
              Accounts
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
              Account Termination Guidelines
            </h2>
            <p className="text-gray-600 mb-8 md:max-w-3xl mx-autoo">
              Clear process for account management and potential closure.
            </p>
            <div className="flex justify-center items-center space-x-6">
              {/* CTA Button */}
              <Link href="/verify-now">
                <Button>Manage</Button>
              </Link>
              {/* Learn More Link */}
              <Link href="/learn-more-verification">
                <Button variant="ghost">
                  Details
                  <span className="ml-2" aria-hidden="true">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Section: Two-Column Layout (Text Left, Image Right) */}
          {/* On mobile, stacks vertically. On medium screens and up, becomes two columns. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Left Column: Text Content */}
            <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gray-200 rounded-xl shadow-lg overflow-hidden">
              <Image
                src="/terms/contract-termination.png"
                alt="A modern, detached house with a beige facade, white window frames, and solar panels on the roof."
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
                priority
              />
            </div>

            {/* Right Column: Image */}
            <div className="pr-0 md:pr-8 lg:pr-12">
              {" "}
              {/* Add some right padding on larger screens */}
              {accountTermination.map((section, id) => (
                <div
                  key={id}
                  className={`py-6 ${
                    id < accountTermination.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }`}
                >
                  {/* WCAG: Use appropriate heading levels (h2 here as sub-sections to the main h1) */}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {section.title}
                  </h2>
                  <p className="text-base text-gray-700">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Legal Jurisdiction Section */}
      <section className="bg-accent text-center py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between max-w-5xl mx-auto gap-12">
          {/* Left Column */}
          <div className="w-full h-[300px] lg:w-1/2 lg:h-[400px] rounded-[10px]">
            <Image
              src="/terms/governing-juridiction.png"
              alt="Image representing intellectual property"
              width={400}
              height={500}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          {/* Right Column */}
          <div className="text-center lg:text-left w-full lg:w-1/2">
            <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-4 md:mb-8">
              Legal
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
              Governing Jurisdiction
            </h2>
            <p className="mb-4">
              Comprehensive legal framework for platform operations.
            </p>
            <ul
              role="list"
              className="list-disc mb-12 pl-5 space-y-2 text-gray-600 text-left"
            >
              <li role="listItem">
                These Terms are governed by the laws of England & Wales.
              </li>
              <li role="listItem">
                Disputes subject to UK courts’ exclusive jurisdiction.
              </li>
            </ul>
            <div className="flex items-center gap-4 justify-center lg:justify-start mb-8">
              <Link href="/about">
                <Button>Review</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost">Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Terms Modification Section */}
      <section className="bg-white text-center py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="max-w-5xl mx-auto gap-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Updates
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Terms modification
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
            Periodic review of platform guidelines.
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between border-accent border-2 rounded-[10px]">
            {/* Left Column */}
            <div className="text-center lg:text-left px-12 pt-8 lg:pt-0 w-full lg:w-1/2">
              <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-4 lg:mb-8">
                Notice
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                Change management
              </h2>
              <p className="mb-8">
                Users will be notified of significant terms modifications.
              </p>
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-8">
                <Link href="/about">
                  <Button>Review</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost">Learn </Button>
                </Link>
              </div>
            </div>
            {/* Right Column */}
            <div className="w-full h-[300px] lg:w-1/2 lg:h-[400px] rounded-r-[10px]">
              <Image
                src="/terms/terms-modification.png"
                alt="Image representing scope of responsibility"
                width={400}
                height={500}
                className="w-full h-full object-cover rounded-r-[10px]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Contact */}
      <section className="bg-background pb-20">
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
                Reach out
              </AnimatedText>
              <AnimatedText
                as="h2"
                className="text-3xl lg:text-[2.5rem] font-bold tracking-tight text-primary leading-tight"
                delay={0.2}
              >
                Contact us
              </AnimatedText>
              <AnimatedText as="p">
                We’re here to help you with any questions, feedback, or
                partnership opportunities.
              </AnimatedText>
            </div>
          </div>

          {/* Description + Buttons */}
          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <Link href="mailto:legal@noornest.co.uk">
                <AnimatedText
                  as="p"
                  className="text-sm text-gray-700 flex max-w-4xl mx-auto leading-relaxed px-4"
                  delay={0.2}
                >
                  <BsEnvelope className="w-5 h-5" />
                  <span>
                    <p>Email</p>
                    <p>legal@noornest.co.uk</p>
                  </span>
                </AnimatedText>
              </Link>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 max-w-4xl mx-auto leading-relaxed px-4"
                delay={0.2}
              >
                <PhoneCallIcon className="w-5 h-5" />
                Phone
                <span>+44 703 239 2232</span>
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-sm text-gray-700 max-w-4xl mx-auto leading-relaxed px-4"
                delay={0.2}
              >
                <TbLocationFilled className="w-5 h-5" />
                Office
                <span>London, UK</span>
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
      <Newsletter />
    </main>
  );
};

export default TermsOfServicePage;
