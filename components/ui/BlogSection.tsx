"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  slug: string;
  image: string;
}

export interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  posts: BlogPost[];
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
  backgroundColor?: string;
  maxPosts?: number;
}

export default function BlogSection({
  title = "From Our Blog",
  subtitle = "INSIGHTS",
  description = "Stay informed with property insights, investment tips, and market updates.",
  posts,
  viewAllHref = "/blog",
  viewAllText = "Read More Insights",
  className = "",
  backgroundColor = "bg-[#F5F1EB]",
  maxPosts = 3,
}: BlogSectionProps) {
  const displayPosts = posts.slice(0, maxPosts);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      className={`py-12 px-6 md:px-16 md:py-16 ${backgroundColor} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <AnimatedText
              as="h3"
              className="text-lg tracking-wide text-black uppercase font-bold"
            >
              {subtitle}
            </AnimatedText>
            <AnimatedText
              as="h2"
              className="text-2xl md:text-3xl font-bold text-primary mb-2"
              delay={0.1}
            >
              {title}
            </AnimatedText>
            <AnimatedText
              as="p"
              className="text-gray-700 text-sm leading-relaxed max-w-md"
              delay={0.2}
            >
              {description}
            </AnimatedText>
          </div>

          <div className="mt-4 lg:mt-0">
            <AnimatedSection delay={0.3}>
              <Button
                asChild
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm rounded-lg"
              >
                <Link href={viewAllHref}>{viewAllText}</Link>
              </Button>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <div className="bg-[#F5F1EB] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, index) => (
            <AnimatedSection
              key={post.id}
              delay={0.1 * index}
              className="group"
            >
              <Card className="bg-[#F5F1EB] rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 pt-0 cursor-pointer">
                {/* Image */}
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent>
                  <div className="space-y-3">
                    {/* Category */}
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1"
                    >
                      {post.category}
                    </Badge>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center space-x-2 pt-1">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(post.publishedAt)} • {post.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
