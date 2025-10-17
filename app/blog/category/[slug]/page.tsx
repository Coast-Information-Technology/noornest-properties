import { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { getBlogCategories, getBlogPostsByCategory } from "@/lib/mock-data";
import type { BlogPost, BlogCategory } from "@/types";

const mockCategories: BlogCategory[] = getBlogCategories();

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = mockCategories.find((cat) => cat.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found | Noornest Properties Blog",
    };
  }

  return {
    title: `${category.name} Articles | Noornest Properties Blog`,
    description: category.description,
    keywords: [
      category.name.toLowerCase(),
      "real estate blog",
      "property investment",
    ],
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = mockCategories.find((cat) => cat.slug === params.slug);
  if (!category) {
    notFound();
  }

  // Typed posts from data source (matches the shared BlogPost type)
  const categoryPosts: BlogPost[] = getBlogPostsByCategory(params.slug);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/blog" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </Button>
      </div>

      {/* Category Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="flex justify-center">
          <Badge
            className="text-lg px-6 py-2"
            style={{
              backgroundColor: category.color + "20",
              color: category.color,
            }}
          >
            {category.name}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold">{category.name} Articles</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {category.description}
        </p>
        <p className="text-muted-foreground">
          {categoryPosts.length} article{categoryPosts.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>

      {/* Articles Grid */}
      {categoryPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPosts.map((post: BlogPost) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || ""}
                  alt={post.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: category.color + "20",
                      color: category.color,
                    }}
                  >
                    {category.name}
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
                    <span>{formatDate(post.publishedAt || "")}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${post.slug}`}>Read Article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-6">
            There are no articles in this category yet. Check back soon for new
            content!
          </p>
          <Button asChild>
            <Link href="/blog">Browse All Articles</Link>
          </Button>
        </div>
      )}

      {/* Other Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Other Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockCategories
            .filter((cat) => cat.slug !== params.slug)
            .map((otherCategory) => (
              <Link
                key={otherCategory.id}
                href={`/blog/category/${otherCategory.slug}`}
                className="group"
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow group-hover:scale-105">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: otherCategory.color }}
                  >
                    {otherCategory.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold mb-1">{otherCategory.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {otherCategory.description}
                  </p>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
