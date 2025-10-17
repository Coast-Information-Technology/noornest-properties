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

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fill={fill}
      priority={priority}
      onError={() => setImageError(true)}
    />
  );
}
