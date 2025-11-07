import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Valuation & Due Diligence Services UK | Noornest",
  description:
    "Get accurate property valuations and due diligence checks with Noornest. Verify ownership, legal compliance, and true market value across the UK.",
  openGraph: {
    title: "Property Valuation & Due Diligence Services UK | Noornest",
    description:
      "Get accurate property valuations and due diligence checks with Noornest. Verify ownership, legal compliance, and true market value across the UK.",
    url: "https://noornest.co.uk/services/valuation-and-due-diligence",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/valuation-og.jpg",
        width: 1200,
        height: 630,
        alt: "Property Valuation Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Valuation & Due Diligence Services UK | Noornest",
    description:
      "Get accurate property valuations and due diligence checks with Noornest. Verify ownership, legal compliance, and true market value across the UK.",
    images: ["https://noornest.co.uk/assets/services/valuation-og.jpg"],
  },
  alternates: {
    canonical:
      "https://noornest.co.uk/services/valuation-and-due-diligence",
  },
};

export default function ValuationAndDueDiligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Property Valuation & Due Diligence",
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
      "Noornest provides professional property valuation and due diligence services in the UK, including ownership checks, legal compliance, surveys, and ROI analysis.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does a valuation or due diligence report take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most reports are delivered within 5–10 working days.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with mortgage lenders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — our valuations are prepared to meet bank and lending standards.",
        },
      },
      {
        "@type": "Question",
        name: "Can you check commercial as well as residential properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we cover residential, multi-unit, and small commercial properties.",
        },
      },
      {
        "@type": "Question",
        name: "What documents do I need to provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typically title deeds, lease agreements (if applicable), and any planning documents.",
        },
      },
      {
        "@type": "Question",
        name: "Is the consultation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your initial consultation is free and carries no obligation.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="valuation-due-diligence-service-schema" />
      <JsonLd data={faqSchema} id="valuation-due-diligence-faq-schema" />
      {children}
    </>
  );
}
