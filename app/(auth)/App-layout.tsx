"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Image from "next/image";
import { SquareCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="flex min-h-screen flex-col md:flex-row bg-white">
      {/* Left Section (Hero + Benefits) */}
      <section
        aria-label="Property showcase"
        className="relative hidden md:flex md:w-1/2 bg-gray-900 text-white items-center justify-center m-6 rounded-[16px]"
      >
        <div className="absolute inset-0 rounded-[16px]">
          <Image
            src="/login-image.png"
            alt="Modern brick house with warm lights"
            width={300}
            height={300}
            className="h-full w-full object-cover rounded-[16px]"
          />
        </div>
        <div
          className="absolute inset-0 bg-black/40 rounded-[16px]"
          aria-hidden="true"
        ></div>

        <div className="absolute bottom-12 p-6 max-w-2xl">
          <div className="mt-6 border-primary bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/20 rounded-lg p-4 md:px-8 md:py-6  lg:px-12 lg:py-8">
            <h2 className="text-xl font-bold">Benefits</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2 text-yellow-400">
                  <SquareCheck className="bg-primary" size={20} />
                </span>
                Save &amp; track properties and bookings
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-400">
                  <SquareCheck className="bg-primary" size={20} />
                </span>
                Access Equity / Yield / Secure / Opportunity Nests
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yellow-400">
                  <SquareCheck className="bg-primary" size={20} />
                </span>
                Get tailored updates and expert support
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Right Section (Form + Social login) */}
      <section
        aria-label="Authentication section"
        className="flex flex-col w-full md:w-1/2 items-center justify-center p-6 md:p-12"
      >
        <div className="flex justify-end max-w-md w-full">
          <Image
            src="/noornest-logo.png"
            alt="Noornest"
            width={120}
            height={120}
            className="mb-6"
          />
        </div>
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div
            role="tablist"
            className="flex rounded-md overflow-hidden border mb-6 p-2 bg-accent gap-2"
          >
            <Link
              role="tab"
              aria-selected={pathname === "/login"}
              href="/login"
              className={`flex-1 text-center py-2 text-sm font-medium ${
                pathname === "/login"
                  ? "bg-primary text-background rounded-md"
                  : "text-gray-700 hover:bg-gray-200 rounded-md"
              }`}
            >
              Login
            </Link>
            <Link
              role="tab"
              aria-selected={pathname === "/register"}
              href="/register"
              className={`flex-1 text-center py-2 text-sm font-medium ${
                pathname === "/register"
                  ? "bg-primary text-background rounded-md"
                  : "text-gray-700 hover:bg-gray-200 rounded-md"
              }`}
            >
              Register
            </Link>
          </div>

          {/* Dynamic Content (Login/Register form) */}
          {children}

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            aria-label="Sign in with Google"
            className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 text-sm font-medium text-gray-700 bg-accent hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <Image
              src="/icons/search.png"
              alt=""
              className="h-5 w-5"
              aria-hidden="true"
              width={50}
              height={50}
            />
            Continue with Google
          </button>
        </div>
      </section>
    </main>
  );
}
