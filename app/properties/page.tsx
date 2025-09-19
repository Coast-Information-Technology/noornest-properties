import { Metadata } from "next";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Eye,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getProperties,
  searchProperties,
  filterProperties,
} from "@/lib/mock-data";
import Link from "next/link";
import PropertyImage from "@/components/ui/PropertyImage";

export const metadata: Metadata = {
  title: "Properties for Sale in London | Noornest Properties",
  description:
    "Discover luxury properties for sale in London. Browse our extensive collection of flats, houses, and apartments in prime London locations.",
  keywords: [
    "properties for sale london",
    "london real estate",
    "luxury properties",
    "flats for sale",
    "houses for sale",
  ],
  openGraph: {
    title: "Properties for Sale in London | Noornest Properties",
    description:
      "Discover luxury properties for sale in London. Browse our extensive collection of flats, houses, and apartments in prime London locations.",
    type: "website",
  },
};

export default function PropertiesPage() {
  const properties = getProperties();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const PropertyCard = ({ property }: { property: (typeof properties)[0] }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-300 pt-0">
      <div className="relative overflow-hidden rounded-t-lg">
        <PropertyImage
          src={property.images[0]}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {property.status}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {property.images.length} photos
          </Badge>
        </div>
      </div>

      <CardContent className="px-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {property.title}
            </h3>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </p>
          </div>

          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price)}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} bed
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} bath
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {property.sqft} sq ft
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {property.description}
          </p>

          <div className="flex flex-col justify-between pt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-900">
                {property.agent.name}
              </p>
              <p className="text-xs text-gray-500">
                {property.agent.rating} ⭐ ({property.agent.reviews} reviews)
              </p>
            </div>

            <Button asChild>
              <Link
                href={`/properties/${property.slug}`}
                className="text-md p-4"
              >
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Property in London
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover luxury flats, houses, and apartments in prime London
              locations
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search by location, property type, or features..."
                      className="pl-10 h-12 text-gray-900"
                    />
                  </div>
                </div>
                <Button size="lg" className="h-12 px-8">
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Property Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Min Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No Min</SelectItem>
                        <SelectItem value="300000">£300,000</SelectItem>
                        <SelectItem value="500000">£500,000</SelectItem>
                        <SelectItem value="750000">£750,000</SelectItem>
                        <SelectItem value="1000000">£1,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Max Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500000">£500,000</SelectItem>
                        <SelectItem value="750000">£750,000</SelectItem>
                        <SelectItem value="1000000">£1,000,000</SelectItem>
                        <SelectItem value="1500000">£1,500,000</SelectItem>
                        <SelectItem value="2000000">£2,000,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Bedrooms
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Location
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Areas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      <SelectItem value="marylebone">Marylebone</SelectItem>
                      <SelectItem value="chelsea">Chelsea</SelectItem>
                      <SelectItem value="canary-wharf">Canary Wharf</SelectItem>
                      <SelectItem value="kensington">Kensington</SelectItem>
                      <SelectItem value="westminster">Westminster</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Properties Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {properties.length} Properties Found
                </h2>
                <p className="text-gray-600">
                  Showing all available properties in London
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="size">Size: Largest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
