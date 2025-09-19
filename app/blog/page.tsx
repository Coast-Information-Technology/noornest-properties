import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, User, Search, Filter } from "lucide-react";
import { BlogPost, BlogCategory } from "@/types";

import {
  getBlogPosts,
  getBlogCategories,
  searchBlogPosts,
  paginatePosts,
} from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Real Estate Blog | Noornest Properties",
  description:
    "Expert insights, tips, and analysis on real estate investment, BMV properties, and market trends.",
  keywords: [
    "real estate blog",
    "property investment tips",
    "BMV analysis",
    "market trends",
    "real estate news",
  ],
  authors: [{ name: "Noornest Properties" }],
  creator: "Noornest Properties",
  publisher: "Noornest Properties",
  openGraph: {
    title: "Real Estate Blog | Noornest Properties",
    description:
      "Expert insights, tips, and analysis on real estate investment, BMV properties, and market trends.",
    url: "https://noornestproperties.com/blog",
    siteName: "Noornest Properties",
    images: [
      {
        url: "/blog/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest Properties Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Blog | Noornest Properties",
    description:
      "Expert insights, tips, and analysis on real estate investment, BMV properties, and market trends.",
    images: ["/blog/og-blog.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://noornestproperties.com/blog",
  },
};

export default function BlogPage() {
  // Get data from centralized mock data
  const allPosts = getBlogPosts();
  const categories = getBlogCategories();

  // Featured post (first post)
  const featuredPost = allPosts[0];
  const regularPosts = allPosts.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Real Estate Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Expert insights, tips, and analysis to help you make smarter real
          estate investment decisions.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
          </div>
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {allPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative h-64 lg:h-full">
                <img
                  src={allPosts[0].featuredImage}
                  alt={allPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {allPosts[0].categories.map((category) => (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      style={{
                        backgroundColor: category.color + "20",
                        color: category.color,
                      }}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3">{allPosts[0].title}</h3>
                <p className="text-muted-foreground mb-4">
                  {allPosts[0].excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{allPosts[0].author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(allPosts[0].publishedAt!).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/blog/${allPosts[0].slug}`}>Read Article</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: post.categories[0].color + "20",
                      color: post.categories[0].color,
                    }}
                  >
                    {post.categories[0].name}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.publishedAt!).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="group"
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow group-hover:scale-105">
                <div
                  className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name.charAt(0)}
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
            <p className="text-white/90 mb-6">
              Get the latest real estate insights and investment tips delivered
              to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
