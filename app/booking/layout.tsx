import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Noornest Property & Investment Experts UK",
  description:
    "Schedule a free 30-minute consultation with Noornest advisors. Get tailored property and investment advice with no obligations. Book online today.",
  openGraph: {
    title: "Book a Free Consultation | Noornest Property & Investment Experts UK",
    description:
      "Schedule a free 30-minute consultation with Noornest advisors. Get tailored property and investment advice with no obligations. Book online today.",
    url: "https://noornest.co.uk/booking",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book Consultation with Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Consultation | Noornest Property & Investment Experts UK",
    description:
      "Schedule a free 30-minute consultation with Noornest advisors. Get tailored property and investment advice with no obligations. Book online today.",
    images: ["https://noornest.co.uk/assets/og-image.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/booking",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bookingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the consultation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your first consultation is completely free with no obligations.",
        },
      },
      {
        "@type": "Question",
        name: "How long is a session?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each consultation lasts around 30 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "Can I reschedule or cancel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, simply reply to your confirmation email to reschedule or cancel at no cost.",
        },
      },
      {
        "@type": "Question",
        name: "Who will I speak to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You'll be matched with a Noornest advisor who specializes in property or investments based on your booking type.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer online consultations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can choose online (video call) or in-person (UK office).",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={bookingFaqSchema} id="booking-page-schema" />
      {children}
    </>
  );
}
