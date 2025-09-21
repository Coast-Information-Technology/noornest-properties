// components/testimonial/TestimonialExamples.tsx
// This file shows different ways to use the TestimonialCarousel component

import TestimonialCarousel from "./TestimonialCarousel";
import {
  clientTestimonials,
  investorTestimonials,
  buyerTestimonials,
} from "@/data/testimonials";

// Example 1: Default client testimonials (same as ClientsTestimonial)
export function DefaultTestimonials() {
  return (
    <TestimonialCarousel
      testimonials={clientTestimonials}
      title="What Our Clients Say"
      subtitle="TESTIMONIALS"
    />
  );
}

// Example 2: Investor testimonials with different styling
export function InvestorTestimonials() {
  return (
    <TestimonialCarousel
      testimonials={investorTestimonials}
      title="What Our Investors Say"
      subtitle="INVESTOR STORIES"
      backgroundColor="bg-gray-50"
      cardBackgroundColor="#E8F4FD"
      primaryColor="#2563EB"
      accentColor="#1D4ED8"
      autoSlideInterval={8000} // Slower auto-slide
    />
  );
}

// Example 3: Buyer testimonials with minimal navigation
export function BuyerTestimonials() {
  return (
    <TestimonialCarousel
      testimonials={buyerTestimonials}
      title="Happy Homeowners"
      subtitle="BUYER TESTIMONIALS"
      backgroundColor="bg-green-50"
      cardBackgroundColor="#F0FDF4"
      primaryColor="#16A34A"
      accentColor="#15803D"
      showDots={false} // Hide dots, keep navigation buttons
      autoSlideInterval={5000} // Faster auto-slide
    />
  );
}

// Example 4: Static testimonials (no auto-slide)
export function StaticTestimonials() {
  return (
    <TestimonialCarousel
      testimonials={clientTestimonials}
      title="Customer Reviews"
      subtitle="REVIEWS"
      autoSlideInterval={0} // Disable auto-slide
      showNavigation={false} // Hide all navigation
      backgroundColor="bg-blue-50"
      cardBackgroundColor="#FFFFFF"
      primaryColor="#3B82F6"
      accentColor="#2563EB"
    />
  );
}

// Example 5: Custom testimonials for a specific section
export function CustomTestimonials() {
  const customTestimonials = [
    {
      quote:
        "This is a custom testimonial for a specific section of the website.",
      author: "Custom User",
      role: "Custom Role",
      image: "/client.jpg",
    },
  ];

  return (
    <TestimonialCarousel
      testimonials={customTestimonials}
      title="Custom Section"
      subtitle="CUSTOM TESTIMONIALS"
      backgroundColor="bg-purple-50"
      cardBackgroundColor="#FAF5FF"
      primaryColor="#8B5CF6"
      accentColor="#7C3AED"
      className="rounded-2xl" // Additional custom styling
    />
  );
}
