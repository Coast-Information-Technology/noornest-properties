import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy | Noornest",
  description:
    "Read Noornest's Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR and data protection laws.",
  openGraph: {
    title: "Privacy Policy | Noornest",
    description:
      "Read Noornest's Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR and data protection laws.",
    url: "https://noornest.co.uk/privacy-policy",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/legal/privacy-og.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Noornest",
    description:
      "Read Noornest's Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR and data protection laws.",
    images: ["https://noornest.co.uk/assets/legal/privacy-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const privacyPolicySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Noornest's Privacy Policy explains how we collect, use, and protect personal data in compliance with UK GDPR and data protection laws.",
    url: "https://noornest.co.uk/privacy-policy",
    publisher: {
      "@type": "Organization",
      name: "Noornest",
      url: "https://noornest.co.uk",
      logo: {
        "@type": "ImageObject",
        url: "https://noornest.co.uk/assets/logo.png",
      },
    },
  };

  return (
    <>
      <JsonLd data={privacyPolicySchema} id="privacy-policy-schema" />
      {children}
    </>
  );
}
