import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "Compare Property Investment Plans UK | Noornest Equity, Yield, Secure & Opportunity",
  description:
    "Compare Noornest's four property investment plans — Equity Nest, Yield Nest, Secure Nest, and Opportunity Nest. Find the right plan for your goals and risk level.",
  openGraph: {
    title: "Compare Property Investment Plans UK | Noornest",
    description:
      "Compare Noornest's four property investment plans — Equity Nest, Yield Nest, Secure Nest, and Opportunity Nest. Find the right plan for your goals and risk level.",
    url: "https://noornest.co.uk/investments/compare",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/investments/compare-plans-og.jpg",
        width: 1200,
        height: 630,
        alt: "Compare Noornest Investment Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Property Investment Plans UK | Noornest",
    description:
      "Compare Noornest's four property investment plans — Equity Nest, Yield Nest, Secure Nest, and Opportunity Nest. Find the right plan for your goals and risk level.",
    images: [
      "https://noornest.co.uk/assets/investments/compare-plans-og.jpg",
    ],
  },
  alternates: {
    canonical: "https://noornest.co.uk/investments/compare",
  },
};

export default function CompareInvestmentPlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Noornest Investment Plans",
    description:
      "Comparison of Noornest's four property investment plans: Equity Nest, Yield Nest, Secure Nest, and Opportunity Nest.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Equity Nest",
        url: "https://noornest.co.uk/investments/equity-nest",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Yield Nest",
        url: "https://noornest.co.uk/investments/yield-nest",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Secure Nest",
        url: "https://noornest.co.uk/investments/secure-nest",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Opportunity Nest",
        url: "https://noornest.co.uk/investments/opportunity-nest",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I invest in more than one plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — many investors diversify across multiple plans.",
        },
      },
      {
        "@type": "Question",
        name: "Which plan is the safest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Secure Nest offers the most stability with fixed returns.",
        },
      },
      {
        "@type": "Question",
        name: "Which plan has the highest returns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Opportunity Nest and Equity Nest offer higher potential returns, but with higher risk.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need property experience to invest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — all plans are managed by Noornest's experts.",
        },
      },
      {
        "@type": "Question",
        name: "Is the consultation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we offer free consultations to guide your choice.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={itemListSchema} id="compare-plans-itemlist-schema" />
      <JsonLd data={faqSchema} id="compare-plans-faq-schema" />
      {children}
    </>
  );
}
