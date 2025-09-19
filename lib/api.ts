import axios from "axios";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    profile: "/auth/profile",
  },

  // Properties
  properties: {
    list: "/properties",
    create: "/properties",
    get: (id: string) => `/properties/${id}`,
    update: (id: string) => `/properties/${id}`,
    delete: (id: string) => `/properties/${id}`,
    search: "/properties/search",
    featured: "/properties/featured",
  },

  // Blog
  blog: {
    posts: "/blog/posts",
    post: (slug: string) => `/blog/posts/${slug}`,
    categories: "/blog/categories",
    tags: "/blog/tags",
  },

  // BMV Analyzer
  bmv: {
    analyze: "/bmv/analyze",
    history: "/bmv/history",
    report: (id: string) => `/bmv/report/${id}`,
  },

  // Dashboard
  dashboard: {
    stats: "/dashboard/stats",
    properties: "/dashboard/properties",
    bookings: "/dashboard/bookings",
    users: "/dashboard/users",
  },

  // Admin
  admin: {
    users: "/admin/users",
    properties: "/admin/properties",
    blog: "/admin/blog",
    settings: "/admin/settings",
  },
} as const;

