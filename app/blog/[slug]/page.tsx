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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { BlogPost } from "@/types";

import { getBlogPostBySlug, getRelatedPosts } from "@/lib/mock-data";

// Mock data - in real app, this would come from API
const mockPost: BlogPost = {
  id: "1",
  title: "10 Essential Tips for First-Time Real Estate Investors",
  slug: "10-essential-tips-first-time-real-estate-investors",
  excerpt:
    "Discover the fundamental strategies that every new real estate investor should know before making their first purchase.",
  content: {
    time: 1642248000000,
    blocks: [
      {
        id: "1",
        type: "header",
        data: {
          text: "Introduction to Real Estate Investment",
          level: 2,
        },
      },
      {
        id: "2",
        type: "paragraph",
        data: {
          text: "Real estate investment can be one of the most rewarding ways to build wealth over time. However, for first-time investors, the process can seem overwhelming. This comprehensive guide will walk you through the essential tips and strategies you need to know before making your first property investment.",
        },
      },
      {
        id: "3",
        type: "header",
        data: {
          text: "1. Start with Education",
          level: 3,
        },
      },
      {
        id: "4",
        type: "paragraph",
        data: {
          text: "Before investing a single dollar, invest in your education. Understanding the fundamentals of real estate investment is crucial for long-term success.",
        },
      },
      {
        id: "5",
        type: "list",
        data: {
          style: "ordered",
          items: [
            "Read books by successful real estate investors",
            "Take online courses on property investment",
            "Attend local real estate investment meetups",
            "Follow industry blogs and podcasts",
            "Learn about local market conditions",
          ],
        },
      },
      {
        id: "6",
        type: "header",
        data: {
          text: "2. Set Clear Investment Goals",
          level: 3,
        },
      },
      {
        id: "7",
        type: "paragraph",
        data: {
          text: "Define what you want to achieve with your real estate investments. Are you looking for monthly cash flow, long-term appreciation, or tax benefits?",
        },
      },
      {
        id: "8",
        type: "quote",
        data: {
          text: "The best investment on earth is earth itself. - Louis Glickman",
          caption: "Real Estate Investment Philosophy",
        },
      },
      {
        id: "9",
        type: "header",
        data: {
          text: "3. Build Your Team",
          level: 3,
        },
      },
      {
        id: "10",
        type: "paragraph",
        data: {
          text: "Real estate investment is not a solo endeavor. You'll need a team of professionals to help you succeed.",
        },
      },
      {
        id: "11",
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Real estate agent specializing in investment properties",
            "Property manager (if investing out of state)",
            "Real estate attorney",
            "Accountant familiar with real estate tax laws",
            "Contractor for property renovations",
            "Insurance agent",
          ],
        },
      },
      {
        id: "12",
        type: "header",
        data: {
          text: "4. Analyze the Numbers",
          level: 3,
        },
      },
      {
        id: "13",
        type: "paragraph",
        data: {
          text: "Every investment decision should be based on solid financial analysis. Use our BMV Analyzer tool to evaluate potential properties.",
        },
      },
      {
        id: "14",
        type: "table",
        data: {
          withHeadings: true,
          content: [
            ["Metric", "Target", "Why It Matters"],
            ["Cash Flow", "Positive", "Ensures property pays for itself"],
            ["Cap Rate", "8%+", "Indicates good return on investment"],
            [
              "Cash-on-Cash Return",
              "12%+",
              "Measures return on your cash investment",
            ],
            [
              "Debt Service Coverage Ratio",
              "1.25+",
              "Shows ability to cover mortgage payments",
            ],
          ],
        },
      },
      {
        id: "15",
        type: "header",
        data: {
          text: "5. Start Small and Scale",
          level: 3,
        },
      },
      {
        id: "16",
        type: "paragraph",
        data: {
          text: "Begin with a single property to learn the ropes before expanding your portfolio. This approach minimizes risk while building experience.",
        },
      },
      {
        id: "17",
        type: "header",
        data: {
          text: "Conclusion",
          level: 2,
        },
      },
      {
        id: "18",
        type: "paragraph",
        data: {
          text: "Real estate investment success comes from education, careful planning, and consistent execution. Start with these fundamentals, and you'll be well on your way to building a profitable real estate portfolio.",
        },
      },
    ],
  },
  featuredImage: "/blog/real-estate-tips.jpg",
  author: {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@noornest.com",
    avatar: "/authors/sarah-johnson.jpg",
    bio: "Senior Real Estate Analyst with 10+ years experience helping investors build successful portfolios.",
  },
  categories: [
    {
      id: "1",
      name: "Investment Tips",
      slug: "investment-tips",
      color: "#3B82F6",
    },
    {
      id: "2",
      name: "Beginner Guide",
      slug: "beginner-guide",
      color: "#10B981",
    },
  ],
  tags: [
    { id: "1", name: "Real Estate", slug: "real-estate" },
    { id: "2", name: "Investment", slug: "investment" },
    { id: "3", name: "Tips", slug: "tips" },
    { id: "4", name: "Beginner", slug: "beginner" },
  ],
  status: "published",
  publishedAt: "2024-01-15T10:00:00Z",
  seo: {
    title:
      "10 Essential Tips for First-Time Real Estate Investors | Noornest Properties",
    description:
      "Learn the fundamental strategies every new real estate investor needs to know. Expert tips from industry professionals.",
    keywords: [
      "real estate investment",
      "first time investor",
      "property investment tips",
      "real estate guide",
    ],
    ogImage: "/blog/real-estate-tips-og.jpg",
  },
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z",
};

