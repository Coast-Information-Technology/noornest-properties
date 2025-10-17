"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { BlogPost, BlogCategory } from "@/types";

// import {
//   getBlogPosts,
//   getBlogCategories,
//   searchBlogPosts,
//   paginatePosts,
// } from "@/lib/mock-data";
import Image from "next/image";
import Newsletter from "@/components/layout/Newsletter";
import { Lightbulb, ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface BlogPost {
  id: number;
  category: string;
  readTime: string;
  title: string;
  description: string;
  image: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    category: "Investment",
    readTime: "5 min read",
    title: "Top 5 emerging property markets in UK",
    description:
      "Uncover strategic locations with high potential for capital growth and rental yields",
    image: "/blog/property-market.png",
  },
  {
    id: 2,
    category: "Market",
    readTime: "7 min read",
    title: "Navigating property investment risks",
    description:
      "Comprehensive guide to mitigating potential challenges in real estate investing",
    image: "/blog/property-investment.png",
  },
  {
    id: 3,
    category: "Design",
    readTime: "4 min read",
    title: "Renovation strategies for higher returns",
    description:
      "Smart upgrades that significantly increase property value and attract quality tenants",
    image: "/blog/renovation.png",
  },
  {
    id: 4,
    category: "Investment",
    readTime: "5 min read",
    title: "Top 5 emerging property markets in UK",
    description:
      "Uncover strategic locations with high potential for capital growth and rental yields",
    image: "/blog/property-market.png",
  },
  {
    id: 5,
    category: "Market",
    readTime: "7 min read",
    title: "Navigating property investment risks",
    description:
      "Comprehensive guide to mitigating potential challenges in real estate investing",
    image: "/blog/property-investment.png",
  },
  {
    id: 6,
    category: "Design",
    readTime: "4 min read",
    title: "Renovation strategies for higher returns",
    description:
      "Smart upgrades that significantly increase property value and attract quality tenants",
    image: "/blog/renovation.png",
  },
];

/**
 * Data for each property insight tab.
 */
const insightTabs = [
  {
    id: "uk-cities",
    label: "UK Cities",
    articles: [
      {
        title: "Top 5 UK Cities for Property Investment in 2025",
        subtitle: "Investment",
        description:
          "Detailed analysis of emerging markets with the highest potential for capital appreciation — from Manchester’s rental surge to Birmingham’s regeneration push.",
        image: "/blog/property-insights.png",
      },
      // {
      //   title: "How to Spot Below-Market Property Deals",
      //   subtitle: "Market Strategy",
      //   description:
      //     "Learn the insider signals that identify undervalued assets — from distressed sales to hidden-growth zones poised for transformation.",
      //   image: "/blog/property-insights.png",
      // },
      // {
      //   title: "Secure vs Yield: Choosing the Right Nest Plan",
      //   subtitle: "Investment Planning",
      //   description:
      //     "Compare long-term stability and high-yield short-term strategies to align your investment path with your financial goals.",
      //   image: "/blog/property-insights.png",
      // },
    ],
  },
  {
    id: "investment-trends",
    label: "Investment Trends",
    articles: [
      {
        title: "Emerging Real Estate Markets to Watch in 2025",
        subtitle: "Trends",
        description:
          "Explore the cities and asset classes expected to outperform in the coming year — from co-living spaces to suburban logistics hubs.",
        image: "/blog/property-insights.png",
      },
      // {
      //   title: "The Rise of Sustainable Property Investment",
      //   subtitle: "Green Investing",
      //   description:
      //     "Understand how ESG factors are reshaping property portfolios, driving investor demand for low-carbon, energy-efficient developments.",
      //   image: "/blog/property-insights.png",
      // },
      // {
      //   title: "AI-Driven Valuation: The Future of Real Estate Analysis",
      //   subtitle: "PropTech",
      //   description:
      //     "Discover how AI algorithms are transforming property appraisals and enabling smarter, data-led investment decisions.",
      //   image: "/blog/property-insights.png",
      // },
    ],
  },
  {
    id: "market-analysis",
    label: "Market Analysis",
    articles: [
      {
        title: "Quarterly Housing Market Overview — Q1 2025",
        subtitle: "Market Report",
        description:
          "Gain insights into price movements, rental yields, and mortgage trends shaping the UK housing sector in early 2025.",
        image: "/blog/property-insights.png",
      },
      // {
      //   title: "Regional Growth Hotspots: Beyond London",
      //   subtitle: "Location Insights",
      //   description:
      //     "Find out which regional cities are outperforming the capital — and why migration, infrastructure, and tech ecosystems matter.",
      //   image: "/blog/property-insights.png",
      // },
      // {
      //   title: "Investor Sentiment Index — What’s Driving Confidence?",
      //   subtitle: "Analytics",
      //   description:
      //     "Dive into survey-based data revealing how global and domestic investors view the 2025 property landscape.",
      //   image: "/blog/property-insights.png",
      // },
    ],
  },
];

