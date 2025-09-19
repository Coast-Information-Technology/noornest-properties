import { UserRole, PropertyType, PropertyStatus } from "@/types";

// User Roles and Permissions
export const USER_ROLES: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  agent: "Real Estate Agent",
  investor: "Investor",
  client: "Client",
  guest: "Guest",
};

export const ROLE_PERMISSIONS = {
  super_admin: ["*"], // All permissions
  admin: [
    "manage_content",
    "manage_campaigns",
    "manage_bookings",
    "manage_users",
    "view_analytics",
  ],
  agent: [
    "manage_own_listings",
    "manage_own_bookings",
    "manage_own_clients",
    "view_own_analytics",
  ],
  investor: [
    "access_investment_tools",
    "save_analyses",
    "receive_payouts",
    "view_investment_analytics",
  ],
  client: [
    "book_viewings",
    "save_properties",
    "limited_bmv_access",
    "view_own_bookings",
  ],
  guest: ["browse_properties", "limited_bmv_access"],
};

// Property Types
export const PROPERTY_TYPES: Record<PropertyType, string> = {
  house: "House",
  apartment: "Apartment",
  condo: "Condo",
  townhouse: "Townhouse",
  land: "Land",
  commercial: "Commercial",
};

// Property Status
export const PROPERTY_STATUS: Record<PropertyStatus, string> = {
  for_sale: "For Sale",
  for_rent: "For Rent",
  sold: "Sold",
  rented: "Rented",
  off_market: "Off Market",
};

// BMV Analyzer Limits
export const BMV_LIMITS = {
  guest: {
    dailyAnalyses: 2,
    showAds: true,
    downloadableReports: false,
  },
  registered: {
    dailyAnalyses: -1, // Unlimited
    showAds: true,
    downloadableReports: false,
  },
  paid: {
    dailyAnalyses: -1, // Unlimited
    showAds: false,
    downloadableReports: true,
  },
};

// Property Features
export const PROPERTY_FEATURES = [
  "Swimming Pool",
  "Garden",
  "Balcony",
  "Garage",
  "Parking",
  "Furnished",
  "Air Conditioning",
  "Heating",
  "Fireplace",
  "Security System",
  "Gym",
  "Concierge",
  "Pet Friendly",
  "Wheelchair Accessible",
  "High Ceilings",
  "Hardwood Floors",
  "Marble Countertops",
  "Stainless Steel Appliances",
  "Walk-in Closet",
  "Master Suite",
];

// Property Specifications Ranges
export const PROPERTY_SPECS = {
  bedrooms: { min: 1, max: 10 },
  bathrooms: { min: 1, max: 8 },
  squareFeet: { min: 100, max: 50000 },
  yearBuilt: { min: 1800, max: new Date().getFullYear() },
  parkingSpaces: { min: 0, max: 10 },
};

// Price Ranges
export const PRICE_RANGES = [
  { label: "Under $100K", min: 0, max: 100000 },
  { label: "$100K - $250K", min: 100000, max: 250000 },
  { label: "$250K - $500K", min: 250000, max: 500000 },
  { label: "$500K - $1M", min: 500000, max: 1000000 },
  { label: "$1M - $2M", min: 1000000, max: 2000000 },
  { label: "Over $2M", min: 2000000, max: Infinity },
];

// BMV Score Ranges
export const BMV_SCORE_RANGES = [
  { label: "Excellent (90-100)", min: 90, max: 100, color: "green" },
  { label: "Very Good (80-89)", min: 80, max: 89, color: "blue" },
  { label: "Good (70-79)", min: 70, max: 79, color: "yellow" },
  { label: "Fair (60-69)", min: 60, max: 69, color: "orange" },
  { label: "Poor (Below 60)", min: 0, max: 59, color: "red" },
];

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/", public: true },
  { label: "Properties", href: "/properties", public: true },
  { label: "About", href: "/about", public: true },
  { label: "Services", href: "/services", public: true },
  { label: "Blog", href: "/blog", public: true },
  { label: "Contact", href: "/contact", public: true },
  { label: "BMV Tool", href: "/tools/bmv-analyzer", public: true },
];

// Dashboard Menu Items
export const DASHBOARD_MENU_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: "Home" },
  { label: "Properties", href: "/dashboard/properties", icon: "Building" },
  { label: "Bookings", href: "/dashboard/bookings", icon: "Calendar" },
  {
    label: "BMV Analyses",
    href: "/dashboard/bmv-analyses",
    icon: "TrendingUp",
  },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];

// Admin Menu Items
export const ADMIN_MENU_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "BarChart" },
  { label: "Users", href: "/admin/users", icon: "Users" },
  { label: "Properties", href: "/admin/properties", icon: "Building" },
  { label: "Blog", href: "/admin/blog", icon: "FileText" },
  { label: "Bookings", href: "/admin/bookings", icon: "Calendar" },
  { label: "Analytics", href: "/admin/analytics", icon: "TrendingUp" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PROPERTY_PAGE_SIZE: 12,
  BLOG_PAGE_SIZE: 9,
  ADMIN_PAGE_SIZE: 20,
};

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  MAX_IMAGES_PER_PROPERTY: 20,
};

// SEO Defaults
export const SEO_DEFAULTS = {
  title: "Noornest Properties - Real Estate Investment Platform",
  description:
    "Discover below-market-value properties and make smart real estate investments with our advanced BMV analyzer tool.",
  keywords: [
    "real estate",
    "property investment",
    "BMV analyzer",
    "below market value",
    "property listings",
  ],
  ogImage: "/og-image.jpg",
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/noornestproperties",
  twitter: "https://twitter.com/noornestproperties",
  instagram: "https://instagram.com/noornestproperties",
  linkedin: "https://linkedin.com/company/noornestproperties",
  youtube: "https://youtube.com/noornestproperties",
};

// Contact Information
export const CONTACT_INFO = {
  email: "info@noornestproperties.com",
  phone: "+1 (555) 123-4567",
  address: "123 Real Estate Ave, Property City, PC 12345",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
  BMV_LIMIT_REACHED: "You have reached your daily BMV analysis limit.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back!",
  REGISTER_SUCCESS: "Account created successfully!",
  PROPERTY_SAVED: "Property saved to your favorites.",
  BOOKING_CREATED: "Viewing appointment scheduled successfully.",
  BMV_ANALYSIS_COMPLETE: "BMV analysis completed successfully.",
  PROFILE_UPDATED: "Profile updated successfully.",
  PASSWORD_CHANGED: "Password changed successfully.",
};
