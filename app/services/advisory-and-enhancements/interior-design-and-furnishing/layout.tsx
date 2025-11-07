import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Interior Design & Furnishing Services UK | Noornest",
  description:
    "Noornest offers professional interior design and furnishing services in the UK. From staging to bespoke design, we create spaces that inspire and add value.",
  openGraph: {
    title: "Interior Design & Furnishing Services UK | Noornest",
    description:
      "Noornest offers professional interior design and furnishing services in the UK. From staging to bespoke design, we create spaces that inspire and add value.",
    url: "https://noornest.co.uk/services/interior-design-and-furnishing",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/interior-design-og.jpg",
        width: 1200,
        height: 630,
        alt: "Interior Design Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design & Furnishing Services UK | Noornest",
    description:
      "Noornest offers professional interior design and furnishing services in the UK. From staging to bespoke design, we create spaces that inspire and add value.",
    images: ["https://noornest.co.uk/assets/services/interior-design-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/services/interior-design-and-furnishing",
  },
};

export default function InteriorDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Interior Design & Furnishing",
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
      "Noornest provides interior design and furnishing services in the UK, including staging, furnishing packages, bespoke design, and rental-ready fit-outs.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you design both homes and rental properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we handle residential homes, rentals, and short-let properties.",
        },
      },
      {
        "@type": "Question",
        name: "Can you provide furniture packages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer ready-to-install packages for rentals and staging.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with developers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide interior design and staging for show homes and multi-unit projects.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most furnishing projects take 2–4 weeks, depending on scope.",
        },
      },
      {
        "@type": "Question",
        name: "Is the consultation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your first consultation is free with no obligations.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="interior-design-service-schema" />
      <JsonLd data={faqSchema} id="interior-design-faq-schema" />
      {children}
    </>
  );
}