/**
 * Data for each property experts tab.
 */
const propertyExperts = [
  {
    id: "investments",
    label: "Investments",
    articles: [
      {
        title: "James Richardson",
        subtitle: "Strategy",
        description:
          "Senior investment strategist with 15 years of experience in UK property markets",
        image: "/blog/james.png",
      },
      // {
      //   title: "How to Spot Below-Market Property Deals",
      //   subtitle: "Market Strategy",
      //   description:
      //     "Learn the insider signals that identify undervalued assets — from distressed sales to hidden-growth zones poised for transformation.",
      //   image: "/blog/property-insights.png",
      // },
      // {
      //   title: "Secure vs Yield: Choosing the Right Nest Plan",
      //   subtitle: "Investment Planning",
      //   description:
      //     "Compare long-term stability and high-yield short-term strategies to align your investment path with your financial goals.",
      //   image: "/blog/property-insights.png",
      // },
    ],
  },
  {
    id: "market",
    label: "Market",
    articles: [
      {
        title: "Emerging Real Estate Markets to Watch in 2025",
        subtitle: "Trends",
        description:
          "Explore the cities and asset classes expected to outperform in the coming year — from co-living spaces to suburban logistics hubs.",
        image: "/blog/property-insights.png",
      },
      // {
      //   title: "The Rise of Sustainable Property Investment",
      //   subtitle: "Green Investing",
      //   description:
      //     "Understand how ESG factors are reshaping property portfolios, driving investor demand for low-carbon, energy-efficient developments.",
      //   image: "/blog/property-insights.png",
      // },
      // {
      //   title: "AI-Driven Valuation: The Future of Real Estate Analysis",
      //   subtitle: "PropTech",
      //   description:
      //     "Discover how AI algorithms are transforming property appraisals and enabling smarter, data-led investment decisions.",
      //   image: "/blog/property-insights.png",
      // },
    ],
  },
  {
    id: "design",
    label: "Design",
    articles: [
      {
        title: "Quarterly Housing Market Overview — Q1 2025",
        subtitle: "Market Report",
        description:
          "Gain insights into price movements, rental yields, and mortgage trends shaping the UK housing sector in early 2025.",
        image: "/blog/property-insights.png",
      },
      // {
      //   title: "Regional Growth Hotspots: Beyond London",
      //   subtitle: "Location Insights",
      //   description:
      //     "Find out which regional cities are outperforming the capital — and why migration, infrastructure, and tech ecosystems matter.",
      //   image: "/blog/property-insights.png",
      // },
      // {
      //   title: "Investor Sentiment Index — What’s Driving Confidence?",
      //   subtitle: "Analytics",
      //   description:
      //     "Dive into survey-based data revealing how global and domestic investors view the 2025 property landscape.",
      //   image: "/blog/property-insights.png",
      // },
    ],
  },
];

/**
 * Category data – dynamic mapping between sidebar items and content.
 */
const sidebarSubItems = [
  {
    label: "Investment strategies",
    title: "Investment Strategies",
    headline: "Investment strategies deep dive",
    description:
      "Comprehensive analysis of investment approaches tailored for modern property investors",
  },
  {
    label: "Property buying",
    title: "Property Buying",
    headline: "Master the Art of Property Investment",
    description:
      "Explore tailored propery buying designed to maximize returns in today’s evolving real estate market. From long-term holds to short-term flips, discover what fits your goals.",
  },
  {
    label: "Market trends",
    title: "Market Analysis",
    headline: "Stay Ahead with Market Insights",
    description:
      "Understand the latest real estate trends, regional performance indicators, and data-driven insights shaping property investment decisions.",
  },
  {
    label: "Refurbishment",
    title: "Refurbishment & Design",
    headline: "Transform Properties with Design",
    description:
      "Enhance property value through thoughtful design and renovation strategies that appeal to modern tenants and buyers.",
  },
  {
    label: "Guides",
    title: "Guides & Articles",
    headline: "Step-by-Step Learning Resources",
    description:
      "Access in-depth how-to guides, expert articles, and actionable advice to navigate every stage of your property journey.",
  },
];

