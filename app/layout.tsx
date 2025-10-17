import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import BackToTopButton from "@/components/ui/BackToTopButton";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Noornest Properties - Real Estate Investment Platform",
  description:
    "Discover below-market-value properties and make smart real estate investments with our advanced BMV analyzer tool.",
  keywords: [
    "real estate",
    "property investment",
    "BMV analyzer",
    "below market value",
    "property listings",
  ],
  authors: [{ name: "Noornest Properties" }],
  creator: "Noornest Properties",
  publisher: "Noornest Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://noornestproperties.com"),
  openGraph: {
    title: "Noornest Properties - Real Estate Investment Platform",
    description:
      "Discover below-market-value properties and make smart real estate investments with our advanced BMV analyzer tool.",
    url: "https://noornestproperties.com",
    siteName: "Noornest Properties",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Noornest Properties",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noornest Properties - Real Estate Investment Platform",
    description:
      "Discover below-market-value properties and make smart real estate investments with our advanced BMV analyzer tool.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnimationProvider>
          <Header />
          {children}
          <Footer />
          <BackToTopButton />
          <Toaster richColors closeButton />
        </AnimationProvider>
      </body>
    </html>
  );
}
