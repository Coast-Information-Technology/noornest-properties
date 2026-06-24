"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";
import GuestTouchTracker from "@/components/providers/GuestTouchTracker";

const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => null,
  ssr: true,
});

const authPaths = ["/login", "/register", "/forgot-password", "/new-password", "/verify-email"];

export default function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";

  const shouldShowHeaderFooter = !authPaths.some((path) => pathname.startsWith(path));

  return (
    <>
      <GuestTouchTracker enabled={shouldShowHeaderFooter} />
      {shouldShowHeaderFooter && <Header />}
      {children}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}
