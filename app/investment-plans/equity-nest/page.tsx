import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-white overflow-hidden -z-30">
        {/* Absolute Pseudo-Element for Gold Background (bg-primary) 
                This creates the fixed-height gold block sitting underneath the content. */}
        <div
          className="absolute inset-x-0 top-0 h-[90vh] bg-primary z-0"
          // Note: I'm using a fixed height (e.g., 400px) here. Adjust this value
          // to control how much of the gold background you want visible.
        />

        {/* Hero Content Area - Relative z-index to sit on top of the gold background */}
        <div className="relative z-10 py-16">
          {/* Top Section with Text and Buttons */}
          <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Design That Inspires. <br />
              Interiors That Add Value.
            </h1>
            <p className="text-base text-white max-w-2xl mb-8">
              From concept to completion, Noornest transforms spaces with
              professional interior design and furnishing solutions that blend
              style, function, and investment value.
            </p>
            <Link
              href="/booking"
              className="flex justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"
            >
              <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-colors duration-300">
                Book a consultation
              </Button>
            </Link>
          </div>

          {/* Image Section - Positioned relative to the main content flow, pulled down to overlap */}
          <div className="flex justify-center">
            <div className="w-[90%] md:w-[80%] h-full md:h-[500px] max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden mx-auto">
              <Image
                src="/blog/blog-hero.png"
                alt="Modern family house"
                width={800}
                height={300}
                layout="responsive"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Invest Equity Nest */}
      <section className="bg-amber-50 py-20 px-6 md:px-16 text-center lg:mt-16">
        <div className="w-full md:max-w-4xl mx-auto">
          <h3 className="text-lg tracking-wide text-black uppercase font-bold">
            Invest
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-snug mb-3">
            Making property simple, secure, and smarter for everyone.
          </h2>
          <p className="text-gray-600 mb-8 md:max-w-3xl">
            We remove complexity from real estate with verified listings, clear
            processes, and flexible investment options — so customers can make
            confident decisions, wherever they are.
          </p>
          <div className="flex items-center gap-4 justify-center">
            <Link href="/about">
              <Button>Learn more</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Contact us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
