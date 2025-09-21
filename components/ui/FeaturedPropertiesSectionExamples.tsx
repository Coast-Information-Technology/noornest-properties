// components/ui/FeaturedPropertiesSectionExamples.tsx
// This file shows different ways to use the FeaturedPropertiesSection component

import FeaturedPropertiesSection from "./FeaturedPropertiesSection";

// Example properties data
const sampleProperties = [
  {
    id: "1",
    title: "Modern Apartment in Canary Wharf",
    location: "Canary Wharf, London",
    price: 650000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    status: "For Sale",
    description:
      "Stunning modern apartment with panoramic views of the Thames.",
    images: ["/img/properties/peterborough/apt4/image-0-1024x1024.webp"],
    slug: "modern-apartment-canary-wharf",
    agent: {
      name: "Sarah Johnson",
      rating: 4.9,
      reviews: 127,
    },
  },
  {
    id: "2",
    title: "Victorian Townhouse in Notting Hill",
    location: "Notting Hill, London",
    price: 1200000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2100,
    status: "For Sale",
    description: "Beautiful Victorian townhouse with original features.",
    images: ["/img/properties/peterborough/apt4/image-1-1024x1024.webp"],
    slug: "victorian-townhouse-notting-hill",
    agent: {
      name: "Michael Chen",
      rating: 4.8,
      reviews: 89,
    },
  },
];

// Example 1: Default featured properties section
export function DefaultFeaturedProperties() {
  return (
    <FeaturedPropertiesSection
      title="Discover Your Next Property"
      subtitle="Featured Properties"
      description="Explore some of the standout homes and investments available now. Every listing on Noornest is verified for security and transparency."
      properties={sampleProperties}
      viewAllHref="/properties"
      viewAllText="View all properties"
    />
  );
}

// Example 2: Rental properties section
export function RentalPropertiesSection() {
  return (
    <FeaturedPropertiesSection
      title="Find Your Perfect Rental"
      subtitle="Featured Rentals"
      description="Browse our selection of premium rental properties in prime locations across London."
      properties={sampleProperties.map((prop) => ({
        ...prop,
        status: "For Rent",
        price: prop.price / 12, // Convert to monthly rent
      }))}
      viewAllHref="/rentals"
      viewAllText="View all rentals"
      className="bg-gray-50"
    />
  );
}

// Example 3: Investment properties section
export function InvestmentPropertiesSection() {
  return (
    <FeaturedPropertiesSection
      title="Investment Opportunities"
      subtitle="Premium Investments"
      description="Discover high-yield investment properties with excellent growth potential and rental income."
      properties={sampleProperties}
      viewAllHref="/investments"
      viewAllText="View all investments"
      leftContentClassName="lg:bg-gradient-to-br from-primary/5 to-secondary/5 lg:p-8 lg:rounded-lg"
      gridClassName="gap-8"
    />
  );
}

// Example 4: Compact properties section
export function CompactPropertiesSection() {
  return (
    <FeaturedPropertiesSection
      title="Quick Property Finder"
      subtitle="Popular Properties"
      description="Most viewed properties this week."
      properties={sampleProperties.slice(0, 3)} // Only show 3 properties
      viewAllHref="/properties"
      viewAllText="See more"
      className="py-12"
      leftContentClassName="lg:max-w-sm"
    />
  );
}

// Example 5: Custom styled properties section
export function CustomStyledPropertiesSection() {
  return (
    <FeaturedPropertiesSection
      title="Luxury Living Awaits"
      subtitle="Premium Collection"
      description="Exquisite properties for discerning buyers seeking the finest in London real estate."
      properties={sampleProperties}
      viewAllHref="/luxury-properties"
      viewAllText="Explore luxury collection"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      leftContentClassName="lg:bg-white/10 lg:p-8 lg:rounded-lg lg:backdrop-blur-sm"
      gridClassName="gap-6"
    />
  );
}

// Example 6: Properties section without view all button
export function PropertiesWithoutViewAll() {
  return (
    <FeaturedPropertiesSection
      title="New Listings This Week"
      subtitle="Latest Properties"
      description="Fresh properties added to our platform this week. Be the first to view these amazing opportunities."
      properties={sampleProperties}
      viewAllHref=""
      viewAllText=""
    />
  );
}
