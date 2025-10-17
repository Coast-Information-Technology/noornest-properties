"use client";

import React from "react";
import {
  Calendar,
  Target,
  User,
  LucideIcon,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export interface HowItWorksStep {
  icon: string; // Icon name as string
  title: string;
  description: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Target,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
};

export interface HowItWorksSectionProps {
  title?: string;
  steps?: HowItWorksStep[];
  footerText?: string;
  className?: string;
  backgroundColor?: string;
  titleColor?: string;
  iconBackgroundColor?: string;
  textColor?: string;
  connectorColor?: string;
  footerBackgroundColor?: string;
}

const defaultSteps: HowItWorksStep[] = [
  {
    icon: "Calendar",
    title: "Choose a Date & Time",
    description: "Pick what works for you",
  },
  {
    icon: "Target",
    title: "Tell Us Your Goals",
    description: "Property, investment, or services",
  },
  {
    icon: "User",
    title: "Meet an Advisor",
    description: "Online or in-person, you decide",
  },
];

export default function HowItWorksSection({
  title = "How It Works",
  steps = defaultSteps,
  footerText = "First consultation is completely free.",
  className = "",
  backgroundColor = "bg-white",
  titleColor = "text-[#C8A970]",
  iconBackgroundColor = "bg-[#C8A970]",
  textColor = "text-gray-900",
  footerBackgroundColor = "bg-accent",
}: HowItWorksSectionProps) {
  return (
    <section
      className={`py-16 px-6 md:px-16 md:py-20 ${backgroundColor} ${className}`}
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <AnimatedSection>
          <h2
            id="how-it-works-heading"
            className={`text-3xl md:text-4xl font-bold ${titleColor} mb-16`}
          >
            {title}
          </h2>
        </AnimatedSection>

        {/* Steps Container */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <AnimatedSection
                key={index}
                delay={0.1 * index}
                className="flex flex-col items-center text-center flex-1 relative"
              >
                {/* Icon Container with Glow Effect */}
                <div className="relative mb-6">
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-xl blur-lg opacity-30 ${
                      index === 0
                        ? "bg-gradient-to-r from-purple-400 to-pink-400"
                        : index === 1
                        ? "bg-gradient-to-r from-blue-400 to-green-400"
                        : "bg-gradient-to-r from-pink-400 to-orange-400"
                    }`}
                    style={{ transform: "scale(1.2)" }}
                  />

                  {/* Icon Container */}
                  <div
                    className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl ${iconBackgroundColor} text-white shadow-lg`}
                  >
                    {React.createElement(iconMap[step.icon] || User, {
                      className: "w-8 h-8",
                      "aria-hidden": true,
                    })}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-lg md:text-xl font-bold ${textColor} mb-2 leading-tight`}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm md:text-base text-gray-600 leading-relaxed max-w-xs`}
                >
                  {step.description}
                </p>

                {/* Connector Line - Only for desktop and not last item */}
                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute top-10 left-full w-full h-0.5"
                  >
                    <div className="relative w-full">
                      {/* Dotted Line */}
                      {/* <div
                        className={`w-full border-t-2 border-dotted ${connectorColor}`}
                      ></div> */}

                      {/* Dots along the line */}
                      {/* <div className="absolute top-0 left-0 w-full flex justify-between">
                        {[...Array(5)].map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-2 h-2 rounded-full ${iconBackgroundColor.replace(
                              "bg-",
                              "bg-"
                            )} -mt-1`}
                            style={{
                              left: `${dotIndex * 25}%`,
                            }}
                          />
                        ))}
                      </div> */}
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <AnimatedSection delay={0.4}>
          <p
            className={`mt-12 text-base md:text-lg ${textColor} ${footerBackgroundColor} font-medium w-fit mx-auto px-8 py-4 rounded-lg`}
          >
            {footerText}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
