"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Calendar,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Star,
  Building2,
  Car,
  Home,
  TreePine,
  Wifi,
  Shield,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPropertyBySlug, getProperties } from "@/lib/mock-data";
import { formatPrice } from "@/utils/formatPrice";
import PropertyImage from "@/components/ui/PropertyImage";
import Link from "next/link";
import { MockProperty } from "@/types";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [property, setProperty] = useState<MockProperty | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with API call
    const fetchProperty = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const propertyData = getPropertyBySlug(slug);
        
        if (!propertyData) {
          setError("Property not found");
          return;
        }
        
        setProperty(propertyData);
        // Check if property is saved (from localStorage or API)
        const savedProperties = JSON.parse(
          localStorage.getItem("savedProperties") || "[]"
        );
        setIsSaved(savedProperties.includes(propertyData.id));
      } catch (err) {
        setError("Failed to load property");
        // Error handled silently in production
        if (process.env.NODE_ENV !== "production") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  const handleSaveProperty = () => {
    if (!property) return;
    
    // TODO: Replace with API call
    const savedProperties = JSON.parse(
      localStorage.getItem("savedProperties") || "[]"
    );
    
    if (isSaved) {
      const updated = savedProperties.filter((id: number) => id !== property.id);
      localStorage.setItem("savedProperties", JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedProperties.push(property.id);
      localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
      setIsSaved(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title,
          text: property?.description,
          url: window.location.href,
        });
      } catch (err) {
        // Error handled silently in production
        if (process.env.NODE_ENV !== "production") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const nextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Get related properties
  const relatedProperties = property
    ? getProperties()
        .filter(
          (p) =>
            p.id !== property.id &&
            (p.propertyType === property.propertyType ||
              p.location === property.location)
        )
        .slice(0, 3)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Property Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The property you're looking for doesn't exist."}
            </p>
            <Button asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Carousel */}
      <div className="relative w-full h-[70vh] bg-gray-900">
        {property.images && property.images.length > 0 ? (
          <>
            {/* Main Image */}
            <div className="relative w-full h-full">
              <PropertyImage
                src={property.images[currentImageIndex] || property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Navigation Arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 transition-all z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 transition-all z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-10">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>
            
            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 overflow-x-auto">
                <div className="flex space-x-2 max-w-7xl mx-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-white scale-110"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <PropertyImage
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Building2 className="w-24 h-24 text-gray-400" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{property.propertyType}</Badge>
                <Badge variant={property.status === "For Sale" ? "default" : "secondary"}>
                  {property.status}
                </Badge>
                {property.isBmvEligible && (
                  <Badge variant="default" className="bg-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    BMV Eligible
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{property.address}</span>
              </div>
            </div>

            {/* Key Details */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Bed className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {property.sqft.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <Home className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Details Tabs */}
            <Card>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Property Type</div>
                      <div className="font-semibold">{property.propertyType}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Year Built</div>
                      <div className="font-semibold">{property.yearBuilt}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Price per Sq Ft</div>
                      <div className="font-semibold">
                        £{property.pricePerSqft.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Energy Rating</div>
                      <div className="font-semibold">
                        {property.energyRating || "N/A"}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-4 p-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Address</div>
                    <div className="font-semibold">{property.address}</div>
                    <div className="text-gray-600">{property.location}</div>
                  </div>
                  {property.coordinates && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Postcode</div>
                        <div className="font-semibold">
                          {property.coordinates.postcode}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Borough</div>
                        <div className="font-semibold">
                          {property.coordinates.borough}
                        </div>
                      </div>
                    </div>
                  )}
                  {property.transport && property.transport.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Transport Links</div>
                      <div className="space-y-2">
                        {property.transport.map((transport, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-sm">
                              {transport.name} ({transport.distance})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="financial" className="space-y-4 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {property.councilTax && (
                      <div>
                        <div className="text-sm text-gray-500">Council Tax</div>
                        <div className="font-semibold">{property.councilTax}</div>
                      </div>
                    )}
                    {property.groundRent && (
                      <div>
                        <div className="text-sm text-gray-500">Ground Rent</div>
                        <div className="font-semibold">
                          £{property.groundRent.toLocaleString()}/year
                        </div>
                      </div>
                    )}
                    {property.serviceCharge && (
                      <div>
                        <div className="text-sm text-gray-500">Service Charge</div>
                        <div className="font-semibold">
                          £{property.serviceCharge.toLocaleString()}/year
                        </div>
                      </div>
                    )}
                    {property.leaseLength && (
                      <div>
                        <div className="text-sm text-gray-500">Lease Length</div>
                        <div className="font-semibold">{property.leaseLength} years</div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-gray-600">
                    £{property.pricePerSqft.toLocaleString()} per sq ft
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => router.push(`/dashboard/bookings/new?property=${property.id}`)}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Viewing
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleSaveProperty}
                    >
                      <Heart
                        className={`w-5 h-5 mr-2 ${
                          isSaved ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleShare}>
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </Button>
                  </div>
                  {property.isBmvEligible && (
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href={`/tools/bmv-analyzer?property=${property.id}`}>
                        <Calculator className="w-5 h-5 mr-2" />
                        BMV Analysis
                      </Link>
                    </Button>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Agent Info */}
                <div>
                  <div className="text-sm text-gray-500 mb-3">Listed by</div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {property.agent.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{property.agent.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {property.agent.rating} ({property.agent.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      {property.agent.phone}
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      {property.agent.email}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProperty) => (
                <Card
                  key={relatedProperty.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <PropertyImage
                      src={relatedProperty.images[0] || "/placeholder.jpg"}
                      alt={relatedProperty.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      {relatedProperty.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {relatedProperty.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold">
                        {formatPrice(relatedProperty.price)}
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/properties/${relatedProperty.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

