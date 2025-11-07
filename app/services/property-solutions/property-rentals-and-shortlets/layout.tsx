import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Rentals & Short-Lets UK | Noornest Verified Rental Services",
  description:
    "Noornest offers property rental and short-let services across the UK. Verified tenants, secure leases, and flexible rental options for landlords and renters.",
  openGraph: {
    title: "Property Rentals & Short-Lets UK | Noornest Verified Rental Services",
    description:
      "Noornest offers property rental and short-let services across the UK. Verified tenants, secure leases, and flexible rental options for landlords and renters.",
    url: "https://noornest.co.uk/services/property-rentals-and-shortlets",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/property-rentals-og.jpg",
        width: 1200,
        height: 630,
        alt: "Property Rentals Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Rentals & Short-Lets UK | Noornest Verified Rental Services",
    description:
      "Noornest offers property rental and short-let services across the UK. Verified tenants, secure leases, and flexible rental options for landlords and renters.",
    images: [
      "https://noornest.co.uk/assets/services/property-rentals-og.jpg",
    ],
  },
  alternates: {
    canonical: "https://noornest.co.uk/services/property-rentals-and-shortlets",
  },
};

export default function PropertyRentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Property Rentals & Short-Lets",
    provider: {
      "@type": "Organization",
      name: "Noornest",
      url: "https://noornest.co.uk",
      logo: "https://noornest.co.uk/assets/logo.png",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description:
      "Noornest provides verified rental and short-let services across the UK, including tenant matching, lease management, and rent collection support.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you handle both short-term and long-term rentals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we support long-term leases and flexible short-let stays.",
        },
      },
      {
        "@type": "Question",
        name: "How do you screen tenants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We verify IDs, rental history, and references before placement.",
        },
      },
      {
        "@type": "Question",
        name: "Can you manage rent collection?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — our Professional and Premium plans include rent collection support.",
        },
      },
      {
        "@type": "Question",
        name: "Do you handle furnished rentals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, both furnished and unfurnished properties are supported.",
        },
      },
      {
        "@type": "Question",
        name: "What locations do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We cover rentals across major UK cities and expanding regions.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="property-rentals-service-schema" />
      <JsonLd data={faqSchema} id="property-rentals-faq-schema" />
      {children}
    </>
  );
}
