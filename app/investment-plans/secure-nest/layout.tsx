import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Secure Nest | Fixed Return Property Investments UK | Noornest",
  description:
    "Earn predictable fixed returns with Noornest's Secure Nest. Property-backed investments offering stability and certainty for income-focused investors in the UK.",
  openGraph: {
    title: "Secure Nest | Fixed Return Property Investments UK | Noornest",
    description:
      "Earn predictable fixed returns with Noornest's Secure Nest. Property-backed investments offering stability and certainty for income-focused investors in the UK.",
    url: "https://noornest.co.uk/investments/secure-nest",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/investments/secure-nest-og.jpg",
        width: 1200,
        height: 630,
        alt: "Secure Nest Investment Plan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Nest | Fixed Return Property Investments UK | Noornest",
    description:
      "Earn predictable fixed returns with Noornest's Secure Nest. Property-backed investments offering stability and certainty for income-focused investors in the UK.",
    images: ["https://noornest.co.uk/assets/investments/secure-nest-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/investments/secure-nest",
  },
};

export default function SecureNestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const investmentSchema = {
    "@context": "https://schema.org",
    "@type": "InvestmentOrDeposit",
    name: "Secure Nest",
    description:
      "Noornest's Secure Nest is a fixed-return property investment plan that provides predictable, predefined returns over set terms, backed by verified property projects in the UK.",
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
    investmentType: "Fixed Return",
    amount: {
      "@type": "MonetaryAmount",
      currency: "GBP",
      minValue: 1000,
    },
    riskLevel: "Low",
    returnType: "Fixed return, guaranteed percentage",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are returns guaranteed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — your return is fixed and predefined when you invest.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if the property market drops?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your return is unaffected; Secure Nest payouts are not tied to market fluctuations.",
        },
      },
      {
        "@type": "Question",
        name: "Can I withdraw before the term ends?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generally, investments are locked until maturity, though early-exit options may be available with conditions.",
        },
      },
      {
        "@type": "Question",
        name: "What is the typical return rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Secure Nest returns usually range between 5–8% annually.",
        },
      },
      {
        "@type": "Question",
        name: "Is my capital completely risk-free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All investments carry some risk, but Secure Nest is structured for maximum security.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={investmentSchema} id="secure-nest-investment-schema" />
      <JsonLd data={faqSchema} id="secure-nest-faq-schema" />
      {children}
    </>
  );
}
