// components/ui/sonner.tsx
"use client";

import React from "react";
import { useTheme } from "next-themes";
// Import the whole module namespace to avoid undefined default/named export issues
import * as Sonner from "sonner";
import type { ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner.Toaster
      // Sonner supports "light" | "dark" | "system"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Optional custom theming via CSS vars (works if your CSS defines these tokens)
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
export default Toaster;
