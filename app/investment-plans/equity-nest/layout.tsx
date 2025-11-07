import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Equity Nest | Profit-Sharing Property Investments UK | Noornest",
  description:
    "Invest in property equity with Noornest's Equity Nest. Share in profits from verified developments and grow wealth through long-term capital appreciation.",
  openGraph: {
    title: "Equity Nest | Profit-Sharing Property Investments UK | Noornest",
    description:
      "Invest in property equity with Noornest's Equity Nest. Share in profits from verified developments and grow wealth through long-term capital appreciation.",
    url: "https://noornest.co.uk/investments/equity-nest",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/investments/equity-nest-og.jpg",
        width: 1200,
        height: 630,
        alt: "Equity Nest Investment Plan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Equity Nest | Profit-Sharing Property Investments UK | Noornest",
    description:
      "Invest in property equity with Noornest's Equity Nest. Share in profits from verified developments and grow wealth through long-term capital appreciation.",
    images: ["https://noornest.co.uk/assets/investments/equity-nest-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/investments/equity-nest",
  },
};

export default function EquityNestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const investmentSchema = {
    "@context": "https://schema.org",
    "@type": "InvestmentOrDeposit",
    name: "Equity Nest",
    description:
      "Noornest's Equity Nest is a profit-sharing property investment plan that allows investors to participate in ownership and share in long-term capital growth.",
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
    investmentType: "Property Equity",
    amount: {
      "@type": "MonetaryAmount",
      currency: "GBP",
      minValue: 5000,
    },
    riskLevel: "High",
    returnType: "Profit-sharing, variable",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What type of projects are included?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Primarily residential and mixed-use developments in the UK.",
        },
      },
      {
        "@type": "Question",
        name: "Are returns guaranteed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — returns are linked to property performance.",
        },
      },
      {
        "@type": "Question",
        name: "How do I receive my profits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Profits are distributed at project completion or exit.",
        },
      },
      {
        "@type": "Question",
        name: "Can I exit early?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generally, equity investments are locked until project completion.",
        },
      },
      {
        "@type": "Question",
        name: "Is my capital at risk?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — as with any equity investment, returns are not guaranteed.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={investmentSchema} id="equity-nest-investment-schema" />
      <JsonLd data={faqSchema} id="equity-nest-faq-schema" />
      {children}
    </>
  );
}
