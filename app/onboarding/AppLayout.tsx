"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Image from "next/image";
import { SquareCheck } from "lucide-react";

const roleContent = {
  user: {
    image: "/user.avif",
    benefits: [
      "Save & track properties and bookings",
      "Access Equity / Yield / Secure / Opportunity Nests",
      "Get tailored updates and expert support",
    ],
  },
  agent: {
    image: "/agent.avif",
    benefits: [
      "List and manage your properties easily",
      "Connect with qualified buyers and investors",
      "Access professional tools and market insights",
    ],
  },
  investor: {
    image: "/investor.avif",
    benefits: [
      "Access exclusive high-yield investment deals",
      "Get detailed market analysis and ROI projections",
      "Direct support from property investment experts",
    ],
  },
  default: {
    image: "/login-image.png",
    benefits: [
      "Save & track properties and bookings",
      "Access Equity / Yield / Secure / Opportunity Nests",
      "Get tailored updates and expert support",
    ],
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Determine role from pathname
  let role: keyof typeof roleContent = "default";
  if (pathname.includes("/onboarding/user")) role = "user";
  else if (pathname.includes("/onboarding/agent")) role = "agent";
  else if (pathname.includes("/onboarding/investor")) role = "investor";

  const { image, benefits } = roleContent[role];

  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-white">
      {/* Left Section (Hero + Benefits) */}
      <section
        aria-label="Property showcase"
        className="relative hidden md:flex md:w-1/2 bg-gray-900 text-white items-center justify-center m-6 rounded-[16px]"
      >
        <div className="absolute inset-0 rounded-[16px]">
          <Image
            src={image}
            alt={`Hero image for ${role} onboarding`}
            fill
            className="h-full w-full object-cover rounded-[16px]"
            priority
          />
        </div>
        <div
          className="absolute inset-0 bg-black/40 rounded-[16px]"
          aria-hidden="true"
        ></div>

        <div className="absolute bottom-12 p-6 max-w-2xl">
          <div className="mt-6 border-primary bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/20 rounded-lg p-4 md:px-8 md:py-6 lg:px-12 lg:py-8">
            <h2 className="text-xl font-bold">Benefits</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-yellow-400">
                    <SquareCheck className="bg-primary" size={20} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Right Section (Form + Social login) */}
      <section
        aria-label="Authentication section"
        className="flex flex-col w-full md:w-1/2 items-center justify-center p-6 md:p-12 overflow-y-auto"
      >
        <Link href="/" className="flex justify-center max-w-md w-full mb-8">
          <Image
            src="/noornest-logo.png"
            alt="Noornest"
            width={120}
            height={120}
          />
        </Link>
        <div className="w-full max-w-md">
          {/* Dynamic Content (Onboarding form) */}
          {children}
        </div>
      </section>
    </main>
  );
}
