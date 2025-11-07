import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Sourcing Services UK | Tailored Property Search by Noornest",
  description:
    "Let Noornest source your next property. Tailored property search, due diligence, and negotiation support for buyers and investors across the UK.",
  openGraph: {
    title: "Property Sourcing Services UK | Tailored Property Search by Noornest",
    description:
      "Let Noornest source your next property. Tailored property search, due diligence, and negotiation support for buyers and investors across the UK.",
    url: "https://noornest.co.uk/services/property-sourcing",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/property-sourcing-og.jpg",
        width: 1200,
        height: 630,
        alt: "Property Sourcing Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Sourcing Services UK | Tailored Property Search by Noornest",
    description:
      "Let Noornest source your next property. Tailored property search, due diligence, and negotiation support for buyers and investors across the UK.",
    images: [
      "https://noornest.co.uk/assets/services/property-sourcing-og.jpg",
    ],
  },
  alternates: {
    canonical: "https://noornest.co.uk/services/property-sourcing",
  },
};

export default function PropertySourcingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Property Sourcing",
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
      "Noornest offers property sourcing services in the UK, including tailored search, shortlisting, due diligence checks, and negotiation support.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is property sourcing for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For buyers and investors who want expert help finding and securing properties.",
        },
      },
      {
        "@type": "Question",
        name: "Do you source only in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our current focus is UK markets, with global expansion in the future.",
        },
      },
      {
        "@type": "Question",
        name: "Do you negotiate on my behalf?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide negotiation support and advice to help you secure the best deal.",
        },
      },
      {
        "@type": "Question",
        name: "How long does sourcing take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typically 2–4 weeks, depending on requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Is the consultation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — your first sourcing consultation is free, with no obligations.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="property-sourcing-service-schema" />
      <JsonLd data={faqSchema} id="property-sourcing-faq-schema" />
      {children}
    </>
  );
}
