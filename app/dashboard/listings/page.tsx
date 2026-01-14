"use client";

import Link from "next/link";
import {
  Plus,
  Building2,
  MapPin,
  Bed,
  Bath,
  Square,
  PoundSterling,
  Eye,
  Edit,
  Heart,
} from "lucide-react";
import PropertyImage from "@/components/ui/PropertyImage";
import { formatPrice } from "@/utils/formatPrice";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with actual API calls
const mockListings = [
  {
    id: 1,
    title: "Modern 3BR Apartment in Downtown",
    address: "123 Main Street, Downtown",
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    propertyType: "Apartment",
    status: "Active",
    views: 245,
    createdAt: "2024-01-10",
    image: "/properties/property-1.jpg",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    address: "456 Oak Avenue, Suburbs",
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    propertyType: "House",
    status: "Active",
    views: 189,
    createdAt: "2024-01-08",
    image: "/properties/property-2.jpg",
  },
  {
    id: 3,
    title: "Cozy 2BR Condo",
    address: "789 Pine Street, Midtown",
    price: 320000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    propertyType: "Condo",
    status: "Pending",
    views: 156,
    createdAt: "2024-01-05",
    image: "/properties/property-3.jpg",
  },
];

export default function ListingsPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-600">
            Manage your property listings and create new ones
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/listings/new">
            <Plus className="w-4 h-4 mr-2" />
            Post New Property
          </Link>
        </Button>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing) => (
          <Card key={listing.id} className="group hover:shadow-lg transition-shadow duration-300 pt-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <PropertyImage
                src={listing.image}
                alt={listing.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-gray-900">
                  {listing.status}
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
                  {listing.views} views
                </Badge>
              </div>
            </div>

            <CardContent className="px-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.address}
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {listing.bedrooms} bed
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {listing.bathrooms} bath
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {listing.sqft} sq ft
                  </div>
                </div>

                <div className="flex flex-col justify-between pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                    <span className="capitalize">{listing.propertyType}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>

                    <div className="text-xl font-bold text-gray-900">
                      {formatPrice(listing.price)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockListings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No listings yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start by posting your first property listing
            </p>
            <Button asChild>
              <Link href="/dashboard/listings/new">
                <Plus className="w-4 h-4 mr-2" />
                Post New Property
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

