import mockData from "../data/mock-data.json";
import { BlogPost, BlogCategory, BlogTag, MockProperty } from "@/types";

// Type-safe access to mock data
export const getMockData = () => mockData;

// Blog data helpers
export const getBlogPosts = (): BlogPost[] => mockData.blogPosts as BlogPost[];
export const getBlogCategories = (): BlogCategory[] =>
  mockData.blogCategories as BlogCategory[];
export const getBlogTags = (): BlogTag[] => mockData.blogTags as BlogTag[];

// Get specific blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return getBlogPosts().find((post) => post.slug === slug);
};

// Get blog posts by category
export const getBlogPostsByCategory = (categorySlug: string): BlogPost[] => {
  return getBlogPosts().filter((post) =>
    post.categories.some((category) => category.slug === categorySlug)
  );
};

// Get blog posts by tag
export const getBlogPostsByTag = (tagSlug: string): BlogPost[] => {
  return getBlogPosts().filter((post) =>
    post.tags.some((tag) => tag.slug === tagSlug)
  );
};

// Get related posts (excluding current post)
export const getRelatedPosts = (
  currentPostId: string,
  limit: number = 3
): BlogPost[] => {
  const allPosts = getBlogPosts();
  return allPosts.filter((post) => post.id !== currentPostId).slice(0, limit);
};

// Dashboard data helpers
export const getDashboardData = () => mockData.dashboardData;
export const getBMVAnalyses = () => mockData.bmvAnalyses;
export const getBMVUsageStats = () => mockData.bmvUsageStats;
export const getUserProfile = () => mockData.userProfile;
export const getSavedProperties = () => mockData.savedProperties;
export const getBookings = () => mockData.bookings;

// Property data helpers
export const getProperties = (): MockProperty[] =>
  mockData.properties as MockProperty[];
export const getPropertyBySlug = (slug: string): MockProperty | undefined => {
  return mockData.properties.find((property) => property.slug === slug) as
    | MockProperty
    | undefined;
};
export const getPropertyById = (id: number): MockProperty | undefined => {
  return mockData.properties.find((property) => property.id === id) as
    | MockProperty
    | undefined;
};
export const searchProperties = (query: string) => {
  const properties = getProperties();
  const lowercaseQuery = query.toLowerCase();

  return properties.filter(
    (property) =>
      property.title.toLowerCase().includes(lowercaseQuery) ||
      property.location.toLowerCase().includes(lowercaseQuery) ||
      property.address.toLowerCase().includes(lowercaseQuery) ||
      property.description.toLowerCase().includes(lowercaseQuery)
  );
};
export const filterProperties = (filters: {
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
}) => {
  let properties = getProperties();

  if (filters.propertyType) {
    properties = properties.filter(
      (p) => p.propertyType === filters.propertyType
    );
  }
  if (filters.minPrice) {
    properties = properties.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice) {
    properties = properties.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.bedrooms) {
    properties = properties.filter((p) => p.bedrooms >= filters.bedrooms!);
  }
  if (filters.bathrooms) {
    properties = properties.filter((p) => p.bathrooms >= filters.bathrooms!);
  }
  if (filters.location) {
    properties = properties.filter((p) =>
      p.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  return properties;
};

// Search and filter helpers
export const searchBlogPosts = (query: string): BlogPost[] => {
  const posts = getBlogPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) =>
        tag.name.toLowerCase().includes(lowercaseQuery)
      ) ||
      post.categories.some((category) =>
        category.name.toLowerCase().includes(lowercaseQuery)
      )
  );
};

// Pagination helper
export const paginatePosts = (
  posts: BlogPost[],
  page: number,
  limit: number
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages: Math.ceil(posts.length / limit),
    currentPage: page,
    hasNextPage: endIndex < posts.length,
    hasPreviousPage: page > 1,
  };
};