// Get related posts from centralized data
const relatedPosts = getRelatedPosts(mockPost.id, 2);

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  // In real app, fetch post data here
  const post = mockPost; // This would be fetched from API

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      images: [
        post.seo.ogImage || post.featuredImage || "/blog/default-og.jpg",
      ],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: [
        post.seo.ogImage || post.featuredImage || "/blog/default-og.jpg",
      ],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // In real app, fetch post data based on slug
  const post = mockPost; // This would be fetched from API

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderEditorJSContent = (content: any) => {
    if (!content.blocks) return null;

    return content.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case "header":
          const level = block.data.level;
          const className = "mt-8 mb-4 font-bold";
          if (level === 1) {
            return (
              <h1 key={index} className={className}>
                {block.data.text}
              </h1>
            );
          } else if (level === 2) {
            return (
              <h2 key={index} className={className}>
                {block.data.text}
              </h2>
            );
          } else if (level === 3) {
            return (
              <h3 key={index} className={className}>
                {block.data.text}
              </h3>
            );
          } else if (level === 4) {
            return (
              <h4 key={index} className={className}>
                {block.data.text}
              </h4>
            );
          } else if (level === 5) {
            return (
              <h5 key={index} className={className}>
                {block.data.text}
              </h5>
            );
          } else {
            return (
              <h6 key={index} className={className}>
                {block.data.text}
              </h6>
            );
          }
        case "paragraph":
          return (
            <p key={index} className="mb-4 leading-relaxed">
              {block.data.text}
            </p>
          );
        case "list":
          const ListTag = block.data.style === "ordered" ? "ol" : "ul";
          return (
            <ListTag key={index} className="mb-4 ml-6">
              {block.data.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="mb-2">
                  {item}
                </li>
              ))}
            </ListTag>
          );
        case "quote":
          return (
            <blockquote
              key={index}
              className="border-l-4 border-primary pl-4 py-2 mb-4 italic"
            >
              <p className="mb-2">"{block.data.text}"</p>
              {block.data.caption && (
                <cite className="text-sm text-muted-foreground">
                  — {block.data.caption}
                </cite>
              )}
            </blockquote>
          );
        case "table":
          return (
            <div key={index} className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {block.data.content[0].map(
                      (header: string, headerIndex: number) => (
                        <th
                          key={headerIndex}
                          className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {block.data.content
                    .slice(1)
                    .map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex}>
                        {row.map((cell: string, cellIndex: number) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-300 px-4 py-2"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          );
        default:
          return null;
      }
    });
  };

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

      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
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

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {post.author.name}
                </p>
                <p className="text-xs">{post.author.bio}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt!)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          {renderEditorJSContent(post.content)}
        </article>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="outline">
                #{tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Social Sharing */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Author Bio */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="text-lg">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {post.author.name}
                </h3>
                <p className="text-muted-foreground mb-4">{post.author.bio}</p>
                <Button variant="outline" size="sm">
                  Follow Author
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card
                key={relatedPost.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={relatedPost.featuredImage}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {relatedPost.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {relatedPost.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{relatedPost.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(relatedPost.publishedAt!)}</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/blog/${relatedPost.slug}`}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
