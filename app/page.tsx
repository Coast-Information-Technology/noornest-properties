import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  ArrowRight,
  HomeIcon,
  CheckCircle,
  Search,
  Newspaper,
  Handshake,
  Briefcase,
  LineChart,
  Key,
  DollarSign,
  FileText,
  MessageSquare,
  Hammer,
  Sofa,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";
import { clientTestimonials } from "@/data/testimonials";
import Newsletter from "@/components/layout/Newsletter";
import CTASection from "@/components/ui/CTASection";
import FeaturedPropertiesSection from "@/components/ui/FeaturedPropertiesSection";
import BlogSection from "@/components/ui/BlogSection";

// Dynamically import interactive components
const HeroCarousel = dynamic(() => import("@/components/ui/HeroCarousel"), {
  loading: () => <div className="h-[70vh] bg-gray-100 animate-pulse" />,
});

const PropertySearchBox = dynamic(() => import("@/components/ui/PropertySearchBox"), {
  loading: () => <div className="h-20 bg-gray-50 animate-pulse" />,
});

const ImpactMetrics = dynamic(() => import("@/components/ui/ImpactMetrics"), {
  loading: () => <div className="h-40 bg-gray-50 animate-pulse" />,
});

const TestimonialCarousel = dynamic(() => import("@/components/testimonial/TestimonialCarousel"), {
  loading: () => <div className="h-80 bg-gray-50 animate-pulse" />,
});

const heroImages = ["/hero-img.png", "/hero-img2.webp", "/hero-img3.webp"];

const featuredProperties = [
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
      "Stunning modern apartment with panoramic views of the Thames. Recently renovated with high-end finishes throughout.",
    images: [
      "/img/properties/peterborough/apt4/image-0-1024x1024.webp",
      "/img/properties/peterborough/apt4/image-1-1024x1024.webp",
    ],
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
    description:
      "Beautiful Victorian townhouse with original features and modern amenities. Perfect family home in prime location.",
    images: [
      "/img/properties/peterborough/apt4/image-2-1024x1024.webp",
      "/img/properties/peterborough/apt4/image-3-1024x1024.webp",
    ],
    slug: "victorian-townhouse-notting-hill",
    agent: {
      name: "Michael Chen",
      rating: 4.8,
      reviews: 89,
    },
  },
  {
    id: "3",
    title: "Luxury Penthouse in Shoreditch",
    location: "Shoreditch, London",
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    status: "For Sale",
    description:
      "Contemporary penthouse with private terrace and city views. Open-plan living with premium appliances.",
    images: [
      "/img/properties/peterborough/apt4/image-4-1024x1024.webp",
      "/img/properties/peterborough/apt4/image-5-1024x1024.webp",
    ],
    slug: "luxury-penthouse-shoreditch",
    agent: {
      name: "Emma Williams",
      rating: 4.9,
      reviews: 156,
    },
  },
  {
    id: "4",
    title: "Family Home in Hampstead",
    location: "Hampstead, London",
    price: 1800000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 2800,
    status: "For Sale",
    description:
      "Spacious family home with garden and parking. Close to excellent schools and transport links.",
    images: [
      "/img/properties/peterborough/apt4/image-6-1024x1024.webp",
      "/img/properties/peterborough/apt4/image-7-1024x1024.webp",
    ],
    slug: "family-home-hampstead",
    agent: {
      name: "David Thompson",
      rating: 4.7,
      reviews: 203,
    },
  },
  {
    id: "5",
    title: "Investment Property in Croydon",
    location: "Croydon, London",
    price: 420000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1100,
    status: "For Sale",
    description:
      "Excellent investment opportunity with high rental yield. Modern apartment in growing area.",
    images: [
      "/img/properties/peterborough/apt4/image-8-1024x1024.webp",
      "/img/properties/peterborough/apt4/image-9-1024x1024.webp",
    ],
    slug: "investment-property-croydon",
    agent: {
      name: "Lisa Patel",
      rating: 4.8,
      reviews: 91,
    },
  },
  {
    id: "6",
    title: "Studio Apartment in Camden",
    location: "Camden, London",
    price: 380000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    status: "For Sale",
    description:
      "Compact studio apartment perfect for first-time buyers. Great location near Camden Market.",
    images: [
      "/img/properties/peterborough/apt4/image-10-1024x1024.webp",
      "/img/properties/peterborough/apt4/image-11-1024x1024.webp",
    ],
    slug: "studio-apartment-camden",
    agent: {
      name: "James Wilson",
      rating: 4.6,
      reviews: 67,
    },
  },
];

