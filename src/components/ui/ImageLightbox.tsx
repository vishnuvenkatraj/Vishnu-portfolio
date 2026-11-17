"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  ExternalLink,
} from "lucide-react";

export interface LightboxImage {
  url: string;
  title: string;
  caption?: string;
  badge?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex?: number;
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
}

export function ImageLightbox({
  isOpen,
  images,
  currentIndex = 0,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(currentIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  // Sync internal index when prop changes
  useEffect(() => {
    setIndex(currentIndex);
    setIsZoomed(false);
  }, [currentIndex, isOpen]);

  const total = images.length;
  const currentImage = images[index] || images[0];

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setIsZoomed(false);
    const prev = (index - 1 + total) % total;
    setIndex(prev);
    onNavigate?.(prev);
  }, [index, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setIsZoomed(false);
    const next = (index + 1) % total;
    setIndex(next);
    onNavigate?.(next);
  }, [index, total, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex flex-col justify-between p-4 sm:p-6 bg-black/95 backdrop-blur-xl">
        {/* Top Control Bar */}
        <div className="relative z-10 flex items-center justify-between gap-4 w-full max-w-6xl mx-auto">
          {/* Image Counter & Badge */}
          <div className="flex items-center gap-3">
            {total > 1 && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono border border-white/10">
                {index + 1} / {total}
              </span>
            )}
            {currentImage.badge && (
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/30">
                {currentImage.badge}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Zoom toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title={isZoomed ? "Zoom out" : "Zoom in"}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>

            {/* Direct Open / Download */}
            <a
              href={currentImage.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Open full size / Download"
              aria-label="Open full size or download image"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white border border-rose-500/30 transition-colors cursor-pointer"
              title="Close viewer (Esc)"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Stage: Image with Left / Right Arrows */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-4 overflow-hidden">
          {/* Previous Arrow Button */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-2xl backdrop-blur-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Arrow Button */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-2xl backdrop-blur-md"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image Display */}
          <div
            className={`relative w-full h-full flex items-center justify-center p-2 transition-transform duration-300 ${
              isZoomed ? "scale-125 cursor-zoom-out overflow-auto" : "cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <motion.div
              key={currentImage.url}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.title}
                fill
                unoptimized
                priority
                className="object-contain drop-shadow-2xl select-none"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
            {currentImage.title}
          </h3>
          {currentImage.caption && (
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light leading-relaxed max-w-2xl mx-auto">
              {currentImage.caption}
            </p>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
