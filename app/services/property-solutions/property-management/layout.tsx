import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Management Services UK | Tenant & Landlord Solutions | Noornest",
  description:
    "Discover Noornest's property management services in the UK. Tenant screening, rent collection, maintenance & compliance. Free consultation, no obligations.",
  openGraph: {
    title: "Property Management Services UK | Tenant & Landlord Solutions | Noornest",
    description:
      "Discover Noornest's property management services in the UK. Tenant screening, rent collection, maintenance & compliance. Free consultation, no obligations.",
    url: "https://noornest.co.uk/services/property-management",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/property-management-og.jpg",
        width: 1200,
        height: 630,
        alt: "Property Management Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management Services UK | Tenant & Landlord Solutions | Noornest",
    description:
      "Discover Noornest's property management services in the UK. Tenant screening, rent collection, maintenance & compliance. Free consultation, no obligations.",
    images: [
      "https://noornest.co.uk/assets/services/property-management-og.jpg",
    ],
  },
  alternates: {
    canonical: "https://noornest.co.uk/services/property-management",
  },
};

export default function PropertyManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Property Management",
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
      "Noornest provides stress-free property management services in the UK, including tenant screening, rent collection, maintenance, inspections, and compliance.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of properties do you manage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We manage residential, multi-unit, and small commercial properties across the UK.",
        },
      },
      {
        "@type": "Question",
        name: "How much does property management cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our fees start from 8% of monthly rent, with tailored plans for larger portfolios.",
        },
      },
      {
        "@type": "Question",
        name: "Do you handle tenant disputes and evictions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Professional and Premium plans cover legal notices and tenant management.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get reports on my property performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all clients receive monthly owner statements with rent, expenses, and notes.",
        },
      },
      {
        "@type": "Question",
        name: "Is the consultation really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — your first consultation is completely free with no obligations.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="property-management-service-schema" />
      <JsonLd data={faqSchema} id="property-management-faq-schema" />
      {children}
    </>
  );
}
