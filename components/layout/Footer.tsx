"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/constants";
import { disableHeaderWithFooter } from "@/utils/disableHeaderWithFooter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const shouldHideHeader = disableHeaderWithFooter.some((path) => {
    const pattern = path.replace(/\[.*\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });

  if (shouldHideHeader) return null;

  return (
    <footer
      className="bg-accent/30 border-t border-accent"
      style={{
        background: `url('/footer-bg-image.png') no-repeat center center`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/noornest-footer-logo.png"
              alt="noornest properties logo"
              width={150}
              height={150}
            />
            <p className="text-muted-foreground text-sm">
              Your trusted partner in real estate investment. Discover
              below-market-value properties and make smart investment decisions
              with our advanced BMV analyzer.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/bmv-analyzer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  BMV Analyzer
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/property-investment"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Property Investment
                </Link>
              </li>
              <li>
                <Link
                  href="/services/bmv-analysis"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  BMV Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/services/property-management"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Property Management
                </Link>
              </li>
              <li>
                <Link
                  href="/services/investment-consulting"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Investment Consulting
                </Link>
              </li>
              <li>
                <Link
                  href="/services/market-research"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Market Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  {CONTACT_INFO.address}
                </span>
              </div>
              <div className="text-muted-foreground text-sm">
                {CONTACT_INFO.hours}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          <Link
            href={SOCIAL_LINKS.facebook}
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href={SOCIAL_LINKS.twitter}
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href={SOCIAL_LINKS.instagram}
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href={SOCIAL_LINKS.linkedin}
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href={SOCIAL_LINKS.youtube}
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Youtube className="h-5 w-5" />
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-accent">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Noornest Properties. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
