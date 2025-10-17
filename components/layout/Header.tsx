"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, Search, ChevronDown, Calendar } from "lucide-react";
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

type MobileLink = { label: string; href: string };
type MobileSection = { title?: string; links: MobileLink[] };
type MobileGroup = {
  key: string; // unique value for AccordionItem
  label: string; // shown in the trigger
  href?: string; // optional parent landing link (unused here, but handy)
  prefixes: string[]; // route prefixes to detect active/open state
  sections: MobileSection[]; // rendered inside dropdown
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Early exits (same as your original)
  if (pathname.startsWith("/dashboard")) return null;

  const shouldHideHeader = disableHeaderWithFooter.some((path) => {
    const pattern = path.replace(/\[.*\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });
  if (shouldHideHeader) return null;

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (prefixes: string[] | string) => {
    const arr = Array.isArray(prefixes) ? prefixes : [prefixes];
    return arr.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  };

  // Top “flat” mobile items (only Home stays flat)
  const mobileSingles: MobileLink[] = [{ href: "/", label: "Home" }];

  // Dropdown groups for mobile (mirrors your desktop mega menu)
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
      key: "properties",
      label: "Properties",
      prefixes: ["/properties"],
      sections: [
        {
          links: [
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
        "/blog/market-trends",
        "/blog/investment-education",
        "/blog/property-tips",
      ],
      sections: [
        {
          links: [
            { href: "/blog", label: "Insights" },
            { href: "/blog/market-trends", label: "Market Trends" },
            {
              href: "/blog/investment-education",
              label: "Investment Education",
            },
            { href: "/blog/property-tips", label: "Property Tips" },
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
  ];

  // Open the matching group(s) by default when the sheet opens
  const defaultOpen = useMemo(
    () =>
      mobileGroups.filter((g) => isGroupActive(g.prefixes)).map((g) => g.key),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <header
      className="top-0 z-[10000] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-[10vh] md:h-[15vh] flex items-center"
      style={{ zIndex: 10000 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="space-x-3">
            <Image
              src="/noornest-logo.png"
              alt="Noornest Properties logo"
              width={150}
              height={150}
            />
          </Link>

          {/* Desktop Navigation */}
          <MegaMenu />

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  Get Started
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Get Started</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
                <Menu className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet Menu */}
        {isMenuOpen && (
          <div
            className="xl:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-[200] animate-in slide-in-from-top-2 duration-200"
            style={{ zIndex: 200 }}
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
                    className={`block px-3 py-3 text-base font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
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
                        className={`px-3 py-3 text-base font-medium rounded-md hover:no-underline
                          ${active ? "text-primary" : "text-foreground"}
                        `}
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
                                <div className="px-3 text-sm font-medium text-muted-foreground">
                                  {sec.title}
                                </div>
                              )}
                              <div className="grid grid-cols-1 gap-2">
                                {sec.links.map((link) => {
                                  const current = isActive(link.href);
                                  return (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      className={`block px-3 py-2 rounded-md transition-colors ${
                                        current
                                          ? "text-primary bg-primary/10"
                                          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                                      }`}
                                      aria-current={
                                        current ? "page" : undefined
                                      }
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
              <div className="pt-4 border-t space-y-2">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
