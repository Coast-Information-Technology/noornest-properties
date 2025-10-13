"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LeftSectionContent {
  label: string;
  heading: string;
  description?: string;
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
}

interface Parallax {
  title: string;
  description: string;
  image: string;
}

interface ParallaxProps {
  principles: Parallax[];
  leftContent: LeftSectionContent;
}

export const Parallax: React.FC<ParallaxProps> = ({
  principles,
  leftContent,
}) => {
  return (
    <section
      className="grid md:grid-cols-2 bg-white relative min-h-screen"
      aria-labelledby="core-principles-heading"
    >
      {/* Left Section (Sticky) */}
      <div className="px-6 pt-16 pb-12 md:p-12 lg:p-16 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center bg-accent">
        <h3 className="text-sm uppercase font-semibold text-gray-800 tracking-wide">
          {leftContent.label}
        </h3>
        <h2
          id="core-principles-heading"
          className="text-3xl md:text-4xl font-bold text-[#b9974a] mt-2 mb-3 leading-snug"
        >
          {leftContent.heading}
        </h2>
        <p className="text-gray-700 mb-8 max-w-sm">{leftContent.description}</p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={leftContent.primaryCta?.href || ""}
            aria-label={leftContent.primaryCta?.label || ""}
          >
            <Button>{leftContent.primaryCta?.label || ""}</Button>
          </Link>

          {leftContent.secondaryCta && (
            <Link
              href={leftContent.secondaryCta.href}
              aria-label={leftContent.secondaryCta.label}
            >
              <Button variant="ghost">{leftContent.secondaryCta.label}</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Right Section (Scrollable content) */}
      <div className="flex flex-col justify-start bg-white border-gray-300">
        {principles.map((item, index) => (
          <div
            key={index}
            className={`border-b border-gray-300 ${
              index === principles.length - 1 ? "border-none" : ""
            }`}
          >
            <div className="px-6 py-20">
              <div className="w-full h-[220px] md:w-[420px] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mt-4">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-2 max-w-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
