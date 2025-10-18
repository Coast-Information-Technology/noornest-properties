"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
  image?: string;
}

interface BlogInsightsSectionProps {
  title?: string;
  subtitle?: string;
  posts: BlogPost[];
  viewAllHref?: string;
}

export default function BlogInsightsSection({
  title = "Property investment insights",
  subtitle = "Expert articles to guide your investment strategy.",
  posts,
  viewAllHref = "#",
}: BlogInsightsSectionProps) {
  return (
    <section
      className="w-full bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="blog-insights-heading"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm font-semibold text-gray-800 mb-2">Blog</p>
        <h2
          id="blog-insights-heading"
          className="text-3xl sm:text-4xl font-semibold text-primary mb-3"
        >
          {title}
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mb-12">{subtitle}</p>
      </div>

      {/* Blog cards grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-primary"
          >
            {/* Image */}
            <div className="relative w-full h-52 bg-gray-200">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  <span>Image Placeholder</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{post.description}</p>

              <Link
                href={post.href}
                aria-label={`Read more about ${post.title}`}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Read more
                <span aria-hidden="true" className="ml-1">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Link href={viewAllHref} aria-label="View all blog posts">
          <Button className="px-6 py-2">
            View all
          </Button>
        </Link>
      </div>
    </section>
  );
}
