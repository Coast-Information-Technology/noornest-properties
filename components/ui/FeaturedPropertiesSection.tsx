"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropertyImage from "@/components/ui/PropertyImage";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: string;
  description: string;
  images: string[];
  slug: string;
  agent: {
    name: string;
    rating: number;
    reviews: number;
  };
}

export interface FeaturedPropertiesSectionProps {
  title: string;
  subtitle: string;
  description: string;
  properties: Property[];
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
  leftContentClassName?: string;
  gridClassName?: string;
}

export default function FeaturedPropertiesSection({
  title,
  subtitle,
  description,
  properties,
  viewAllHref = "/properties",
  viewAllText = "View all properties",
  className = "",
  leftContentClassName = "",
  gridClassName = "",
}: FeaturedPropertiesSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className={`py-16 px-6 md:px-16 md:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Left Side - Sticky Content */}
          <div className={`lg:col-span-2 ${leftContentClassName}`}>
            <div className="lg:sticky lg:top-8">
              <h3 className="text-lg tracking-wide text-black uppercase font-bold">
                {subtitle}
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">
                {title}
              </h2>
              <p className="text-gray-600 mt-3 mb-6 max-w-[28rem]">
                {description}
              </p>
              <Link href={viewAllHref}>
                <Button size="lg" className="text-md p-4">
                  {viewAllText}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Properties Grid */}
          <div className={`lg:col-span-4 ${gridClassName}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((property) => (
                <Card
                  key={property.id}
                  className="group hover:shadow-lg transition-shadow duration-300 pt-0 cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <PropertyImage
                      src={property.images[0]}
                      alt={property.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-gray-900"
                      >
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
                      <Badge
                        variant="secondary"
                        className="bg-black/70 text-white"
                      >
                        {property.images.length} photos
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="px-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-md font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </p>
                      </div>

                      <div className="text-lg font-bold text-gray-900">
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

                      {/* <p className="text-sm text-gray-600 line-clamp-2">
                        {property.description}
                      </p> */}

                      <div className="flex flex-col justify-between pt-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            {property.agent.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {property.agent.rating} ⭐ ({property.agent.reviews}{" "}
                            reviews)
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
