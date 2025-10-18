import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { getProperties } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/utils/formatPrice";
import PropertyImage from "../ui/PropertyImage";

export default function TopProperties() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const properties = getProperties();
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const newIndex = Math.round(scrollLeft / clientWidth);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-primary py-16 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">Highlights</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-3 max-w-2xl">
            Top performing property investments
          </h2>
          <p className="text-gray-200 max-w-2xl">
            Our expert team identifies properties with exceptional yield and
            growth potential.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          aria-label="Property listings carousel"
        >
          {properties.map((property) => (
            <Card
              key={property.slug}
              className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[350px] group hover:shadow-lg transition-shadow duration-300 pt-0 bg-amber-50"
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
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {property.images.length} photos
                  </Badge>
                </div>
              </div>

              <CardContent className="px-6">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-800 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-800">
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

                    <div className="flex item-center justify-between mt-2">
                      <Button asChild>
                        <Link
                          href={`/properties/${property.slug}`}
                          className="text-md p-4"
                        >
                          View Details
                        </Link>
                      </Button>

                      <div className="text-xl font-bold text-gray-900">
                        {formatPrice(property.price)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-between mt-6 space-x-2">
          <div className="space-x-2">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!scrollRef.current) return;
                  scrollRef.current.scrollTo({
                    left: index * scrollRef.current.clientWidth,
                    behavior: "smooth",
                  });
                }}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-amber-300" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* navigation arrows */}
          <div className="flex space-x-2 pr-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="bg-primary text-white px-5 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-primary">
            Explore
          </button>
          <button className="flex items-center gap-2 text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary">
            Learn More <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
