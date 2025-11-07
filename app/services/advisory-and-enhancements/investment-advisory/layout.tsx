import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Investment Advisory Services UK | Noornest Property Experts",
  description:
    "Get expert property investment advice with Noornest. ROI analysis, risk assessment, and tailored strategies for smarter investments in the UK property market.",
  openGraph: {
    title: "Investment Advisory Services UK | Noornest Property Experts",
    description:
      "Get expert property investment advice with Noornest. ROI analysis, risk assessment, and tailored strategies for smarter investments in the UK property market.",
    url: "https://noornest.co.uk/services/investment-advisory",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/services/investment-advisory-og.jpg",
        width: 1200,
        height: 630,
        alt: "Investment Advisory Services by Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Advisory Services UK | Noornest Property Experts",
    description:
      "Get expert property investment advice with Noornest. ROI analysis, risk assessment, and tailored strategies for smarter investments in the UK property market.",
    images: [
      "https://noornest.co.uk/assets/services/investment-advisory-og.jpg",
    ],
  },
  alternates: {
    canonical: "https://noornest.co.uk/services/investment-advisory",
  },
};

export default function InvestmentAdvisoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Investment Advisory",
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
      "Noornest provides property investment advisory services in the UK, including ROI analysis, risk assessment, and tailored portfolio strategies.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is investment advisory for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For anyone looking to invest in UK property — from first-time investors to seasoned landlords.",
        },
      },
      {
        "@type": "Question",
        name: "Do you only advise on Noornest investment plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, we cover Noornest's plans plus wider market opportunities.",
        },
      },
      {
        "@type": "Question",
        name: "What if I have a small budget?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our advisory services are tailored to all levels, including entry-level investors.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide ongoing support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — premium clients receive quarterly strategy reviews.",
        },
      },
      {
        "@type": "Question",
        name: "Is the consultation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your first consultation is free, with no obligations.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} id="investment-advisory-service-schema" />
      <JsonLd data={faqSchema} id="investment-advisory-faq-schema" />
      {children}
    </>
  );
}