/**
 * Sidebar sub-item component.
 */
const SidebarSubItem = ({
  label,
  isActive,
  onClick,
  isFirst,
  isLast,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const baseClasses =
    "py-4 px-6 text-left font-medium cursor-pointer transition-colors duration-200";
  const goldColor = "bg-primary";
  let classes = baseClasses;

  if (isActive) {
    classes += " bg-white text-primary";
  } else {
    classes += ` ${goldColor} text-white hover:bg-yellow-700`;
  }

  if (isFirst) classes += " rounded-tl-xl";
  if (isLast) classes += " rounded-bl-xl";

  return (
    <div className={classes} onClick={onClick}>
      {label}
    </div>
  );
};

export default function BlogPage() {
  // Get data from centralized mock data
  // const allPosts = getBlogPosts();
  // const categories = getBlogCategories();

  // // Featured post (first post)
  // const featuredPost = allPosts[0];
  // const regularPosts = allPosts.slice(1);

  // Initialize with first item active
  const [activeItem, setActiveItem] = useState(sidebarSubItems[0]);
  const [activeTab, setActiveTab] = useState("uk-cities");
  const [activeTab2, setActiveTab2] = useState("investments");

  const activeContent =
    insightTabs.find((tab) => tab.id === activeTab)?.articles || [];

  const expertsContent =
    propertyExperts.find((tab) => tab.id === activeTab2)?.articles || [];

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
              Insights that empower your <br /> property journey
            </h1>
            <p className="text-base text-white max-w-2xl mb-8">
              Stay ahead with Noornest&apos;s expert articles, guides, and
              market insights. From property investment strategies to design
              trends, our blog helps you make smarter decisions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20">
              {/* Using text-white for buttons for contrast against the gold/gray-700 */}
              <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors duration-300">
                Subscribe
              </Button>
              <Button variant="ghost">Learn more</Button>
            </div>
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

      <section className="bg-background py-12 lg:py-16 px-8 md:px-16 w-full">
        <div className="text-center lg:text-left mb-10 mt-8">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Blog
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Latest Property Insights
          </h2>
          <p className="text-gray-600 mb-8">
            Discover expert analysis and strategic property investment content
          </p>
        </div>
        {/* Blog Posts Grid */}
        <div className="space-y-8 mb-12">
          {/* Responsive Grid */}
          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-[#bda053]"
                role="article"
                tabIndex={0}
              >
                {/* Image */}
                <div className="relative w-full h-[250px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="font-medium bg-gray-200 text-black px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#bda053] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <button
                    className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-[#bda053] focus:outline-none cursor-pointer"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read more
                    <ChevronRight className="w-4 h-4 mt-[1px]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <Link href="/blog" className="flex justify-center">
          <Button>View All Posts</Button>
        </Link>
      </section>

      <section className="bg-background text-center py-12 lg:py-16 px-8 md:px-16 w-full">
        <div className="text-center lg:text-left mb-10 mt-8">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Categories
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Explore Property Insights
          </h2>
          <p className="text-gray-600 mb-8">
            Navigate through curated content designed for property investors and
            enthusiasts.
          </p>
        </div>

        {/* Main Content */}
        <div className="shadow-2xl rounded-xl bg-white overflow-hidden">
          <div className="lg:grid lg:grid-cols-3">
            {/* Sidebar */}
            <div className="col-span-1 hidden lg:block">
              {/* <div className="py-4 px-6 text-left text-lg font-semibold text-gray-800 border-b border-gray-200">
                {activeItem.title}
              </div> */}
              <div className="bg-primary">
                {sidebarSubItems.map((item, index) => (
                  <SidebarSubItem
                    key={item.label}
                    label={item.label}
                    isActive={activeItem.label === item.label}
                    onClick={() => setActiveItem(item)}
                    isFirst={index === 0}
                    isLast={index === sidebarSubItems.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-2 p-8 md:p-12 text-left">
              <div className="flex items-start mb-6">
                <Lightbulb
                  className="w-8 h-8 md:w-10 md:h-10 text-black mr-4 mt-1"
                  fill="black"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 leading-snug">
                    {activeItem.headline}
                  </h3>
                  <p className="mt-2 text-gray-600">{activeItem.description}</p>
                </div>
              </div>

              {/* Explore + Learn */}
              <div className="mt-8 flex items-center">
                <Button
                  className="inline-flex items-center justify-center 
                bg-primary hover:bg-accent text-black 
                font-semibold py-3 px-6 rounded shadow transition-all duration-300"
                >
                  Explore
                </Button>

                <Link
                  href="#"
                  className="inline-flex items-center text-gray-800 font-semibold ml-6 group"
                >
                  Learn
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Property Insights Section */}
      <section className="bg-accent text-center py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="max-w-5xl mx-auto gap-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Featured
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Top Property Insights
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
            Curated articles that provide strategic perspectives on property
            investment.
          </p>

          {/* Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {insightTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 font-medium transition-all duration-300 text-sm ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-black hover:text-gray-700 border-b-2 border-black hover:border-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          {activeContent.map((article, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row items-center justify-center lg:justify-between border-gray-400 border rounded-[10px] mt-8 overflow-hidden"
            >
              {/* Left Image */}
              <div className="w-full h-[300px] lg:w-1/2 lg:h-[500px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Text */}
              <div className="text-center lg:text-left px-12 w-full pt-8 lg:pt-0 lg:w-1/2">
                <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-4 md:mb-8">
                  {article.subtitle}
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-8 md:max-w-lg mx-auto lg:mx-0">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 justify-center lg:justify-start mb-8">
                  <Link href="/about">
                    <Button>Discover</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost">Research</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white text-center py-12 lg:py-20 px-8 md:px-16 w-full min-h-screen">
        <div className="max-w-5xl mx-auto gap-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Featured
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Get Exclusive Property Insights
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
            Stay ahead with our curated newsletter packed with strategic
            investment intelligence.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#">
              <Button aria-label="Learn more about our privacy policy">
                Subscribe
              </Button>
            </Link>

            <Link href="#">
              <Button variant="ghost" aria-label="Contact us">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full h-[300px] md:h-[500px] rounded-[20px] mt-8">
          <Image
            src="/blog/property-insights-2.png"
            alt="Image representing scope of responsibility"
            width={1200}
            height={400}
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
      </section>

      {/* Meet Our Property Specialists Section */}
      <section className="bg-accent text-center py-12 lg:py-20 px-8 md:px-16 w-full">
        <div className="max-w-5xl mx-auto gap-12">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Experts
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Meet Our Property Specialists
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl mx-auto">
            Experience professional delivering insights from years of market
            research and investment.
          </p>
          <div className="flex items-center justify-center gap-8 mb-8">
            <Button>View</Button>
            <Link href="#" className="flex items-center gap-3">
              Connect <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {propertyExperts.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab2(tab.id)}
                className={`p-2 font-medium transition-all duration-300 text-sm ${
                  activeTab2 === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-black hover:text-gray-700 border-b-2 border-black hover:border-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          {expertsContent.map((article, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row items-center justify-center lg:justify-between border-gray-400 border rounded-[10px] mt-8 overflow-hidden"
            >
              {/* Left Image */}
              <div className="text-center lg:text-left px-12 w-full pt-8 lg:pt-0 lg:w-1/2">
                <h3 className="text-lg tracking-wide text-black uppercase font-bold mb-4 md:mb-8">
                  {article.subtitle}
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-4">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-8 md:max-w-lg mx-auto lg:mx-0">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 justify-center lg:justify-start mb-8">
                  <Link href="/about">
                    <Button>Profile</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost">Contact</Button>
                  </Link>
                </div>
              </div>

              {/* Right Text */}
              <div className="w-full h-[300px] lg:w-1/2 lg:h-[500px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover top-0"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <Newsletter />
    </>
  );
}
