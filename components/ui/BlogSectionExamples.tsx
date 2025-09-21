// components/ui/BlogSectionExamples.tsx
// This file shows different ways to use the BlogSection component

import BlogSection from "./BlogSection";

// Sample blog posts data
const sampleBlogPosts = [
  {
    id: "1",
    title: "The Complete Guide to Property Investment in 2024",
    excerpt:
      "Discover the latest trends, strategies, and opportunities in the UK property market. Learn how to maximize your returns and build a successful investment portfolio.",
    category: "Investment",
    author: {
      name: "Sarah Johnson",
      avatar: "/img/placeholder-avatar.jpg",
    },
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    slug: "complete-guide-property-investment-2024",
    image: "/img/properties/peterborough/apt4/image-0-1024x1024.webp",
  },
  {
    id: "2",
    title: "BMV Properties: Finding Below Market Value Deals",
    excerpt:
      "Learn how to identify and secure below market value properties that offer excellent investment potential and higher returns on your capital.",
    category: "Tips",
    author: {
      name: "Michael Chen",
      avatar: "/img/placeholder-avatar.jpg",
    },
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    slug: "bmv-properties-finding-below-market-value-deals",
    image: "/img/properties/peterborough/apt4/image-1-1024x1024.webp",
  },
  {
    id: "3",
    title: "Market Analysis: London Property Trends Q1 2024",
    excerpt:
      "Get insights into the latest market movements, price changes, and emerging opportunities in London's property market this quarter.",
    category: "Market Trends",
    author: {
      name: "Emma Williams",
      avatar: "/img/placeholder-avatar.jpg",
    },
    publishedAt: "2024-01-10",
    readTime: "5 min read",
    slug: "market-analysis-london-property-trends-q1-2024",
    image: "/img/properties/peterborough/apt4/image-2-1024x1024.webp",
  },
];

// Example 1: Default blog section
export function DefaultBlogSection() {
  return (
    <BlogSection
      title="From Our Blog"
      subtitle="INSIGHTS"
      description="Stay informed with property insights, investment tips, and market updates."
      posts={sampleBlogPosts}
      viewAllHref="/blog"
      viewAllText="Read More Insights"
      maxPosts={3}
    />
  );
}

// Example 2: Investment-focused blog section
export function InvestmentBlogSection() {
  return (
    <BlogSection
      title="Investment Insights"
      subtitle="EDUCATION"
      description="Expert analysis and strategies to help you make informed property investment decisions."
      posts={sampleBlogPosts.filter((post) => post.category === "Investment")}
      viewAllHref="/blog/investment"
      viewAllText="View All Investment Articles"
      backgroundColor="bg-gradient-to-br from-primary/5 to-secondary/5"
      maxPosts={4}
    />
  );
}

// Example 3: Market trends blog section
export function MarketTrendsBlogSection() {
  return (
    <BlogSection
      title="Market Analysis"
      subtitle="TRENDS"
      description="Latest market insights, price movements, and regional property trends across the UK."
      posts={sampleBlogPosts}
      viewAllHref="/blog/market-trends"
      viewAllText="Explore Market Data"
      backgroundColor="bg-white"
      className="border-t border-b border-gray-200"
      maxPosts={6}
    />
  );
}

// Example 4: Tips and guides blog section
export function TipsBlogSection() {
  return (
    <BlogSection
      title="Property Tips & Guides"
      subtitle="RESOURCES"
      description="Practical advice, step-by-step guides, and insider tips from property experts."
      posts={sampleBlogPosts.filter((post) => post.category === "Tips")}
      viewAllHref="/blog/tips"
      viewAllText="Browse All Tips"
      backgroundColor="bg-gray-50"
      maxPosts={2}
    />
  );
}

// Example 5: News and updates blog section
export function NewsBlogSection() {
  return (
    <BlogSection
      title="Latest News & Updates"
      subtitle="NEWS"
      description="Stay up to date with the latest property news, regulatory changes, and industry updates."
      posts={sampleBlogPosts}
      viewAllHref="/blog/news"
      viewAllText="Read All News"
      backgroundColor="bg-gradient-to-r from-blue-50 to-indigo-50"
      maxPosts={5}
    />
  );
}

// Example 6: Compact blog section
export function CompactBlogSection() {
  return (
    <BlogSection
      title="Recent Articles"
      subtitle="BLOG"
      description="Our latest property insights and market analysis."
      posts={sampleBlogPosts.slice(0, 2)}
      viewAllHref="/blog"
      viewAllText="View All"
      backgroundColor="bg-white"
      className="py-12"
      maxPosts={2}
    />
  );
}

// Example 7: Dark themed blog section
export function DarkBlogSection() {
  return (
    <BlogSection
      title="Property Intelligence"
      subtitle="INSIGHTS"
      description="Deep dive into property market analysis, investment strategies, and market intelligence."
      posts={sampleBlogPosts}
      viewAllHref="/blog/intelligence"
      viewAllText="Explore Intelligence"
      backgroundColor="bg-gray-900"
      className="text-white"
      maxPosts={3}
    />
  );
}
