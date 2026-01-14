import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import BackToTopButton from "@/components/ui/BackToTopButton";
import JsonLd from "@/components/seo/JsonLd";
import { UserProvider } from "@/contexts/UserContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noornest.co.uk"),
  title: "Noornest | Verified Properties & Smart Real Estate Investments",
  description:
    "Discover verified properties and tailored investment opportunities with Noornest. Buy, sell, or invest with confidence in the UK real estate market.",
  keywords: [
    "real estate",
    "property investment",
    "BMV analyzer",
    "below market value",
    "property listings",
    "UK properties",
    "property investment UK",
  ],
  authors: [{ name: "Noornest Properties" }],
  creator: "Noornest Properties",
  publisher: "Noornest Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Noornest | Verified Properties & Smart Real Estate Investments",
    description:
      "Discover verified properties and tailored investment opportunities with Noornest. Buy, sell, or invest with confidence in the UK real estate market.",
    url: "https://noornest.co.uk/",
    siteName: "Noornest",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest Properties",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noornest | Verified Properties & Smart Real Estate Investments",
    description:
      "Discover verified properties and tailored investment opportunities with Noornest. Buy, sell, or invest with confidence in the UK real estate market.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Noornest",
    url: "https://noornest.co.uk/",
    logo: "https://noornest.co.uk/assets/logo.png",
    sameAs: [
      "https://facebook.com/noornest",
      "https://instagram.com/noornest",
      "https://linkedin.com/company/noornest",
    ],
    description:
      "Noornest makes property simple, secure, and smarter. Discover verified properties, investment plans, and comprehensive property services.",
  };

  return (
    <html lang="en" className={`${roboto.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <JsonLd data={organizationSchema} id="organization-schema" />
        <UserProvider>
          <AnimationProvider>
            <Header />
            {children}
            <Footer />
            <BackToTopButton />
            <Toaster richColors closeButton />
          </AnimationProvider>
        </UserProvider>
      </body>
    </html>
  );
}
