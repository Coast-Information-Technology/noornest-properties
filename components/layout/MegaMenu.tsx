"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
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
} from "@/components/ui/navigation-menu";

export default function MegaMenu() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <NavigationMenu className="hidden xl:flex" viewport={false}>
      <NavigationMenuList className="flex space-x-1">
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* About Us */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <Link href="/about">About Us</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4">
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
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
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Properties */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <Link href="/properties">Properties</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/properties"
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

        {/* Investment Plans */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <Link href="/investment-plans">Investment Plans</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
              <NavigationMenuLink asChild>
                <Link
                  href="/investment-plans/equity-nest"
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
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <Link href="/services">Services</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">
                  Property Solutions
                </div>
                <NavigationMenuLink asChild>
                  <Link
                    href="/services/property-management"
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
                    href="/services/sales-marketing"
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
                    href="/services/rentals"
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
                    href="/services/property-sourcing"
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
                    href="/services/valuation"
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
                    href="/services/investment-advisory"
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
                    href="/services/consultancy"
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
                    href="/services/refurbishment"
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
                    href="/services/interior-design"
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

        {/* Blog */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <Link href="/blog">Blog</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4">
              <NavigationMenuLink asChild>
                <Link
                  href="/blog/market-trends"
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
                  href="/blog/investment-education"
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
                  href="/blog/property-tips"
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

        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10">
            <Link href="/contact">Contact</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4">
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
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
                  href="/contact/location"
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
                  href="/contact/whatsapp"
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
