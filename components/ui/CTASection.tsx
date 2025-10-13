"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedText from "@/components/ui/AnimatedText";

export interface CTASectionProps {
  // Content
  title: string;
  description?: string;

  // Buttons
  primaryButton?: {
    text: string;
    href: string;
    className?: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
    className?: string;
  };

  // Background
  backgroundImage?: string;
  backgroundColor?: string;

  // Styling
  className?: string;
  containerClassName?: string;
  overlayClassName?: string;

  // Layout
  sectionPadding?: string;
  containerMaxWidth?: string;
}

export default function CTASection({
  title,
  description,
  primaryButton = undefined,
  secondaryButton = undefined,
  backgroundImage,
  backgroundColor = "bg-gray-50",
  className = "",
  containerClassName = "",
  overlayClassName = "",
  sectionPadding = "py-20",
  containerMaxWidth = "container mx-auto px-4 md:px-16",
}: CTASectionProps) {
  const hasBackgroundImage = Boolean(backgroundImage);

  return (
    <section className={`${sectionPadding} ${className}`}>
      <div className={containerMaxWidth}>
        <div
          className={`rounded-2xl relative overflow-hidden ${
            hasBackgroundImage ? "" : backgroundColor
          } ${containerClassName}`}
          style={
            hasBackgroundImage
              ? {
                  backgroundImage: `url('${backgroundImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
        >
          {/* Background overlay - only show if there's a background image */}
          {hasBackgroundImage && (
            <div className={`absolute inset-0 ${overlayClassName}`}></div>
          )}

          <AnimatedSection className="flex flex-col lg:flex-row justify-between items-center py-12 px-4 lg:px-8 text-center text-white relative z-10">
            <div>
              <AnimatedText
                as="h2"
                className="text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left"
              >
                {title}
              </AnimatedText>
              <AnimatedText
                as="p"
                className="text-md mb-8 opacity-90 max-w-2xl mx-auto text-center lg:text-left"
                delay={0.2}
              >
                {description}
              </AnimatedText>
            </div>

            <AnimatedSection
              className="flex flex-col sm:flex-row gap-4 justify-center"
              delay={0.4}
            >
              {primaryButton && (
                <Button asChild size="lg" className={primaryButton.className}>
                  <Link
                    href={primaryButton.href}
                    className={primaryButton.className}
                  >
                    {primaryButton.text}
                  </Link>
                </Button>
              )}
              {secondaryButton && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className={secondaryButton.className}
                >
                  <Link
                    href={secondaryButton.href}
                    className={secondaryButton.className}
                  >
                    {secondaryButton.text}
                  </Link>
                </Button>
              )}
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
