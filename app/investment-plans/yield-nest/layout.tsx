import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Yield Nest | Rental Income Property Investments UK | Noornest",
  description:
    "Invest in rental property income with Noornest's Yield Nest. Earn steady monthly returns from verified rental properties and portfolios across the UK.",
  openGraph: {
    title: "Yield Nest | Rental Income Property Investments UK | Noornest",
    description:
      "Invest in rental property income with Noornest's Yield Nest. Earn steady monthly returns from verified rental properties and portfolios across the UK.",
    url: "https://noornest.co.uk/investments/yield-nest",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/investments/yield-nest-og.jpg",
        width: 1200,
        height: 630,
        alt: "Yield Nest Investment Plan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yield Nest | Rental Income Property Investments UK | Noornest",
    description:
      "Invest in rental property income with Noornest's Yield Nest. Earn steady monthly returns from verified rental properties and portfolios across the UK.",
    images: ["https://noornest.co.uk/assets/investments/yield-nest-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/investments/yield-nest",
  },
};

export default function YieldNestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const investmentSchema = {
    "@context": "https://schema.org",
    "@type": "InvestmentOrDeposit",
    name: "Yield Nest",
    description:
      "Noornest's Yield Nest is a rental-income–focused property investment plan, offering steady monthly or quarterly returns from verified and managed properties across the UK.",
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
    investmentType: "Rental Income",
    amount: {
      "@type": "MonetaryAmount",
      currency: "GBP",
      minValue: 2500,
    },
    riskLevel: "Medium",
    returnType: "Rental yield, regular income",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How often will I receive income?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Income is typically distributed monthly or quarterly.",
        },
      },
      {
        "@type": "Question",
        name: "Are rental yields guaranteed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yields are targeted, but property performance may vary.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to manage tenants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — all tenant management and property oversight is handled by Noornest.",
        },
      },
      {
        "@type": "Question",
        name: "Can I reinvest my income?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — you can choose to reinvest or withdraw payments.",
        },
      },
      {
        "@type": "Question",
        name: "Is my capital protected?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Capital is at risk, but properties are verified and managed to reduce exposure.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={investmentSchema} id="yield-nest-investment-schema" />
      <JsonLd data={faqSchema} id="yield-nest-faq-schema" />
      {children}
    </>
  );
}
