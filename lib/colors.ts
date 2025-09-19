/**
 * Noornest Properties Color Scheme
 *
 * Primary Color: #BFA14A (Gold/Bronze)
 * Secondary Color: #0A0A0A (Near Black)
 * Accent Color: #EADBC8 (Cream/Beige)
 */

export const colors = {
  primary: {
    50: "#F7F4ED",
    100: "#EFE8D6",
    200: "#DFD1AD",
    300: "#CFBA84",
    400: "#BFA14A",
    500: "#BFA14A", // Main primary color
    600: "#A68B3E",
    700: "#8C7532",
    800: "#735F26",
    900: "#59491A",
    950: "#40330E",
  },
  secondary: {
    50: "#E6E6E6",
    100: "#CCCCCC",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#0A0A0A", // Main secondary color
    600: "#080808",
    700: "#060606",
    800: "#040404",
    900: "#020202",
    950: "#000000",
  },
  accent: {
    50: "#FDFCF9",
    100: "#FBF8F2",
    200: "#F7F1E5",
    300: "#F3EAD8",
    400: "#EFE3CB",
    500: "#EADBC8", // Main accent color
    600: "#E5D3B5",
    700: "#E0CBA2",
    800: "#DBC38F",
    900: "#D6BB7C",
    950: "#D1B369",
  },
} as const;

// Semantic color mappings
export const semanticColors = {
  // Brand colors
  brand: {
    primary: colors.primary[500],
    secondary: colors.secondary[500],
    accent: colors.accent[500],
  },

  // UI states
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Text colors
  text: {
    primary: colors.secondary[500],
    secondary: colors.secondary[300],
    muted: colors.secondary[200],
    inverse: colors.accent[500],
  },

  // Background colors
  background: {
    primary: "#FFFFFF",
    secondary: colors.accent[50],
    tertiary: colors.accent[100],
    dark: colors.secondary[500],
  },

  // Border colors
  border: {
    light: colors.accent[200],
    medium: colors.accent[300],
    dark: colors.secondary[200],
  },
} as const;

// Usage examples for Tailwind classes
export const colorClasses = {
  // Primary button
  "btn-primary": "bg-primary-500 text-primary-foreground hover:bg-primary-600",

  // Secondary button
  "btn-secondary":
    "bg-secondary-500 text-secondary-foreground hover:bg-secondary-600",

  // Accent button
  "btn-accent": "bg-accent-500 text-accent-foreground hover:bg-accent-600",

  // Text colors
  "text-primary": "text-primary-500",
  "text-secondary": "text-secondary-500",
  "text-accent": "text-accent-500",

  // Background colors
  "bg-primary": "bg-primary-500",
  "bg-secondary": "bg-secondary-500",
  "bg-accent": "bg-accent-500",

  // Border colors
  "border-primary": "border-primary-500",
  "border-secondary": "border-secondary-500",
  "border-accent": "border-accent-500",
} as const;
