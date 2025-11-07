import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Browse Verified Properties UK | Noornest Listings",
  description:
    "Explore verified UK properties for sale, rent, and investment with Noornest. Filter by price, type, and yield. All listings include due diligence and insights.",
  openGraph: {
    title: "Browse Verified Properties UK | Noornest Listings",
    description:
      "Explore verified UK properties for sale, rent, and investment with Noornest. Filter by price, type, and yield. All listings include due diligence and insights.",
    url: "https://noornest.co.uk/properties",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/properties/properties-og.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest Property Listings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Verified Properties UK | Noornest Listings",
    description:
      "Explore verified UK properties for sale, rent, and investment with Noornest. Filter by price, type, and yield. All listings include due diligence and insights.",
    images: ["https://noornest.co.uk/assets/properties/properties-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/properties",
  },
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Noornest Property Listings",
    description:
      "Browse verified UK properties for sale, rent, and investment on Noornest. Each listing includes due diligence, yield analysis, and legal verification.",
    url: "https://noornest.co.uk/properties",
    about: {
      "@type": "Thing",
      name: "Property Listings",
    },
    provider: {
      "@type": "Organization",
      name: "Noornest",
      url: "https://noornest.co.uk",
    },
  };

  return (
    <>
      <JsonLd data={collectionPageSchema} id="properties-page-schema" />
      {children}
    </>
  );
}
