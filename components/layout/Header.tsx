// components/layout/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  Search,
  ChevronDown,
  Calendar,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { disableHeaderWithFooter } from "@/utils/disableHeaderWithFooter";
import MegaMenu from "./MegaMenu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUser } from "@/contexts/UserContext";

type MobileLink = { label: string; href: string };
type MobileSection = { title?: string; links: MobileLink[] };
type MobileGroup = {
  key: string;
  label: string;
  href?: string;
  prefixes: string[];
  sections: MobileSection[];
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const canAccessDashboard = Boolean(user && user.role !== "guest");

  // Early exits (no hooks below should be conditional)
  if (pathname.startsWith("/dashboard")) return null;

  const shouldHideHeader = disableHeaderWithFooter.some((path) => {
    const pattern = path.replace(/\[.*\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });
  if (shouldHideHeader) return null;

  const normalizePath = (href: string) => href.split("?")[0];
  const isActiveExact = (href: string) => pathname === normalizePath(href);
  const isGroupActive = (prefixes: string[] | string) => {
    const arr = Array.isArray(prefixes) ? prefixes : [prefixes];
    return arr.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  };

  // Top “flat” mobile items (only Home stays flat)
  const mobileSingles: MobileLink[] = [{ href: "/", label: "Home" }];

  // Dropdown groups for mobile (mirrors desktop mega menu)
  const mobileGroups: MobileGroup[] = [
    {
      key: "company",
      label: "Company",
      prefixes: ["/about", "/contact"],
      sections: [
        {
          title: "About Us",
          links: [
            { href: "/about", label: "Our Story & Mission" },
            { href: "/about/why-choose-us", label: "Why Choose Noornest" },
            { href: "/about/partners", label: "Partners & Affiliates" },
          ],
        },
        {
          title: "Contact",
          links: [
            { href: "/contact", label: "Contact Form" },
            { href: "/contact/location", label: "Location & Map" },
            { href: "/contact/whatsapp", label: "WhatsApp / Phone" },
          ],
        },
      ],
    },
    {
      key: "services",
      label: "Services",
      prefixes: ["/services"],
      sections: [
        {
          title: "Property Solutions",
          links: [
            {
              href: "/services/property-solutions/property-management",
              label: "Property Management",
            },
            {
              href: "/services/property-solutions/sales-and-marketing",
              label: "Sales & Marketing",
            },
            {
              href: "/services/property-solutions/property-rentals-and-shortlets",
              label: "Rentals & Short-Lets",
            },
            {
              href: "/services/property-solutions/property-sourcing",
              label: "Property Sourcing",
            },
          ],
        },
        {
          title: "Advisory & Enhancements",
          links: [
            {
              href: "/services/advisory-and-enhancements/valuation-and-due-diligence",
              label: "Valuation & Due Diligence",
            },
            {
              href: "/services/advisory-and-enhancements/investment-advisory",
              label: "Investment Advisory",
            },
            {
              href: "/services/advisory-and-enhancements/real-estate-consultancy",
              label: "Real Estate Consultancy",
            },
            {
              href: "/services/advisory-and-enhancements/property-refurbishment-and-renovation",
              label: "Refurbishment & Renovation",
            },
            {
              href: "/services/advisory-and-enhancements/interior-design-and-furnishing",
              label: "Interior Design & Furnishing",
            },
          ],
        },
      ],
    },
    {
      key: "properties",
      label: "Properties",
      prefixes: ["/properties"],
      sections: [
        {
          links: [
            { href: "/properties", label: "Properties" },
            { href: "/properties?type=apartments", label: "Apartments" },
            { href: "/properties?type=houses", label: "Houses" },
            { href: "/properties?type=land", label: "Land" },
            { href: "/properties?type=commercial", label: "Commercial" },
            { href: "/properties?featured=true", label: "Featured / Premium" },
          ],
        },
      ],
    },
    {
      key: "blog",
      label: "Blog",
      prefixes: [
        "/blog",
        "/blog?=market-trends",
        "/blog?investment-education",
        "/blog?property-tips",
      ],
      sections: [
        {
          links: [
            { href: "/blog", label: "Insights" },
            { href: "/blog?=market-trends", label: "Market Trends" },
            {
              href: "/blog?=investment-education",
              label: "Investment Education",
            },
            { href: "/blog?=property-tips", label: "Property Tips" },
          ],
        },
      ],
    },
    {
      key: "plans",
      label: "Investment Plans",
      prefixes: ["/investment-plans"],
      sections: [
        {
          links: [
            { href: "/investment-plans/equity-nest", label: "Equity Nest" },
            { href: "/investment-plans/yield-nest", label: "Yield Nest" },
            { href: "/investment-plans/secure-nest", label: "Secure Nest" },
            {
              href: "/investment-plans/opportunity-nest",
              label: "Opportunity Nest",
            },
          ],
        },
      ],
    },
  ];

  // NOT a hook: avoids conditional hook call error
  const defaultOpen = mobileGroups
    .filter((g) => isGroupActive(g.prefixes))
    .map((g) => g.key);

  return (
    <header
      className="relative z-[1000] isolate border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between w-full px-3 lg:px-6 py-4"
    >
      {/* Logo */}
      <Link href="/" className="space-x-3 flex-shrink-0" aria-label="Noornest Properties Home">
        <Image
          src="/noornest-logo.png"
          alt="Noornest Properties logo"
          width={150}
          height={150}
          quality={85}
          sizes="150px"
          className="h-auto w-[150px]"
        />
      </Link>

      {/* Desktop Navigation */}
      <MegaMenu />

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 bg-primary py-2 px-3 rounded-[8px] text-white font-bold cursor-pointer"
              aria-label={canAccessDashboard ? "Account Options" : "Get Started Options"}
            >
              {canAccessDashboard ? "My Account" : isLoading ? "Account" : "Get Started"}
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="bg-primary rounded-[5px]">
              {canAccessDashboard ? user?.name || "Signed in" : isLoading ? "Checking session" : "Get Started"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isLoading ? (
              <DropdownMenuItem disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Checking session...</span>
              </DropdownMenuItem>
            ) : canAccessDashboard ? (
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Go to Dashboard</span>
                </Link>
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/register" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/booking" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Book a Consultation</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMenuOpen && (
        <div
          className="xl:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-[1001] animate-in slide-in-from-top-2 duration-200"
        >
          <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Flat items (Home) */}
            <div className="grid grid-cols-1 gap-2">
              {mobileSingles.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-3 text-base font-medium rounded-md transition-colors ${isActiveExact(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  aria-current={isActiveExact(item.href) ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Dropdown groups */}
            <Accordion
              type="multiple"
              defaultValue={defaultOpen}
              className="w-full"
            >
              {mobileGroups.map((group) => {
                const active = isGroupActive(group.prefixes);
                return (
                  <AccordionItem
                    key={group.key}
                    value={group.key}
                    className="border-b"
                  >
                    <AccordionTrigger
                      className={`px-3 py-3 text-base
                           font-medium rounded-md hover:no-underline ${active ? "text-primary" : "text-foreground"
                        }`}
                    >
                      <span>{group.label}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <div className="space-y-3">
                        {group.sections.map((sec, sIdx) => (
                          <div
                            key={`${group.key}-sec-${sIdx}`}
                            className="space-y-2"
                          >
                            {sec.title && (
                              <div className="px-3 text-base font-medium text-black border-b">
                                {sec.title}
                              </div>
                            )}
                            <div className="grid grid-cols-1 gap-2">
                              {sec.links.map((link) => {
                                const current =
                                  pathname === normalizePath(link.href);
                                return (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-3 py-2 text-base rounded-md transition-colors ${current
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                                      }`}
                                    aria-current={current ? "page" : undefined}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {link.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {/* Additional Mobile Actions */}
            {/* <div className="hidden pt-4 border-t space-y-2">
              <Link
                href="/register"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors text-primary hover:bg-primary/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Register
              </Link>
              <Link
                href="/login"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors text-primary hover:bg-primary/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Login
              </Link>
              <Link
                href="/booking"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Consultation
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </header>
  );
}
