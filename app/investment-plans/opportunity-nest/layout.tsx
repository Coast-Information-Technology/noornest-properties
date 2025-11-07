import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Opportunity Nest | Below-Market Property Deals UK | Noornest",
  description:
    "Access exclusive below-market-value property deals with Noornest's Opportunity Nest. Invest smart, gain instant equity, and unlock high-return opportunities.",
  openGraph: {
    title: "Opportunity Nest | Below-Market Property Deals UK | Noornest",
    description:
      "Access exclusive below-market-value property deals with Noornest's Opportunity Nest. Invest smart, gain instant equity, and unlock high-return opportunities.",
    url: "https://noornest.co.uk/investments/opportunity-nest",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/investments/opportunity-nest-og.jpg",
        width: 1200,
        height: 630,
        alt: "Opportunity Nest Investment Plan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opportunity Nest | Below-Market Property Deals UK | Noornest",
    description:
      "Access exclusive below-market-value property deals with Noornest's Opportunity Nest. Invest smart, gain instant equity, and unlock high-return opportunities.",
    images: [
      "https://noornest.co.uk/assets/investments/opportunity-nest-og.jpg",
    ],
  },
  alternates: {
    canonical: "https://noornest.co.uk/investments/opportunity-nest",
  },
};

export default function OpportunityNestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const investmentSchema = {
    "@context": "https://schema.org",
    "@type": "InvestmentOrDeposit",
    name: "Opportunity Nest",
    description:
      "Noornest's Opportunity Nest provides investors with exclusive below-market-value property deals, offering instant equity, capital growth, and rental yield potential.",
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
    investmentType: "Below-Market Property Deals",
    amount: {
      "@type": "MonetaryAmount",
      currency: "GBP",
      minValue: 10000,
    },
    riskLevel: "High",
    returnType: "Capital growth and potential rental yield",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How are below-market deals sourced?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Through our network of agents, developers, and distressed sale channels.",
        },
      },
      {
        "@type": "Question",
        name: "Are these deals risky?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "They carry higher risk, but also higher reward. Every deal is vetted for legal and financial soundness.",
        },
      },
      {
        "@type": "Question",
        name: "Can I finance an Opportunity Nest deal with a mortgage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, though terms depend on lender requirements and property type.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to manage the property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — Noornest offers optional property management services.",
        },
      },
      {
        "@type": "Question",
        name: "Is my investment guaranteed to increase in value?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — returns depend on the property market, though discounted entry increases potential upside.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd
        data={investmentSchema}
        id="opportunity-nest-investment-schema"
      />
      <JsonLd data={faqSchema} id="opportunity-nest-faq-schema" />
      {children}
    </>
  );
}
