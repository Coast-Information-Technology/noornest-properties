import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Service | Noornest",
  description:
    "Read Noornest's Terms of Service. Understand the rules, rights, and obligations for using our property services and investment platform in the UK.",
  openGraph: {
    title: "Terms of Service | Noornest",
    description:
      "Read Noornest's Terms of Service. Understand the rules, rights, and obligations for using our property services and investment platform in the UK.",
    url: "https://noornest.co.uk/terms-of-service",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/legal/terms-og.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Noornest",
    description:
      "Read Noornest's Terms of Service. Understand the rules, rights, and obligations for using our property services and investment platform in the UK.",
    images: ["https://noornest.co.uk/assets/legal/terms-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/terms-of-service",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    description:
      "Noornest's Terms of Service outline the rules, rights, and obligations for using our property services and investment platform in the UK.",
    url: "https://noornest.co.uk/terms-of-service",
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
      <JsonLd data={termsSchema} id="terms-of-service-schema" />
      {children}
    </>
  );
}
