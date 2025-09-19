"use client";

import { useState } from "react";
import { Metadata } from "next";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Star,
  Car,
  Train,
  Building,
  TreePine,
  ShoppingBag,
  Camera,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPropertyBySlug, getProperties } from "@/lib/mock-data";
import Link from "next/link";
import PropertyImage from "@/components/ui/PropertyImage";
import { notFound } from "next/navigation";

interface PropertyDetailPageProps {
  params: {
    slug: string;
  };
}

export default function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const property = getPropertyBySlug(params.slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/properties" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Link>
            </Button>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={toggleFavorite}>
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    isFavorited ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isFavorited ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <Card>
              <div className="relative">
                <div className="relative h-96 md:h-[500px] overflow-hidden rounded-t-lg">
                  <PropertyImage
                    src={property.images[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="p-4 bg-white rounded-b-lg">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.slice(0, 8).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          currentImageIndex === index
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <PropertyImage
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    {property.images.length > 8 && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                        +{property.images.length - 8}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.address}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      £{property.pricePerSqft.toLocaleString()} per sq ft
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                    <div className="text-lg font-semibold text-gray-900">
                      {property.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                    <div className="text-lg font-semibold text-gray-900">
                      {property.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                    <div className="text-lg font-semibold text-gray-900">
                      {property.sqft.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                    <div className="text-lg font-semibold text-gray-900">
                      {property.yearBuilt}
                    </div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transport Links */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Transport Links
                  </h3>
                  <div className="space-y-2">
                    {property.transport.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Train className="h-4 w-4 text-gray-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {link.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {link.lines.join(", ")} • {link.distance}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Nearby Amenities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.nearby.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          {amenity.type === "Park" && (
                            <TreePine className="h-4 w-4 text-green-600 mr-3" />
                          )}
                          {amenity.type === "Shopping" && (
                            <ShoppingBag className="h-4 w-4 text-blue-600 mr-3" />
                          )}
                          {amenity.type === "Museum" && (
                            <Building className="h-4 w-4 text-purple-600 mr-3" />
                          )}
                          {amenity.type === "Supermarket" && (
                            <ShoppingBag className="h-4 w-4 text-orange-600 mr-3" />
                          )}
                          {amenity.type === "Attraction" && (
                            <Camera className="h-4 w-4 text-red-600 mr-3" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {amenity.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {amenity.type}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {amenity.distance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PropertyImage
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {property.agent.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {property.agent.rating} ({property.agent.reviews} reviews)
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {property.agent.phone}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium">{property.propertyType}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Energy Rating</span>
                  <Badge variant="outline">{property.energyRating}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Council Tax</span>
                  <span className="font-medium">{property.councilTax}</span>
                </div>
                {property.groundRent > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ground Rent</span>
                      <span className="font-medium">
                        £{property.groundRent}/year
                      </span>
                    </div>
                  </>
                )}
                {property.serviceCharge > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Charge</span>
                      <span className="font-medium">
                        £{property.serviceCharge}/year
                      </span>
                    </div>
                  </>
                )}
                {property.leaseLength > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lease Length</span>
                      <span className="font-medium">
                        {property.leaseLength} years
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Schedule Viewing */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Viewing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Book a viewing to see this property in person
                </p>
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Viewing
                </Button>
                <Button variant="outline" className="w-full">
                  Virtual Tour
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
