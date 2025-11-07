import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Sales & Marketing Services UK | Sell Faster with Noornest",
  description:
    "Noornest helps you sell property faster with verified buyers, premium listings, and targeted marketing campaigns. Flexible sales packages across the UK.",
  openGraph: {
    title: "Property Sales & Marketing Services UK | Sell Faster with Noornest",
    description:
      "Noornest helps you sell property faster with verified buyers, premium listings, and targeted marketing campaigns. Flexible sales packages across the UK.",
    url: "https://noornest.co.uk/services/sales-and-marketing",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/property-sales-og.jpg",
        width: 1200,
        height: 630,
        alt: "Property Sales & Marketing Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Sales & Marketing Services UK | Sell Faster with Noornest",
    description:
      "Noornest helps you sell property faster with verified buyers, premium listings, and targeted marketing campaigns. Flexible sales packages across the UK.",
    images: ["https://noornest.co.uk/assets/services/property-sales-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/services/sales-and-marketing",
  },
};

export default function SalesAndMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Property Sales & Marketing",
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
      "Noornest provides property sales and marketing services across the UK, including listings, photography, valuation, and buyer matching.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How quickly can you list my property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most properties go live within 48 hours once we have all details and photos.",
        },
      },
      {
        "@type": "Question",
        name: "Do you handle negotiations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we assist in connecting you with buyers and guiding offers transparently.",
        },
      },
      {
        "@type": "Question",
        name: "What types of properties can you market?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We handle apartments, houses, land, commercial units, and developer projects.",
        },
      },
      {
        "@type": "Question",
        name: "Can I upgrade my plan later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — you can upgrade at any time to access premium marketing services.",
        },
      },
      {
        "@type": "Question",
        name: "Do you charge commission?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer flexible flat-fee and commission-based options depending on the package.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="sales-marketing-service-schema" />
      <JsonLd data={faqSchema} id="sales-marketing-faq-schema" />
      {children}
    </>
  );
}