const blogPosts = [
  {
    id: "1",
    title: "The Complete Guide to Property Investment in 2024",
    excerpt:
      "Discover the latest trends, strategies, and opportunities in the UK property market. Learn how to maximize your returns and build a successful investment portfolio.",
    category: "Investment",
    author: {
      name: "Sarah Johnson",
      avatar: "/client.jpg",
    },
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    slug: "complete-guide-property-investment-2024",
    image: "/img/properties/peterborough/apt4/image-0-1024x1024.webp",
  },
  {
    id: "2",
    title: "BMV Properties: Finding Below Market Value Deals",
    excerpt:
      "Learn how to identify and secure below market value properties that offer excellent investment potential and higher returns on your capital.",
    category: "Tips",
    author: {
      name: "Michael Chen",
      avatar: "/client.jpg",
    },
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    slug: "bmv-properties-finding-below-market-value-deals",
    image: "/img/properties/peterborough/apt4/image-1-1024x1024.webp",
  },
  {
    id: "3",
    title: "Market Analysis: London Property Trends Q1 2024",
    excerpt:
      "Get insights into the latest market movements, price changes, and emerging opportunities in London's property market this quarter.",
    category: "Market Trends",
    author: {
      name: "Emma Williams",
      avatar: "/client.jpg",
    },
    publishedAt: "2024-01-10",
    readTime: "5 min read",
    slug: "market-analysis-london-property-trends-q1-2024",
    image: "/img/properties/peterborough/apt4/image-2-1024x1024.webp",
  },
  {
    id: "4",
    title: "First-Time Buyer's Guide to Property Investment",
    excerpt:
      "Everything you need to know to start your property investment journey. From saving for a deposit to choosing your first investment property.",
    category: "Education",
    author: {
      name: "David Thompson",
      avatar: "/client.jpg",
    },
    publishedAt: "2024-01-08",
    readTime: "7 min read",
    slug: "first-time-buyers-guide-property-investment",
    image: "/img/properties/peterborough/apt4/image-3-1024x1024.webp",
  },
  {
    id: "5",
    title: "Rental Yield Calculator: Maximize Your Returns",
    excerpt:
      "Learn how to calculate and improve rental yields on your investment properties. Includes practical examples and optimization strategies.",
    category: "Tools",
    author: {
      name: "Lisa Patel",
      avatar: "/client.jpg",
    },
    publishedAt: "2024-01-05",
    readTime: "4 min read",
    slug: "rental-yield-calculator-maximize-returns",
    image: "/img/properties/peterborough/apt4/image-4-1024x1024.webp",
  },
  {
    id: "6",
    title: "Property Renovation: ROI Tips for Investors",
    excerpt:
      "Discover which renovations add the most value to your investment properties and how to budget for improvements that boost rental income.",
    category: "Renovation",
    author: {
      name: "James Wilson",
      avatar: "/client.jpg",
    },
    publishedAt: "2024-01-03",
    readTime: "6 min read",
    slug: "property-renovation-roi-tips-investors",
    image: "/img/properties/peterborough/apt4/image-5-1024x1024.webp",
  },
];

