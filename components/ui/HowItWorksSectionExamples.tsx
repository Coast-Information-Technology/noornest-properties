// components/ui/HowItWorksSectionExamples.tsx
// This file shows different ways to use the HowItWorksSection component

import HowItWorksSection from "./HowItWorksSection";
import {
  Calendar,
  Target,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

// Example 1: Default booking process
export function DefaultBookingProcess() {
  return (
    <HowItWorksSection
      title="How It Works"
      footerText="First consultation is completely free."
    />
  );
}

// Example 2: Property investment process
export function PropertyInvestmentProcess() {
  const investmentSteps = [
    {
      icon: "Target",
      title: "Define Your Goals",
      description: "Investment strategy and budget",
    },
    {
      icon: "Calendar",
      title: "Property Analysis",
      description: "BMV and yield calculations",
    },
    {
      icon: "CheckCircle",
      title: "Make Your Move",
      description: "Secure your investment",
    },
  ];

  return (
    <HowItWorksSection
      title="Investment Process"
      steps={investmentSteps}
      footerText="Expert guidance throughout your journey."
      titleColor="text-[#C8A970]"
      iconBackgroundColor="bg-[#C8A970]"
      connectorColor="border-[#C8A970]"
    />
  );
}

// Example 3: Contact process
export function ContactProcess() {
  const contactSteps = [
    {
      icon: "MessageSquare",
      title: "Get in Touch",
      description: "Call, email, or message us",
    },
    {
      icon: "Calendar",
      title: "Schedule Meeting",
      description: "Choose your preferred time",
    },
    {
      icon: "Phone",
      title: "Speak to Expert",
      description: "Get personalized advice",
    },
  ];

  return (
    <HowItWorksSection
      title="Contact Process"
      steps={contactSteps}
      footerText="We're here to help you succeed."
      backgroundColor="bg-gray-50"
      titleColor="text-primary"
      iconBackgroundColor="bg-primary"
      connectorColor="border-primary"
    />
  );
}

// Example 4: Service booking process
export function ServiceBookingProcess() {
  const serviceSteps = [
    {
      icon: "Target",
      title: "Choose Service",
      description: "Property management or sales",
    },
    {
      icon: "Calendar",
      title: "Book Consultation",
      description: "Free initial assessment",
    },
    {
      icon: "User",
      title: "Meet Your Team",
      description: "Dedicated property experts",
    },
  ];

  return (
    <HowItWorksSection
      title="Our Services"
      steps={serviceSteps}
      footerText="Professional service guaranteed."
      backgroundColor="bg-white"
      titleColor="text-[#C8A970]"
      iconBackgroundColor="bg-[#C8A970]"
      textColor="text-gray-800"
      connectorColor="border-[#C8A970]"
    />
  );
}

// Example 5: Dark themed process
export function DarkThemedProcess() {
  return (
    <HowItWorksSection
      title="How It Works"
      footerText="First consultation is completely free."
      backgroundColor="bg-gray-900"
      titleColor="text-[#C8A970]"
      iconBackgroundColor="bg-[#C8A970]"
      textColor="text-white"
      connectorColor="border-[#C8A970]"
      className="text-white"
    />
  );
}

// Example 6: Compact version
export function CompactProcess() {
  return (
    <HowItWorksSection
      title="Simple Process"
      footerText="Get started in 3 easy steps."
      className="py-12"
      backgroundColor="bg-white"
    />
  );
}
