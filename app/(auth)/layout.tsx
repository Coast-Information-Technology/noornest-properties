import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Noornest Login & Register | Access Verified Properties & Investment Plans",
  description:
    "Sign in or create a free Noornest account to explore verified properties, manage bookings, and access exclusive investment plans in the UK.",
  openGraph: {
    title: "Noornest Login & Register | Access Verified Properties & Investment Plans",
    description:
      "Sign in or create a free Noornest account to explore verified properties, manage bookings, and access exclusive investment plans in the UK.",
    url: "https://noornest.co.uk/login",
    type: "website",
    images: [
      {
        url: "https://noornest.co.uk/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest Login",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noornest Login & Register | Access Verified Properties & Investment Plans",
    description:
      "Sign in or create a free Noornest account to explore verified properties, manage bookings, and access exclusive investment plans in the UK.",
    images: ["https://noornest.co.uk/assets/og-image.jpg"],
  },
  alternates: {
    canonical: "https://noornest.co.uk/login",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Noornest",
    url: "https://noornest.co.uk/",
    potentialAction: [
      {
        "@type": "LoginAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://noornest.co.uk/login",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
          encodingType: "application/x-www-form-urlencoded",
        },
        "query-input": ["required name=email", "required name=password"],
      },
      {
        "@type": "RegisterAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://noornest.co.uk/register",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
          encodingType: "application/x-www-form-urlencoded",
        },
        "query-input": [
          "required name=fullName",
          "required name=email",
          "required name=password",
          "optional name=role",
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={websiteSchema} id="auth-page-schema" />
      {children}
    </>
  );
}
