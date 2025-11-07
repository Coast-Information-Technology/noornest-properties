import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Real Estate Consultancy Services UK | Noornest Strategic Property Advisors",
  description:
    "Get expert real estate consultancy with Noornest. Market research, feasibility studies, compliance, and portfolio strategies for UK investors and developers.",
  openGraph: {
    title: "Real Estate Consultancy Services UK | Noornest Strategic Property Advisors",
    description:
      "Get expert real estate consultancy with Noornest. Market research, feasibility studies, compliance, and portfolio strategies for UK investors and developers.",
    url: "https://noornest.co.uk/services/real-estate-consultancy",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/consultancy-og.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate Consultancy Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Consultancy Services UK | Noornest Strategic Property Advisors",
    description:
      "Get expert real estate consultancy with Noornest. Market research, feasibility studies, compliance, and portfolio strategies for UK investors and developers.",
    images: ["https://noornest.co.uk/assets/services/consultancy-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/services/real-estate-consultancy",
  },
};

export default function RealEstateConsultancyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Real Estate Consultancy",
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
      "Noornest offers real estate consultancy services in the UK, including market research, feasibility studies, legal compliance, and portfolio strategies.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between consultancy and advisory?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Advisory focuses on specific investments; consultancy looks at the bigger strategy.",
        },
      },
      {
        "@type": "Question",
        name: "Who is this service best for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For homeowners, landlords, investors, and developers needing long-term guidance.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with international clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we help overseas investors enter the UK market.",
        },
      },
      {
        "@type": "Question",
        name: "Can consultancy be ongoing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we offer ongoing consultancy for portfolio management and development projects.",
        },
      },
      {
        "@type": "Question",
        name: "Is the first consultation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide a free discovery call before starting paid consultancy.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="real-estate-consultancy-service-schema" />
      <JsonLd data={faqSchema} id="real-estate-consultancy-faq-schema" />
      {children}
    </>
  );
}
