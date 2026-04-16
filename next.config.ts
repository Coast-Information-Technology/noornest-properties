import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Image optimization (kept simple and stable)
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimized device sizes - removed unnecessary large sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Optimized image sizes - added 400px for property cards
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 400],
    qualities: [60, 75, 85, 90],
    minimumCacheTTL: 60,
  },

  // Remove console statements in production (SWC compiler)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      // Next requires at least one entry in `exclude`.
      // Keep `error`/`warn` so debugging remains possible in production logs.
      exclude: ["error", "warn"],
    } : false,
  },

  // Intentionally do not inline env vars via `next.config.env`.
  // This prevents build-time "undefined" values from getting baked into server code,
  // which can cause runtime failures like missing API base URL configuration.

  // Fallback: Remove console statements via webpack/Terser if SWC is not used
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Remove console statements in production client builds
      const originalMinimizer = config.optimization?.minimizer || [];
      config.optimization = {
        ...config.optimization,
        minimizer: originalMinimizer.map((plugin: any) => {
          // Handle TerserPlugin
          if (plugin.constructor.name === 'TerserPlugin' || 
              (plugin.options && plugin.options.terserOptions)) {
            return {
              ...plugin,
              options: {
                ...plugin.options,
                terserOptions: {
                  ...plugin.options?.terserOptions,
                  compress: {
                    ...plugin.options?.terserOptions?.compress,
                    drop_console: true, // Remove all console statements
                  },
                },
              },
            };
          }
          return plugin;
        }),
      };
    }
    return config;
  },
};

export default nextConfig;
