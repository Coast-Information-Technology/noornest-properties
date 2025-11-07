import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Noornest | Property Enquiries & Investment Advisory UK",
  description:
    "Get in touch with Noornest for property enquiries, investment advisory, and real estate services. Reach us by phone, email, or our online contact form.",
  openGraph: {
    title: "Contact Noornest | Property Enquiries & Investment Advisory UK",
    description:
      "Get in touch with Noornest for property enquiries, investment advisory, and real estate services. Reach us by phone, email, or our online contact form.",
    url: "https://noornest.co.uk/contact",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Noornest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Noornest | Property Enquiries & Investment Advisory UK",
    description:
      "Get in touch with Noornest for property enquiries, investment advisory, and real estate services. Reach us by phone, email, or our online contact form.",
    images: ["https://noornest.co.uk/assets/contact-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "Noornest",
        url: "https://noornest.co.uk/contact",
        logo: "https://noornest.co.uk/assets/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+442039838559",
          contactType: "customer service",
          areaServed: "GB",
          availableLanguage: ["English"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "London",
          addressCountry: "UK",
        },
        openingHours: "Mo-Sa 07:00-18:00",
      },
      {
        "@type": "ContactPage",
        name: "Contact Noornest",
        url: "https://noornest.co.uk/contact",
        description:
          "Get in touch with Noornest for property enquiries, investment advisory, and real estate services.",
      },
    ],
  };

  return (
    <>
      <JsonLd data={contactSchema} id="contact-page-schema" />
      {children}
    </>
  );
}
