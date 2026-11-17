"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { normalizeImagePath } from "@/lib/utils";

interface SafeProjectImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80";

export function SafeProjectImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  className,
  ...props
}: SafeProjectImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(normalizeImagePath(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(normalizeImagePath(src));
    setHasError(false);
  }, [src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt || "Project preview"}
      className={className}
      onError={() => {
        if (!hasError && currentSrc !== fallbackSrc) {
          setHasError(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
