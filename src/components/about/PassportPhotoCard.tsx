"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ZoomIn,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { profilePhotoConfig } from "@/data/profile-image";
import { ImageLightbox, type LightboxImage } from "@/components/ui/ImageLightbox";

interface PassportPhotoCardProps {
  className?: string;
}

export function PassportPhotoCard({ className = "" }: PassportPhotoCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const lightboxImages: LightboxImage[] = [
    {
      url: profilePhotoConfig.url,
      title: profilePhotoConfig.fullName,
      caption: `${profilePhotoConfig.role} • ${profilePhotoConfig.department} • ${profilePhotoConfig.location}`,
      badge: profilePhotoConfig.badge,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative group w-full max-w-[340px] sm:max-w-[360px] mx-auto ${className}`}
      >
        {/* Ambient Subtle Glow - Theme Adaptive */}
        <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-b from-cyan-500/20 via-sky-500/10 to-indigo-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Outer Card Frame */}
        <div className="relative rounded-2xl bg-[#090f20]/90 dark:bg-[#090f20]/90 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200/90 shadow-2xl dark:shadow-2xl light:shadow-xl light:shadow-slate-200/70 backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 group-hover:border-cyan-500/40">
          {/* Card Top Header - Passport Identity Badge */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10 dark:border-white/10 light:border-slate-200">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-50 border border-cyan-500/30 text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-800">
                Official Portrait
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 light:bg-emerald-50 border border-emerald-500/30 text-[10px] font-mono font-medium text-emerald-400 dark:text-emerald-400 light:text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>Verified ID</span>
            </div>
          </div>

          {/* Dedicated Photo Showcase Area */}
          <div
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxOpen(true);
              }
            }}
            className="relative w-full rounded-xl overflow-hidden cursor-pointer select-none border-2 border-white/15 dark:border-white/15 light:border-slate-300 shadow-inner group/photo focus:outline-none focus:ring-2 focus:ring-cyan-400"
            style={{
              aspectRatio: "803 / 1024", // Exact natural passport aspect ratio
            }}
            title="Click to view full-size passport photograph"
          >
            {/* The Actual Passport Photograph */}
            <Image
              src={profilePhotoConfig.url}
              alt={profilePhotoConfig.alt}
              width={803}
              height={1024}
              priority
              quality={95}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-[1.02]"
            />

            {/* Subtle Gradient Shadow at the bottom of the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Interactive Zoom Overlay Hint */}
            <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-medium border border-cyan-400/40 shadow-lg transform translate-y-2 group-hover/photo:translate-y-0 transition-transform duration-300">
                <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Full Size</span>
              </div>
            </div>

            {/* Passport Frame Corner Accents (Top-Left & Bottom-Right) */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />
          </div>

          {/* Passport Identity Metadata Panel */}
          <div className="mt-4 pt-3 border-t border-white/10 dark:border-white/10 light:border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                  {profilePhotoConfig.fullName}
                </h4>
                <p className="text-xs font-medium text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
                  {profilePhotoConfig.role}
                </p>
              </div>

              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 light:from-cyan-100 light:to-blue-100 border border-cyan-500/30 light:border-cyan-300 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 light:text-cyan-800">
                VV
              </div>
            </div>

            <div className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400 light:text-cyan-600 shrink-0" />
                <span className="truncate">{profilePhotoConfig.department}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-slate-400 light:text-slate-500 shrink-0" />
                <span>{profilePhotoConfig.location}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Full-Screen Lightbox Zoom for the Passport Photo */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={0}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
