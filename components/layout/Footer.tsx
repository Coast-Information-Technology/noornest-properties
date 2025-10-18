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
  Clock,
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
        backgroundColor: "rgba(0, 0, 0, 0.8)",
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
            <p className="text-sm text-white">
              Making Property Simple, Secure & Smarter
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <Link
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  {CONTACT_INFO.email}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <Link
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  {CONTACT_INFO.phone}
                </Link>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-white text-sm">
                  {CONTACT_INFO.address}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-white text-sm">{CONTACT_INFO.hours}</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <ul className="space-y-2 ">
              <li>
                <Link
                  href="/properties"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/bmv-analyzer"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  BMV Analyzer
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Services</h3>
            <ul className="space-y-2 ">
              <li>
                <Link
                  href="/services/property-investment"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Property Management
                </Link>
              </li>
              <li>
                <Link
                  href="/services/bmv-analysis"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Property Sourcing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/property-management"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Property Renovation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/investment-consulting"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Property Consultancy
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/services/market-research"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Market Research
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Investments */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">
              Investments Plan
            </h3>
            <ul className="space-y-2 ">
              <li>
                <Link
                  href="/services/property-investment"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Equity Nest
                </Link>
              </li>
              <li>
                <Link
                  href="/services/bmv-analysis"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Yield Nest
                </Link>
              </li>
              <li>
                <Link
                  href="/services/property-management"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Secure Nest
                </Link>
              </li>
              <li>
                <Link
                  href="/services/investment-consulting"
                  className="text-white hover:text-primary transition-colors text-sm"
                >
                  Opportunity Nest
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center mt-8 space-x-2">
          <Link
            href={SOCIAL_LINKS.facebook}
            className="text-primary hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Facebook className="h-7 w-7" />
          </Link>
          <Link
            href={SOCIAL_LINKS.twitter}
            className="text-primary hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Twitter className="h-7 w-7" />
          </Link>
          <Link
            href={SOCIAL_LINKS.instagram}
            className="text-primary hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Instagram className="h-7 w-7" />
          </Link>
          <Link
            href={SOCIAL_LINKS.linkedin}
            className="text-primary hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Linkedin className="h-7 w-7" />
          </Link>
          <Link
            href={SOCIAL_LINKS.youtube}
            className="text-primary hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent"
          >
            <Youtube className="h-7 w-7" />
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-accent">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary text-sm">
              © {currentYear} Noornest Properties. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy-policy"
                className="text-primary hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <span className="text-primary">|</span>
              <Link
                href="/terms-of-service"
                className="text-primary hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </Link>
              {/* <Link
                href="/cookie-policy"
                className="text-white hover:text-primary transition-colors text-sm"
              >
                Cookie Policy
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
