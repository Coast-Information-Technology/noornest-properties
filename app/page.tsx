"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  TrendingUp,
  Shield,
  Users,
  Calculator,
  Star,
  ArrowRight,
  CheckCircle,
  HomeIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedList from "@/components/ui/AnimatedList";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
// import PropertyImage from "@/components/ui/PropertyImage";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  slideInFromBottom,
} from "@/lib/animations";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const heroImages = ["/hero-img.png", "/hero-img2.webp", "/hero-img3.webp"];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [tab, setTab] = useState<"sale" | "rent">("sale");
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  // Auto-play effect
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
      }, 3000); // change every 5 seconds
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <main>
      {/* Hero Section */}
      <section className="flex flex-col">
        {/* Top Content Section */}
        <div className="bg-background py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div>
              <AnimatedSection
                variants={fadeInUp}
                className="space-y-8 flex items-center space-between"
              >
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit mx-auto">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Smart Real Estate Investment
                  </Badge>
                  <AnimatedText
                    as="h1"
                    className="text-4xl lg:text-5xl font-bold tracking-tight text-primary"
                    delay={0.2}
                  >
                    Making Property Simple, Secure & Smarter
                  </AnimatedText>
                </div>
                <div>
                  <AnimatedText
                    as="p"
                    className="text-xl text-muted-foreground max-w-3xl mx-auto"
                    delay={0.4}
                  >
                    Discover verified properties and tailored investment
                    opportunities with Noornest — all in one trusted platform.
                  </AnimatedText>

                  <AnimatedSection
                    className="flex flex-col sm:flex-row gap-4 mt-4"
                    delay={0.6}
                  >
                    <Button
                      asChild
                      variant="ghost"
                      size="lg"
                      className="text-md p-4"
                    >
                      <Link href="/properties">
                        <Search className="w-5 h-5 mr-2" />
                        Browse Properties
                      </Link>
                    </Button>
                    <Button asChild size="lg" className="text-md p-4">
                      <Link href="/tools/bmv-analyzer">
                        <HomeIcon className="w-5 h-5 mr-2" />
                        Explore Investment Plans
                      </Link>
                    </Button>
                  </AnimatedSection>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Background Image Carousel Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        {/* Carousel Images */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {heroImages.map((image, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image
                src={image}
                alt={`Property ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        {/* Controls */}
        <button
          onClick={() => {
            setIsPaused(true);
            prevSlide();
          }}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-md p-2 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary z-20"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={() => {
            setIsPaused(true);
            nextSlide();
          }}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-md p-2 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary z-20"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsPaused(true);
                setCurrent(index);
              }}
              onMouseLeave={() => setIsPaused(false)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Search Box */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-[40] w-full px-4">
          <div className="rounded-lg shadow-lg w-full max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="flex w-fit justify-center gap-3 mx-auto">
              <button
                onClick={() => setTab("sale")}
                className={`flex-1 px-8 rounded-t-[10px] text-center font-medium ${
                  tab === "sale"
                    ? "border-b-2 bg-white border-primary text-primary"
                    : "text-gray-500 bg-black/70"
                } focus:outline-none`}
                aria-pressed={tab === "sale"}
              >
                For Sale
              </button>
              <button
                onClick={() => setTab("rent")}
                className={`flex-1 px-8 rounded-t-[10px] text-center font-medium w-full ${
                  tab === "rent"
                    ? "border-b-2 bg-white border-primary text-primary"
                    : "text-gray-500 bg-black/70"
                } focus:outline-none`}
                aria-pressed={tab === "rent"}
              >
                For Rent
              </button>
            </div>

            {/* Form */}
            <form
              className="flex flex-col sm:flex-row items-end justify-center gap-3 p-4 bg-white rounded-[10px] w-full"
              role="search"
              aria-label="Property search"
            >
              <div className="flex flex-col gap-2">
                <label aria-description="search keyword" htmlFor="keyword">
                  Search Keyword
                </label>
                <input
                  id="keyword"
                  type="text"
                  placeholder="Search Keyword"
                  className="w-full sm:w-48 lg:w-56 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label aria-description="location" htmlFor="location">
                  Location
                </label>
                <select
                  id="location"
                  className="w-full sm:w-40 lg:w-48 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                >
                  <option>All Cities</option>
                  <option>London</option>
                  <option>Manchester</option>
                  <option>Birmingham</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label aria-description="bedrooms" htmlFor="bedrooms">
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  className="w-full sm:w-36 lg:w-44 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                >
                  <option>Any Bedrooms</option>
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3+ Bedrooms</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label aria-description="budget" htmlFor="budget">
                  Budget
                </label>
                <select
                  id="budget"
                  className="w-full sm:w-36 lg:w-44 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                >
                  <option>Max. Price (£)</option>
                  <option>£500 – £1,000</option>
                  <option>£1,000 – £5,000</option>
                  <option>£5,000+</option>
                </select>
              </div>

              <Button variant="ghost">
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              </Button>

              <Button type="submit">
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>Search</span>
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div>
          <h3 className="text-xl lg:text-2xl font-bold">Featured Properties</h3>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Discover Your Next Properties
          </h2>
          <p>
            Explore some of the standout homes and investments available now.
            Every listing on Noornest is verified for security and transparency.
          </p>
          <Link href="/properties">
            <Button size="lg" className="text-md p-4">
              View all properties
            </Button>
          </Link>
        </div>
        <div></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center space-y-4 mb-16">
            <AnimatedText as="h2" className="text-3xl lg:text-4xl font-bold">
              Why Choose Noornest Properties?
            </AnimatedText>
            <AnimatedText
              as="p"
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              delay={0.2}
            >
              We combine cutting-edge technology with real estate expertise to
              help you make informed investment decisions.
            </AnimatedText>
          </AnimatedSection>

          <AnimatedList
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            itemVariants={staggerItem}
          >
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Advanced BMV Analysis</CardTitle>
                <CardDescription>
                  Our proprietary algorithm analyzes market data to identify
                  below-market-value properties with high investment potential.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Verified Properties</CardTitle>
                <CardDescription>
                  All properties are thoroughly verified by our team of real
                  estate professionals to ensure accuracy and legitimacy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>
                  Get detailed market analysis, trends, and investment
                  recommendations to maximize your returns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Expert Support</CardTitle>
                <CardDescription>
                  Access to experienced real estate agents and investment
                  advisors to guide your decisions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Diverse Portfolio</CardTitle>
                <CardDescription>
                  Browse through residential, commercial, and land properties
                  across various markets and price ranges.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Proven Results</CardTitle>
                <CardDescription>
                  Join thousands of successful investors who have used our
                  platform to find profitable investment opportunities.
                </CardDescription>
              </CardHeader>
            </Card>
          </AnimatedList>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-white">
            <AnimatedText
              as="h2"
              className="text-3xl lg:text-4xl font-bold mb-4"
            >
              Ready to Start Your Investment Journey?
            </AnimatedText>
            <AnimatedText
              as="p"
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              delay={0.2}
            >
              Join thousands of successful investors and discover your next
              profitable property investment today.
            </AnimatedText>
            <AnimatedSection
              className="flex flex-col sm:flex-row gap-4 justify-center"
              delay={0.4}
            >
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                <Link href="/tools/bmv-analyzer">
                  <Calculator className="w-5 h-5 mr-2" />
                  Analyze Property Now
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/properties">
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Browse Properties
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
