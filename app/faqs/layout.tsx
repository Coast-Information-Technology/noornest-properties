import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Noornest FAQs | Property & Investment Questions Answered",
  description:
    "Find answers to common questions about Noornest property services, investment plans, payments, and compliance. Clear, simple, and transparent.",
  openGraph: {
    title: "Noornest FAQs | Property & Investment Questions Answered",
    description:
      "Find answers to common questions about Noornest property services, investment plans, payments, and compliance. Clear, simple, and transparent.",
    url: "https://noornest.co.uk/faqs",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/faq/faq-og.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest FAQs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noornest FAQs | Property & Investment Questions Answered",
    description:
      "Find answers to common questions about Noornest property services, investment plans, payments, and compliance. Clear, simple, and transparent.",
    images: ["https://noornest.co.uk/assets/faq/faq-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/faqs",
  },
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Noornest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Noornest is a UK-first property and investment platform offering verified property services and tailored investment plans.",
        },
      },
      {
        "@type": "Question",
        name: "Do you manage rental properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — Noornest provides full property management services, including tenant sourcing, rent collection, and maintenance.",
        },
      },
      {
        "@type": "Question",
        name: "What are the different Noornest Nest plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer four investment plans: Equity Nest (profit-sharing), Yield Nest (rental income), Secure Nest (fixed return), and Opportunity Nest (below-market deals).",
        },
      },
      {
        "@type": "Question",
        name: "How secure are my payments?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All payments are processed securely using trusted banking and payment partners, with optional escrow for large investments.",
        },
      },
      {
        "@type": "Question",
        name: "Do you check property ownership documents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — every property is verified through due diligence checks including ownership, title deeds, and compliance reviews.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqPageSchema} id="faqs-page-schema" />
      {children}
    </>
  );
}
