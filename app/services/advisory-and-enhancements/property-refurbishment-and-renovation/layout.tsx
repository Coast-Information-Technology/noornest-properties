import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Property Refurbishment & Renovation Services UK | Noornest",
  description:
    "Transform your property with Noornest refurbishment and renovation services. From cosmetic upgrades to structural projects, we boost comfort and long-term value.",
  openGraph: {
    title: "Property Refurbishment & Renovation Services UK | Noornest",
    description:
      "Transform your property with Noornest refurbishment and renovation services. From cosmetic upgrades to structural projects, we boost comfort and long-term value.",
    url: "https://noornest.co.uk/services/property-refurbishment-and-renovation",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/renovation-og.jpg",
        width: 1200,
        height: 630,
        alt: "Property Renovation Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Refurbishment & Renovation Services UK | Noornest",
    description:
      "Transform your property with Noornest refurbishment and renovation services. From cosmetic upgrades to structural projects, we boost comfort and long-term value.",
    images: ["https://noornest.co.uk/assets/services/renovation-og.jpg"],
  },
  alternates: {
    canonical:
      "https://noornest.co.uk/services/property-refurbishment-and-renovation",
  },
};

export default function PropertyRenovationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Property Refurbishment & Renovation",
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
      "Noornest provides property refurbishment and renovation services in the UK, including cosmetic upgrades, structural changes, energy improvements, and full project management.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you handle both small refurbishments and large renovations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we cover everything from cosmetic updates to structural projects.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide project management?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all packages include end-to-end project supervision.",
        },
      },
      {
        "@type": "Question",
        name: "Can you work within my budget?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We create tailored solutions based on your budget and goals.",
        },
      },
      {
        "@type": "Question",
        name: "Do you handle planning permissions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we manage applications and compliance for structural works.",
        },
      },
      {
        "@type": "Question",
        name: "Is the consultation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your first consultation is free and carries no obligation.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="property-renovation-service-schema" />
      <JsonLd data={faqSchema} id="property-renovation-faq-schema" />
      {children}
    </>
  );
}
