// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole =
  | "super_admin"
  | "admin"
  | "agent"
  | "investor"
  | "client"
  | "guest";

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  location: PropertyLocation;
  specifications: PropertySpecifications;
  images: PropertyImage[];
  features: string[];
  agent: PropertyAgent;
  isFeatured: boolean;
  isBmvEligible: boolean;
  bmvScore?: number;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType =
  | "house"
  | "apartment"
  | "condo"
  | "townhouse"
  | "land"
  | "commercial";

export type PropertyStatus =
  | "for_sale"
  | "for_rent"
  | "sold"
  | "rented"
  | "off_market";

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhood?: string;
}

export interface PropertySpecifications {
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize?: number;
  yearBuilt?: number;
  parkingSpaces?: number;
  garage?: boolean;
  pool?: boolean;
  garden?: boolean;
  balcony?: boolean;
  furnished?: boolean;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface PropertyAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  company?: string;
}

// BMV Analyzer Types
export interface BMVAnalysis {
  id: string;
  propertyId?: string;
  address: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt?: number;
  marketValue: number;
  estimatedValue: number;
  bmvScore: number;
  confidence: number;
  factors: BMVFactor[];
  report: BMVReport;
  createdAt: string;
  userId?: string;
}

export interface BMVFactor {
  name: string;
  impact: "positive" | "negative" | "neutral";
  score: number;
  description: string;
}

export interface BMVReport {
  summary: string;
  recommendations: string[];
  marketTrends: string;
  investmentPotential: "low" | "medium" | "high";
  riskAssessment: "low" | "medium" | "high";
}

export interface BMVAnalysisRequest {
  address: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt?: number;
  additionalInfo?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Editor.js output
  featuredImage?: string;
  author: BlogAuthor;
  categories: BlogCategory[];
  tags: BlogTag[];
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  readingTime?: string;
  seo: BlogSEO;
  createdAt: string;
  updatedAt: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogSEO {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalProperties: number;
  activeListings: number;
  totalUsers: number;
  monthlyRevenue: number;
  bmvAnalyses: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type:
    | "property_added"
    | "property_sold"
    | "user_registered"
    | "bmv_analysis"
    | "booking_created";
  description: string;
  timestamp: string;
  user?: string;
}

// Booking Types
export interface Booking {
  id: string;
  propertyId: string;
  property: Property;
  userId: string;
  user: User;
  agentId: string;
  agent: PropertyAgent;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Search and Filter Types
export interface PropertySearchFilters {
  propertyType?: PropertyType[];
  status?: PropertyStatus[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  location?: string;
  features?: string[];
  isBmvEligible?: boolean;
  isFeatured?: boolean;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: "price" | "createdAt" | "squareFeet" | "bmvScore";
  sortOrder?: "asc" | "desc";
  filters?: PropertySearchFilters;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  propertyId?: string;
}

export interface NewsletterForm {
  email: string;
  interests?: string[];
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Mock Data Property Types (for our specific data structure)
export interface MockProperty {
  id: number;
  title: string;
  slug: string;
  price: number;
  pricePerSqft: number;
  location: string;
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  status: string;
  description: string;
  features: string[];
  images: string[];
  agent: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    rating: number;
    reviews: number;
  };
  coordinates: {
    latitude: number;
    longitude: number;
    postcode: string;
    borough: string;
  };
  transport: Array<{
    name: string;
    type: string;
    lines: string[];
    distance: string;
  }>;
  nearby: Array<{
    name: string;
    type: string;
    distance: string;
  }>;
  energyRating: string;
  councilTax: string;
  groundRent: number;
  serviceCharge: number;
  leaseLength: number;
  createdAt: string;
  updatedAt: string;
}
