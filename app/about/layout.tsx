import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Noornest | Verified Properties & Real Estate Investments UK",
  description:
    "Learn about Noornest — the UK-first platform for verified properties, smart investment plans, and trusted real estate services with global reach.",
  openGraph: {
    title: "About Noornest | Verified Properties & Real Estate Investments UK",
    description:
      "Learn about Noornest — the UK-first platform for verified properties, smart investment plans, and trusted real estate services with global reach.",
    url: "https://noornest.co.uk/about",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Noornest | Verified Properties & Real Estate Investments UK",
    description:
      "Learn about Noornest — the UK-first platform for verified properties, smart investment plans, and trusted real estate services with global reach.",
    images: ["https://noornest.co.uk/assets/og-about.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Noornest",
    url: "https://noornest.co.uk/about",
    description:
      "Noornest is a UK-first platform offering verified properties, smart investment plans, and trusted real estate services with global reach.",
    mainEntity: {
      "@type": "Organization",
      name: "Noornest",
      url: "https://noornest.co.uk/",
      logo: "https://noornest.co.uk/assets/logo.png",
      foundingLocation: "United Kingdom",
      areaServed: ["GB", "Worldwide"],
      sameAs: [
        "https://facebook.com/noornest",
        "https://instagram.com/noornest",
        "https://linkedin.com/company/noornest",
      ],
    },
  };

  return (
    <>
      <JsonLd data={aboutPageSchema} id="about-page-schema" />
      {children}
    </>
  );
}