const features = [
  {
    icon: <CheckCircle className="text-primary font-light" size={60} aria-hidden="true" />,
    title: "Verified Listings",
    desc: "No scams, only trusted properties",
  },
  {
    icon: <Search className="text-primary font-light" size={60} aria-hidden="true" />,
    title: "Fast Search",
    desc: "Find what you need in seconds",
  },
  {
    icon: <Newspaper className="text-primary font-light" size={60} aria-hidden="true" />,
    title: "Market Insights",
    desc: "Blogs, tips, and trends for smarter decisions",
  },
  {
    icon: <Handshake className="text-primary font-light" size={60} aria-hidden="true" />,
    title: "Easy Connections",
    desc: "Reach agents and property owners directly",
  },
];

const propertySolutions = [
  {
    icon: <Briefcase className="text-primary font-light w-14 h-14" aria-hidden="true" />,
    title: "Management",
  },
  {
    icon: <LineChart className="text-primary font-light w-14 h-14" aria-hidden="true" />,
    title: "Sales & Marketing",
  },
  {
    icon: <Key className="text-primary font-light w-14 h-14" aria-hidden="true" />,
    title: "Rentals",
  },
  {
    icon: <DollarSign className="text-primary w-14 h-14" aria-hidden="true" />,
    title: "Sourcing",
  },
];

