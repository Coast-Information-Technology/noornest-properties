"use client";

import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProperties } from "@/lib/mock-data";
import Link from "next/link";
import PropertyImage from "@/components/ui/PropertyImage";
import Image from "next/image";
import BlogInsightsSection from "@/components/blog/BlogInsightsSection";
import CTASection from "@/components/ui/CTASection";
import { motion } from "framer-motion";
import Newsletter from "@/components/layout/Newsletter";
import { BadgeCheck, ShieldCheck, BarChart3, Handshake } from "lucide-react";
import PropertySearchBox from "@/components/ui/PropertySearchBox";
import { useState } from "react";
import { formatPrice } from "@/utils/formatPrice";
import TopProperties from "@/components/property/TopProperties";

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "Verified ownership",
    desc: "Legal checks completed for every property.",
    link: "Learn",
  },
  {
    icon: <BadgeCheck className="w-10 h-10" />,
    title: "Due diligence",
    desc: "Comprehensive screening of each investment opportunity.",
    link: "Explore",
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    title: "Investment insights",
    desc: "Detailed yield and market potential analysis.",
    link: "Discover",
  },
  {
    icon: <Handshake className="w-10 h-10" />,
    title: "End-to-end support",
    desc: "Guidance from viewing to property completion.",
    link: "Connect",
  },
];

const blogPosts = [
  {
    id: 1,
    category: "Investment",
    readTime: "5 min read",
    title: "How to spot below-market deals",
    description: "Uncover hidden opportunities in the UK property market.",
    href: "#",
  },
  {
    id: 2,
    category: "Strategy",
    readTime: "7 min read",
    title: "Secure nest vs yield nest",
    description: "Comparing investment approaches for maximum returns.",
    href: "#",
  },
  {
    id: 3,
    category: "Market trends",
    readTime: "6 min read",
    title: "Emerging property markets in Europe",
    description: "Beyond the UK: where smart investors are looking.",
    href: "#",
  },
];

export default function PropertiesPage() {
  const [tab, setTab] = useState<"sale" | "rent">("sale");
  const properties = getProperties();

  const PropertyCard = ({ property }: { property: (typeof properties)[0] }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-300 pt-0">
      <div className="relative overflow-hidden rounded-t-lg">
        <PropertyImage
          src={property.images[0]}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {property.status}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {property.images.length} photos
          </Badge>
        </div>
      </div>

      <CardContent className="px-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {property.title}
            </h3>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} bed
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} bath
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.sqft} sq ft
            </div>
          </div>

          <div className="flex flex-col justify-between pt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-900">
                {property.agent.name}
              </p>
              <p className="text-xs text-gray-500">
                {property.agent.rating} ⭐ ({property.agent.reviews} reviews)
              </p>
            </div>

            <div className="flex item-center justify-between mt-2">
              <Button asChild>
                <Link
                  href={`/properties/${property.slug}`}
                  className="text-md p-4"
                >
                  View Details
                </Link>
              </Button>

              <div className="text-xl font-bold text-gray-900">
                {formatPrice(property.price)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Hero Section */}
      <section
        className="bg-primary text-white px-6 md:px-12 lg:px-24 py-16 flex flex-col items-center justify-between gap-12"
        aria-labelledby="hero-heading"
      >
        {/* Text Content */}
        <div className="flex flex-col lg:flex-row space-y-6 text-center lg:text-left lg:justify-between w-full">
          {/* Left */}
          <h1
            id="hero-heading"
            className="text-3xl md:text-5xl font-bold leading-tight text-white"
          >
            Discover verified <br />
            properties with <br />
            confidence
          </h1>

          {/* Right */}
          <div className="space-y-6">
            <p className="text-base md:text-lg text-gray-100 max-w-md mx-auto lg:mx-0">
              Browse a curated selection of properties across the UK. Each
              listing is meticulously vetted to ensure quality and potential.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link
                href="/properties"
                className="bg-white text-primary font-semibold px-5 py-2 rounded-lg shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white transition"
              >
                Explore
              </Link>
              <Link
                href="/consult"
                className="border border-white text-white font-semibold px-5 py-2 rounded-lg hover:bg-white/10 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white transition"
              >
                Consult
              </Link>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 relative w-full max-w-2xl mx-auto pb-16">
          {/* Large background image */}
          <div className="relative rounded-2xl overflow-hidden w-full h-[300px] lg:h-[400px]">
            <Image
              src="/properties/property-hero.png"
              alt="Front view of a modern UK house with garden"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay smaller image */}
          <div className="absolute -left-10 md:-left-16 top-8 md:top-10 w-1/2 sm:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src="/properties/property-hero-small.png"
              alt="Side view of a luxury property"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Search Box - Outside the carousel */}
      <PropertySearchBox
        onSearch={(searchData) => {
          console.log("Search submitted:", searchData);
          // Handle search logic here
        }}
        onTabChange={(newTab) => {
          setTab(newTab);
        }}
        initialTab={tab}
      />

      {/* Properties Section */}
      <section className="container mx-auto py-20 px-6 md:px-16">
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button size="lg">Load More Properties</Button>
        </div>
      </section>

      <TopProperties />

      {/* Why Choose Noornest */}
      <section
        aria-labelledby="why-noornest-heading"
        className="py-20 px-6 md:px-12 lg:px-20 bg-white text-gray-900"
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Trust
          </h3>
          <h2
            id="why-noornest-heading"
            className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3"
          >
            Why choose Noornest
          </h2>
          <p className="text-base text-gray-900">
            Reliable property investments backed by expert analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Feature Cards */}
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col justify-between p-6 bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 focus-within:ring-2 focus-within:ring-[#b89b49] outline-none"
                tabIndex={0}
                role="group"
              >
                <div>
                  <span className="text-3xl mb-3 block" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                </div>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-[#b89b49] transition-colors"
                  >
                    {item.link}
                    <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md"
          >
            <Image
              src="/properties/handshake.jpg"
              alt="Business handshake showing successful investment partnership"
              width={800}
              height={400}
              className="object-cover w-full h-64 lg:h-72"
              priority
            />
            <div className="p-6 bg-white flex flex-col justify-between h-full">
              <div>
                <p className="text-sm text-gray-500 mb-1">Proven</p>
                <h3 className="text-xl font-semibold mb-2">
                  Track record of successful investments
                </h3>
                <p className="text-sm text-gray-600">
                  Consistent performance and client satisfaction drive our
                  approach.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="#"
                  className="px-4 py-2 rounded-md bg-[#b89b49] text-white text-sm font-medium hover:bg-[#a5893f] transition-colors"
                >
                  Explore
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-[#b89b49] transition-colors"
                >
                  Details
                  <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BlogInsightsSection posts={blogPosts} viewAllHref="/blog" />

      {/* CTA Section */}
      <CTASection
        title="Create spaces that sell and inspire"
        description="Transform your property with design that adds real value and tells a compelling story."
        primaryButton={{
          text: "Consult an Expert",
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
}
