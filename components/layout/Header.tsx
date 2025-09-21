"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  Building2,
  TrendingUp,
  FileText,
  Users,
  Phone,
  Calculator,
  Home,
  Building,
  MapPin,
  Briefcase,
  BarChart3,
  Shield,
  Target,
  Settings,
  Lightbulb,
  Palette,
  Wrench,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NAVIGATION_ITEMS } from "@/constants";
import Image from "next/image";
import { disableHeaderWithFooter } from "@/utils/disableHeaderWithFooter";
import MegaMenu from "./MegaMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const mobileNavItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/investment-plans", label: "Investment Plans" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const shouldHideHeader = disableHeaderWithFooter.some((path) => {
    const pattern = path.replace(/\[.*\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });

  if (shouldHideHeader) return null;

  const isActive = (href: string) => pathname === href;

  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-[10vh] md:h-[15vh] flex items-center">
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
                  <Link href="/consultation" className="flex items-center">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet Menu */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg z-40 animate-in slide-in-from-top-2 duration-200">
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

              {/* Mobile Navigation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-3 text-base font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

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
                  href="/consultation"
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
