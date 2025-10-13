"use client";

import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  Verified,
  BadgeCheck,
  ChartColumn,
  ArrowRight,
  Linkedin,
  Twitter,
  Dribbble,
  Instagram,
  Facebook,
  Search,
  HomeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CTASection from "@/components/ui/CTASection";
import { Parallax } from "@/components/parallax/Parallax";
import Newsletter from "@/components/layout/Newsletter";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import { fadeInUp } from "@/lib/animations";

// Meet Our Teams
type SocialLinks = {
  linkedin?: string;
  twitter?: string;
  dribbble?: string;
  instagram?: string;
  facebook?: string;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socials?: SocialLinks;
};

const team: TeamMember[] = [
  {
    name: "James Carter",
    role: "Founder and CEO",
    bio: "Property veteran with 15 years of market experience.",
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Sarah Thompson",
    role: "Chief Investment Officer",
    bio: "Expert in strategic property investments and market analysis.",
    socials: {
      linkedin: "#",
      twitter: "#",
      dribbble: "#",
    },
  },
  {
    name: "Michael Wong",
    role: "Head of Technology",
    bio: "Innovative tech leader transforming real estate platforms.",
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Emma Roberts",
    role: "Head of Customer Experience",
    bio: "Dedicated to creating seamless, transparent property journeys.",
    socials: {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
    },
  },
  {
    name: "David Kumar",
    role: "Head of Partnerships",
    bio: "Building strategic connections across the UK property ecosystem.",
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Rachel Green",
    role: "Head of Market Research",
    bio: "Providing deep insights into property trends and opportunities.",
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      facebook: "#",
    },
  },
];

// Core Principes Starts here
const principles = [
  {
    title: "Integrity",
    description: "We do things right. No shortcuts, no compromises.",
    image: "/about/image.png",
  },
  {
    title: "Clarity",
    description:
      "We make complex property decisions simple and understandable.",
    image: "/about/image2.png",
  },
  {
    title: "Innovation",
    description:
      "We constantly develop smarter tools for modern real estate markets.",
    image: "/about/image3.png",
  },
  {
    title: "Trust",
    description:
      "We start in the UK but think and plan for a worldwide impact.",
    image: "/about/image4.png",
  },
];

const leftContent = {
  label: "Values",
  heading: "Our Core Principles",
  description: "The foundation of everything we do.",
  primaryCta: {
    href: "/about",
    label: "Learn more",
  },
  secondaryCta: {
    href: "/approach",
    label: "Our approach →",
  },
};

//Core Principles Ends here

