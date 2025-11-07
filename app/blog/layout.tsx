import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Noornest Insights | UK Property Investment & Real Estate Blog",
  description:
    "Read Noornest Insights for expert advice on UK property, investment strategies, and market trends. Stay informed and make smarter property decisions.",
  openGraph: {
    title: "Noornest Insights | UK Property Investment & Real Estate Blog",
    description:
      "Read Noornest Insights for expert advice on UK property, investment strategies, and market trends. Stay informed and make smarter property decisions.",
    url: "https://noornest.co.uk/insights",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/insights/insights-og.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest Insights Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noornest Insights | UK Property Investment & Real Estate Blog",
    description:
      "Read Noornest Insights for expert advice on UK property, investment strategies, and market trends. Stay informed and make smarter property decisions.",
    images: ["https://noornest.co.uk/assets/insights/insights-og.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/insights",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Noornest Insights",
    description:
      "Noornest Insights provides expert property investment strategies, market trends, and real estate advice for UK buyers and investors.",
    url: "https://noornest.co.uk/insights",
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
      <JsonLd data={blogSchema} id="blog-listing-schema" />
      {children}
    </>
  );
}