const advisoryEnhancements = [
  {
    icon: <FileText className="text-primary font-light w-14 h-14" aria-hidden="true" />,
    title: "Valuation",
  },
  {
    icon: <MessageSquare className="text-primary font-light w-14 h-14" aria-hidden="true" />,
    title: "Consultancy",
  },
  {
    icon: <Hammer className="text-primary font-light w-14 h-14" aria-hidden="true" />,
    title: "Renovation",
  },
  {
    icon: <Sofa className="text-primary font-light w-14 h-14" aria-hidden="true" />,
    title: "Interior Design",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-background py-6 sm:py-8">
        <div className="container mx-auto lg:mx-0 px-6 lg:px-16">
          <AnimatedSection
            variants={fadeInUp}
            className="space-y-6 grid grid-cols-1 lg:grid-cols-2 lg:items-center w-full"
          >
            <div className="space-y-4">
              {/* Badge */}
              <div className="flex justify-center lg:justify-start">
                <Badge variant="secondary" className="w-fit">
                  <TrendingUp className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span className="text-xs sm:text-sm">
                    Smart Real Estate Investment
                  </span>
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="text-center space-y-4 sm:space-y-6 lg:text-left">
                <AnimatedText
                  as="h1"
                  className="text-3xl lg:text-[2.5rem] font-bold tracking-tight text-primary leading-tight"
                  delay={0.2}
                >
                  Making Property Simple,
                  <br /> Secure & Smarter
                </AnimatedText>
              </div>
            </div>

            <div className="space-y-4">
              {/* Description */}
              <div className="text-center lg:text-left">
                <AnimatedText
                  as="p"
                  className="text-sm text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4"
                  delay={0.2}
                >
                  Discover verified properties and tailored investment
                  opportunities with Noornest — all in one trusted platform.
                </AnimatedText>
              </div>

              {/* Action Buttons */}
              <AnimatedSection
                className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start px-4"
                delay={0.4}
              >
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full sm:w-auto text-sm"
                >
                  <Link href="/properties">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                    <span className="hidden sm:inline">
                      Browse Properties
                    </span>
                    <span className="sm:hidden">Browse</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="w-full sm:w-auto text-sm"
                >
                  <Link href="/tools/bmv-analyzer">
                    <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                    <span className="hidden sm:inline">
                      Explore Investment Plans
                    </span>
                    <span className="sm:hidden">Investment Plans</span>
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Hero Carousel Section */}
      <HeroCarousel images={heroImages} />

      {/* Search Box - Outside the carousel */}
      <PropertySearchBox />

      {/* Featured Properties Section */}
      <FeaturedPropertiesSection
        title="Discover Your Next Property"
        subtitle="Featured Properties"
        description="Explore some of the standout homes and investments available now. Every listing on Noornest is verified for security and transparency."
        properties={featuredProperties}
        viewAllHref="/properties"
        viewAllText="View all properties"
      />

      {/* Investment Plans Section */}
      <section className="w-full bg-amber-50 py-16 px-6 md:px-16 relative">
        <div className="flex flex-col lg:flex-row items-center md:items-start gap-12">
          {/* Left Section */}
          <div className="flex-1">
            <h3 className="text-lg tracking-wide text-black uppercase font-bold">
              Investment Plans
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
              Grow Your Wealth with Noornest
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg">
              Choose from flexible plans designed to suit every investor.
            </p>
            {/* Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 md:mt-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Equity Nest
                </h3>
                <p className="text-sm text-gray-600">
                  Profit Sharing Investments for long-term growth.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Yield Nest</h3>
                <p className="text-sm text-gray-600">
                  Earn steady income from rental properties.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Secure Nest
                </h3>
                <p className="text-sm text-gray-600">
                  Fixed returns with guaranteed plans.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Opportunity Nest
                </h3>
                <p className="text-sm text-gray-600">
                  Exclusive below-market value deals.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Button>Explore All Plans</Button>
              <Button variant="ghost">
                Learn more <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] w-full md:h-[500px] lg:w-[600px] relative">
              <Image
                src="/hero-img.png"
                alt="Investment Houses"
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Noornest Section */}
      <section className="bg-accent py-16 px-6 md:px-16">
        <div>
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Why Choose Noornest
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
            Why Thousands Trust Noornest
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="bg-transparent border-primary border shadow-md p-6 rounded-xl flex flex-col items-center text-center hover:scale-105 transition-all duration-300"
              >
                {item.icon}
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Service Section */}
      <section className="bg-white py-16 px-6 md:px-16">
        <div>
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Our Service
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
            Comprehensive Property Services
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl">
            From property management to investment advisory, Noornest covers
            every step of your property journey.
          </p>

          {/* Property Solutions */}
          <div className="mt-10">
            <h4 className="text-xl font-bold text-primary mb-4">
              Property Solutions:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {propertySolutions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col lg:flex-row items-center gap-3 bg-[#f5f5f5] rounded-xl py-6 px-4 shadow-sm"
                >
                  {item.icon}
                  <p className="text-xl font-medium">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Advisory & Enhancements */}
          <div className="mt-10">
            <h4 className="text-xl font-bold text-primary mb-4">
              Advisory & Enhancements:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {advisoryEnhancements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row  items-center gap-3 bg-[#f5f5f5] rounded-xl py-6 px-4 shadow-sm"
                >
                  {item.icon}
                  <p className="text-xl font-medium">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="w-full bg-[#E9DAC6] py-16 px-6">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Impact Metrics
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-10">
            Our Impact So Far
          </h2>

          <ImpactMetrics />
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialCarousel
        testimonials={clientTestimonials}
        title="What Our Clients Say"
        subtitle="TESTIMONIALS"
        backgroundColor="bg-purple-50"
        cardBackgroundColor="#EADBC8"
        primaryColor="#BFA14A"
        accentColor="#EADBC8"
      />

      {/* Blog Section */}
      <BlogSection
        title="Latest Insights"
        subtitle="OUR BLOG"
        description="Stay updated with the latest trends and news in the property market."
        posts={blogPosts}
      />

      {/* Newsletter Section */}
      <Newsletter />

      {/* CTA Section */}
      <CTASection
        title="Start Your Property Journey Today"
        description="Sign up free or book a consultation — let's make your next move smarter."
        primaryButton={{
          text: "Sign Up Free",
          href: "/register",
        }}
        secondaryButton={{
          text: "Book a Consultation",
          href: "/booking",
          className: "text-primary",
        }}
        backgroundImage="/hero-img3.webp"
        overlayClassName="bg-gradient-to-r from-black/40 to-black/60 backdrop-blur-sm"
      />
    </main>
  );
}
