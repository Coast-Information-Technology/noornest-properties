import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import AppLayout from "./AppLayout";

export const metadata: Metadata = {
  title: "Onboarding | Noornest Properties",
  description: "Complete your profile to get started with Noornest.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Noornest",
    url: "https://noornest.co.uk/",
  };

  return (
    <>
      <JsonLd data={websiteSchema} id="onboarding-page-schema" />
      <AppLayout>{children}</AppLayout>
    </>
  );
}
