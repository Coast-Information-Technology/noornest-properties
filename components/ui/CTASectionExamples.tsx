// components/ui/CTASectionExamples.tsx
// This file shows different ways to use the CTASection component

import CTASection from "./CTASection";

// Example 1: CTA with background image
export function CTAWithBackground() {
  return (
    <CTASection
      title="Ready to Start Your Investment Journey?"
      description="Join thousands of successful investors and discover your next profitable property investment today."
      primaryButton={{
        text: "Analyze Property Now",
        href: "/tools/bmv-analyzer",
      }}
      secondaryButton={{
        text: "Browse Properties",
        href: "/properties",
      }}
      backgroundImage="/hero-img3.webp"
      overlayClassName="bg-gradient-to-r from-primary/90 to-primary/70 backdrop-blur-sm"
    />
  );
}

// Example 2: CTA without background image (solid color)
export function CTASolidColor() {
  return (
    <CTASection
      title="Get Started Today"
      description="Transform your property investment strategy with our expert tools and insights."
      primaryButton={{
        text: "Start Free Trial",
        href: "/register",
      }}
      secondaryButton={{
        text: "Learn More",
        href: "/about",
      }}
      backgroundColor="bg-primary"
      className="text-white"
    />
  );
}

// Example 3: Minimal CTA section
export function MinimalCTA() {
  return (
    <CTASection
      title="Need Help Getting Started?"
      description="Our team is here to guide you through your property investment journey."
      primaryButton={{
        text: "Contact Us",
        href: "/contact",
      }}
      secondaryButton={{
        text: "View FAQ",
        href: "/faq",
      }}
      backgroundColor="bg-gray-100"
      sectionPadding="py-12"
      containerMaxWidth="max-w-4xl mx-auto px-4"
    />
  );
}

// Example 4: CTA for newsletter signup
export function NewsletterCTA() {
  return (
    <CTASection
      title="Stay Updated with Market Insights"
      description="Get exclusive access to property deals, market analysis, and investment opportunities."
      primaryButton={{
        text: "Subscribe Now",
        href: "/newsletter",
      }}
      secondaryButton={{
        text: "Browse Properties",
        href: "/properties",
      }}
      backgroundImage="/hero-img2.webp"
      overlayClassName="bg-gradient-to-r from-blue-900/80 to-purple-900/80"
    />
  );
}

// Example 5: CTA with custom styling
export function CustomStyledCTA() {
  return (
    <CTASection
      title="Limited Time Offer"
      description="Get 50% off your first property analysis. Don't miss this exclusive opportunity."
      primaryButton={{
        text: "Claim Offer",
        href: "/special-offer",
      }}
      secondaryButton={{
        text: "Terms & Conditions",
        href: "/terms",
      }}
      backgroundImage="/hero-img.png"
      overlayClassName="bg-gradient-to-r from-orange-600/90 to-red-600/90"
      containerClassName="shadow-2xl"
      sectionPadding="py-24"
    />
  );
}

// Example 6: CTA without background image but with gradient background
export function GradientBackgroundCTA() {
  return (
    <CTASection
      title="Ready to Make Your Move?"
      description="Join our community of successful property investors and start building wealth today."
      primaryButton={{
        text: "Join Now",
        href: "/register",
      }}
      secondaryButton={{
        text: "View Success Stories",
        href: "/testimonials",
      }}
      backgroundColor="bg-gradient-to-r from-green-600 to-blue-600"
      className="text-white"
      containerClassName="shadow-xl"
    />
  );
}