const AboutPage = () => {
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
                  Simplifying Property in the <br />
                  UK and Beyond
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
                  At Noornest, we make it simple to find, buy, manage, or invest
                  in properties. Starting in the UK, we’re building a platform
                  trusted by individuals, agents, and investors across the
                  globe.
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
                  <Link href="/properties">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">Browse Properties</span>
                    <span className="sm:hidden">Browse</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto text-sm"
                >
                  <Link href="/tools/bmv-analyzer">
                    <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">
                      Explore Investment Plans
                    </span>
                    <span className="sm:hidden">Investment Plans</span>
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Hero Image */}
          <div className="flex justify-center w-full h-[250px] md:max-w-[60vw] lg:h-[400px] mx-auto rounded-[10px] lg:rounded-[20px] px-8">
            <Image
              src="/about/about-hero.png"
              alt="simplified properties in the UK"
              width={500}
              height={300}
              className="object-cover w-full h-full rounded-[20px]"
            />
          </div>
        </div>
      </section>
      {/* Our Mission */}
      <section className="bg-amber-50 py-20 px-6 md:px-16 text-center lg:mt-16">
        <div className="w-full md:max-w-4xl mx-auto">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Our Mission
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Making property simple, secure, and smarter for everyone.
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl">
            We remove complexity from real estate with verified listings, clear
            processes, and flexible investment options — so customers can make
            confident decisions, wherever they are.
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
      {/* Our Story */}
      <section className="w-full py-20 px-6 md:px-16 relative flex justify-center lg:justify-start ">
        <div className="flex flex-col lg:flex-row items-center md:items-start gap-12">
          {/* Left Section */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-lg tracking-wide text-black uppercase font-bold">
              Story
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
              Our Story
            </h2>
            <p className="text-gray-600 mb-2 max-w-lg">
              Noornest was founded to tackle the challenges of property
              discovery and investment in the UK. Too often, buyers and
              investors struggled with unreliable listings, hidden costs, and
              limited trust.
            </p>
            <p className="text-gray-600 mb-8 max-w-lg">
              We set out to change that — beginning with the UK market and
              building toward a global platform that empowers people everywhere
              to approach property with confidence.
            </p>
          </div>
          <div className="w-full h-[300px] md:w-[500px] md:h-[300px] rounded-[10px] overflow-hidden">
            <Image
              src="/our-story-image.png"
              alt="Our Story"
              width={400}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
      {/* What We Do */}
      <section className="bg-amber-50 py-20 px-6 md:px-16 text-center">
        <div className="w-full md:max-w-4xl mx-auto">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            services
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            What We Do
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl">
            Comprehensive property solutions for every need.
          </p>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <BadgeCheck size={60} />
              <h4 className="font-bold text-lg">Verified properties</h4>
              <p>
                Each listing meticulously checked for accuracy and compliance.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <ChartColumn size={60} />
              <h4 className="font-bold text-lg">Smart investment</h4>
              <p>
                Each listing meticulously checked for accuracy and compliance.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <Verified size={60} />
              <h4 className="font-bold text-lg">Verified properties</h4>
              <p>
                Each listing meticulously checked for accuracy and compliance.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center mt-8">
            <Link href="/services">
              <Button>Explore services</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Contact us</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Why Choose Noornest */}
      <section className="py-20 px-6 md:px-16 text-center">
        <div className="w-full mx-auto">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            why us
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Why Choose Noornest
          </h2>
          <p className="text-gray-600 mb-12 md:max-w-3xl mx-auto">
            We deliver more than just property solutions. We provide a trusted,
            transparent path to your real estate goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-stretch">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center gap-4 p-4">
              <BadgeCheck
                size={60}
                className="text-[#bfa34a]"
                aria-hidden="true"
              />
              <h4 className="font-bold text-lg text-gray-900">
                Verified & Trusted Listings
              </h4>
              <p className="text-gray-600">
                Every property is rigorously verified, ensuring authenticity and
                compliance with UK regulations.
              </p>
            </div>

            {/* Image (spans 2 columns and 2 rows on large screens) */}
            <div className="lg:col-span-2 lg:row-span-2 flex justify-center items-center order-first md:order-none">
              <div className="relative w-full max-w-[500px] h-[300px] md:h-[400px] rounded-[12px] overflow-hidden shadow-lg">
                <Image
                  src="/our-story-image.png"
                  alt="Our Story — verified property listings"
                  width={500}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center gap-4 p-4">
              <ChartColumn
                size={60}
                className="text-[#bfa34a]"
                aria-hidden="true"
              />
              <h4 className="font-bold text-lg text-gray-900">
                Transparent & Easy Processes
              </h4>
              <p className="text-gray-600">
                Clear, straightforward steps from discovery to investment.
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center gap-4 p-4">
              <Verified
                size={60}
                className="text-[#bfa34a]"
                aria-hidden="true"
              />
              <h4 className="font-bold text-lg text-gray-900">
                Investment Options for All Levels
              </h4>
              <p className="text-gray-600">
                Investment plans tailored to different financial profiles.
              </p>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center text-center gap-4 p-4">
              <Verified
                size={60}
                className="text-[#bfa34a]"
                aria-hidden="true"
              />
              <h4 className="font-bold text-lg text-gray-900">
                Expert Guidance & Support
              </h4>
              <p className="text-gray-600">
                Professional guidance at every stage of your property journey.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center mt-8">
            <Link href="/services">
              <Button>Explore services</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Contact us</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Our Growing Footprint */}
      <section
        aria-labelledby="impact-heading"
        className="bg-primary text-black py-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h3
              className="text-lg tracking-wide text-black uppercase font-bold"
              id="impact-heading"
            >
              Impact
            </h3>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-3">
              Our Growing Footprint
            </h2>

            <p className="text-base text-gray-900">
              Numbers that tell our story of trust and expansion.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-12 lg:justify-start justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
                className="px-5 py-2 bg-white text-black font-medium rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black transition-colors hover:bg-gray-100 cursor-pointer"
                aria-label="Explore our impact metrics"
              >
                Explore impact
              </motion.button>

              <Link
                href="#achievements"
                className="flex items-center gap-2 font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black rounded-md px-2 cursor-pointer"
                aria-label="View our achievements"
              >
                Our achievements <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="grid grid-cols-2 gap-x-10 gap-y-8 justify-items-center lg:justify-items-start"
          >
            {/* Metric 1 */}
            <div className="flex flex-col border-l border-black pl-4">
              <CountUp
                end={500}
                suffix="+"
                duration={2.5}
                className="text-4xl md:text-5xl font-bold text-white"
              />

              <span className="text-md font-medium mt-1">
                Verified properties
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col border-l border-black pl-4">
              <CountUp
                end={1000}
                suffix="+"
                duration={2.5}
                className="text-4xl md:text-5xl font-bold text-white"
              />

              <span className="text-md font-medium mt-1">Active users</span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col border-l border-black pl-4">
              <CountUp
                end={150}
                suffix="+"
                duration={2.5}
                className="text-4xl md:text-5xl font-bold text-white"
              />

              <span className="text-md font-medium mt-1">
                Agent partnerships
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col border-l border-black pl-4">
              <CountUp
                end={50}
                suffix="+"
                duration={2.5}
                className="text-4xl md:text-5xl font-bold text-white"
              />

              <span className="text-md font-medium mt-1">
                UK cities covered
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Our Team */}
      <section
        id="team"
        className="bg-white py-20 px-6 sm:px-10 md:px-16 text-center"
        aria-labelledby="team-heading"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-14"
        >
          <p className="text-sm text-gray-600 font-medium mb-2">Team</p>
          <h2
            id="team-heading"
            className="text-3xl md:text-4xl font-semibold text-[#b9974a]"
          >
            Our team
          </h2>
          <p className="text-gray-700 mt-2">
            The people driving our vision forward.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Placeholder Image */}
              <div
                className="w-24 h-24 rounded-full bg-gray-200 mb-4"
                role="img"
                aria-label={`${member.name}'s profile image`}
              ></div>

              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-700">{member.role}</p>
              <p className="text-sm text-gray-600 mt-2 max-w-xs">
                {member.bio}
              </p>

              {/* Conditional Social Icons */}
              <div className="flex items-center justify-center space-x-4 mt-4">
                {member.socials?.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-gray-700 hover:text-[#b9974a] focus:outline-none focus:ring-2 focus:ring-[#b9974a] rounded-full p-1"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.socials?.twitter && (
                  <a
                    href={member.socials.twitter}
                    aria-label={`${member.name} on X`}
                    className="text-gray-700 hover:text-[#b9974a] focus:outline-none focus:ring-2 focus:ring-[#b9974a] rounded-full p-1"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                {member.socials?.dribbble && (
                  <a
                    href={member.socials.dribbble}
                    aria-label={`${member.name} on Dribbble`}
                    className="text-gray-700 hover:text-[#b9974a] focus:outline-none focus:ring-2 focus:ring-[#b9974a] rounded-full p-1"
                  >
                    <Dribbble size={18} />
                  </a>
                )}
                {member.socials?.instagram && (
                  <a
                    href={member.socials.instagram}
                    aria-label={`${member.name} on Instagram`}
                    className="text-gray-700 hover:text-[#b9974a] focus:outline-none focus:ring-2 focus:ring-[#b9974a] rounded-full p-1"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {member.socials?.facebook && (
                  <a
                    href={member.socials.facebook}
                    aria-label={`${member.name} on Facebook`}
                    className="text-gray-700 hover:text-[#b9974a] focus:outline-none focus:ring-2 focus:ring-[#b9974a] rounded-full p-1"
                  >
                    <Facebook size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Our Core Principles */}
      <Parallax principles={principles} leftContent={leftContent} />;
      {/* CTA Section */}
      <CTASection
        title="Your Property Journey Starts Here"
        primaryButton={{
          text: "Browse Properties",
          href: "/properties",
          className:
            "bg-black hover:bg-black/90 hover:shadow-lg hover:shadow-black/25",
        }}
        secondaryButton={{
          text: "Talk to an Advisor",
          href: "/booking",
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

export default AboutPage;
