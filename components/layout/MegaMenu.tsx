// components/layout/MegaMenu.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Building,
  MapPin,
  Search,
  Calculator,
  Briefcase,
  Users,
  Wrench,
  Lightbulb,
  BarChart3,
  DollarSign,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function MegaMenu() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (prefixes: string[] | string) => {
    const arr = Array.isArray(prefixes) ? prefixes : [prefixes];
    return arr.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  };

  return (
    <NavigationMenu className="hidden xl:flex z-50 relative">
      <NavigationMenuList className="flex space-x-1">
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Company */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label="Open Company menu"
            className={`h-10 relative
              ${
                isGroupActive("/about")
                  ? "text-primary after:absolute after:left-3 after:right-3 after:-bottom-[2px] after:h-0.5 after:bg-primary"
                  : "text-foreground"
              }
              data-[state=open]:text-primary
            `}
          >
            Company
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="
              data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              duration-150
            "
          >
            <div className="grid w-[min(90vw,500px)] gap-3 p-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">
                  About Us
                </div>

                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    aria-current={pathname === "/about" ? "page" : undefined}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Our Story & Mission
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn about our journey and commitment
                    </p>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/about/why-choose-us"
                    aria-current={
                      pathname === "/about/why-choose-us" ? "page" : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Why Choose Noornest
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Discover what makes us different
                    </p>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/about/partners"
                    aria-current={
                      pathname === "/about/partners" ? "page" : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Partners & Affiliates
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Our trusted partners and network
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">
                  Contact
                </div>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    aria-current={pathname === "/contact" ? "page" : undefined}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Contact us
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/contact#contact-heading"
                    aria-current={
                      pathname === "/contact#contact-heading"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Contact Form
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Get in touch with our team
                    </p>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/contact#contact"
                    aria-current={
                      pathname === "/contact#contact" ? "page" : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Location & Map
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Find our office locations
                    </p>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/contact#contact"
                    aria-current={
                      pathname === "/contact#contact" ? "page" : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      WhatsApp / Phone
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Quick contact options
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Properties */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label="Open Properties menu"
            className={`h-10 relative
              ${
                isGroupActive("/properties")
                  ? "text-primary after:absolute after:left-3 after:right-3 after:-bottom-[2px] after:h-0.5 after:bg-primary"
                  : "text-foreground"
              }
              data-[state=open]:text-primary
            `}
          >
            Properties
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="
              data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              duration-150
            "
          >
            <div className="grid w-[min(90vw,600px)] gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/properties"
                    prefetch={false}
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <Building2 className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Browse All Properties
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Discover our complete collection of verified properties.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>

              <NavigationMenuLink asChild>
                <Link
                  href="/properties?type=apartments"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    Apartments
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Modern apartments in prime locations
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/properties?type=houses"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Houses</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Family homes and luxury houses
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/properties?type=land"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">Land</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Development land and plots
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/properties?type=commercial"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    Commercial
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Office spaces and commercial properties
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/properties?featured=true"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    Featured / Premium
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Our premium property selection
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Blog */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label="Open Blog menu"
            className={`h-10 relative
              ${
                isGroupActive([
                  "/blog",
                  "/blog/?=market-trends",
                  "/blog/?=investment-education",
                  "/blog/?=property-tips",
                ])
                  ? "text-primary after:absolute after:left-3 after:right-3 after:-bottom-[2px] after:h-0.5 after:bg-primary"
                  : "text-foreground"
              }
              data-[state=open]:text-primary
            `}
          >
            Blog
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="
              data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              duration-150
            "
          >
            <div className="grid w-[min(90vw,400px)] gap-3 p-4">
              <NavigationMenuLink asChild>
                <Link
                  href="/blog"
                  aria-current={pathname === "/blog" ? "page" : undefined}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    Insights
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Latest insights
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/blog?=market-trends"
                  aria-current={
                    pathname === "/blog?=market-trends" ? "page" : undefined
                  }
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    Market Trends
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Latest real estate market insights
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/blog?=investment-education"
                  aria-current={
                    pathname === "/blog?=investment-education"
                      ? "page"
                      : undefined
                  }
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    Investment Education
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Learn about property investment strategies
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/blog?=property-tips"
                  aria-current={
                    pathname === "/blog?=property-tips" ? "page" : undefined
                  }
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    Property Tips
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Expert advice for property owners and buyers
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Investment Plans */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label="Open Investment Plans menu"
            className={`h-10 relative
              ${
                isGroupActive("#")
                  ? "text-primary after:absolute after:left-3 after:right-3 after:-bottom-[2px] after:h-0.5 after:bg-primary"
                  : "text-foreground"
              }
              data-[state=open]:text-primary
            `}
          >
            Investment Plans
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="
              data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              duration-150
            "
          >
            <div className="grid w-[min(90vw,500px)] gap-3 p-4 md:grid-cols-2">
              <NavigationMenuLink asChild>
                <Link
                  href="/investment-plans/equity-nest"
                  aria-current={
                    pathname === "/investment-plans/equity-nest"
                      ? "page"
                      : undefined
                  }
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <div className="text-sm font-medium leading-none">
                      Equity Nest
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Profit sharing investment opportunities
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/investment-plans/yield-nest"
                  aria-current={
                    pathname === "/investment-plans/yield-nest"
                      ? "page"
                      : undefined
                  }
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <div className="text-sm font-medium leading-none">
                      Yield Nest
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Rental income investment plans
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/investment-plans/secure-nest"
                  aria-current={
                    pathname === "/investment-plans/secure-nest"
                      ? "page"
                      : undefined
                  }
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <div className="text-sm font-medium leading-none">
                      Secure Nest
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Fixed return investment plans
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/investment-plans/opportunity-nest"
                  aria-current={
                    pathname === "/investment-plans/opportunity-nest"
                      ? "page"
                      : undefined
                  }
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center">
                    <Target className="mr-2 h-4 w-4" />
                    <div className="text-sm font-medium leading-none">
                      Opportunity Nest
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Below market value properties
                  </p>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="/investment-plans/compare-investment-plans"
                  aria-current={
                    pathname === "/investment-plans/compare-investment-plans"
                      ? "page"
                      : undefined
                  }
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center">
                    <Target className="mr-2 h-4 w-4" />
                    <div className="text-sm font-medium leading-none">
                      Compare Investment Plans
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Complare value properties
                  </p>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label="Open Services menu"
            className={`h-10 relative
              ${
                isGroupActive("/services")
                  ? "text-primary after:absolute after:left-3 after:right-3 after:-bottom-[2px] after:h-0.5 after:bg-primary"
                  : "text-foreground"
              }
              data-[state=open]:text-primary
            `}
          >
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="
              data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              duration-150
            "
          >
            <div className="grid w-[min(90vw,600px)] gap-3 p-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">
                  Property Solutions
                </div>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/property-solutions/property-management"
                    aria-current={
                      pathname ===
                      "/services/property-solutions/property-management"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Property Management
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/property-solutions/sales-and-marketing"
                    aria-current={
                      pathname ===
                      "/services/property-solutions/sales-and-marketing"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Sales & Marketing
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/property-solutions/property-rentals-and-shortlets"
                    aria-current={
                      pathname ===
                      "/services/property-solutions/property-rentals-and-shortlets"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Rentals & Short-Lets
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/property-solutions/property-sourcing"
                    aria-current={
                      pathname ===
                      "/services/property-solutions/property-sourcing"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <Search className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Property Sourcing
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">
                  Advisory & Enhancements
                </div>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/advisory-and-enhancements/valuation-and-due-diligence"
                    aria-current={
                      pathname ===
                      "/services/advisory-and-enhancements/valuation-and-due-diligence"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <Calculator className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Valuation & Due Diligence
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/advisory-and-enhancements/investment-advisory"
                    aria-current={
                      pathname ===
                      "/services/advisory-and-enhancements/investment-advisory"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Investment Advisory
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/advisory-and-enhancements/real-estate-consultancy"
                    aria-current={
                      pathname ===
                      "/services/advisory-and-enhancements/real-estate-consultancy"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Real Estate Consultancy
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/advisory-and-enhancements/property-refurbishment-and-renovation"
                    aria-current={
                      pathname ===
                      "/services/advisory-and-enhancements/property-refurbishment-and-renovation"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <Wrench className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Refurbishment & Renovation
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>

                <NavigationMenuLink asChild>
                  <Link
                    href="/services/advisory-and-enhancements/interior-design-and-furnishing"
                    aria-current={
                      pathname ===
                      "/services/advisory-and-enhancements/interior-design-and-furnishing"
                        ? "page"
                        : undefined
                    }
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      <div className="text-sm font-medium leading-none">
                        Interior Design & Furnishing
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* Anchor the viewport under the active trigger (edge-aware) */}
      <div className="absolute left-0 top-full flex w-full justify-start z-[60] pointer-events-none">
        <NavigationMenuViewport
          className="
            pointer-events-auto
            [transform:translate3d(var(--radix-navigation-menu-viewport-transform,0),0,0)]
          "
        />
      </div>
    </NavigationMenu>
  );
}
