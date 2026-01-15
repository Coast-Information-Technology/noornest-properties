"use client";

import Image from "next/image";
import { useState } from "react";

interface PropertyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export default function PropertyImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  priority = false,
}: PropertyImageProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback image for when the actual image fails to load
  // const fallbackSrc = "/hero-img.png";

  if (imageError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🏠</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    );
  }

  // Calculate proper sizes attribute when width/height are provided
  const getSizes = () => {
    if (fill) {
      return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
    }
    if (width) {
      // For fixed width images, use responsive sizes based on viewport
      // Property cards display at h-64 (256px height), aspect ratio ~1.5:1 = ~384px width
      if (width === 400) {
        // Property cards: displayed as ~378px width on desktop (based on grid), full width on mobile
        // Use smaller sizes to match actual display dimensions
        return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px";
      }
      if (width <= 384) return "(max-width: 768px) 100vw, 384px";
      if (width <= 640) return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px";
      return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px";
    }
    return undefined;
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fill={fill}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      quality={85}
      sizes={getSizes()}
      onError={() => setImageError(true)}
    />
  );
}
