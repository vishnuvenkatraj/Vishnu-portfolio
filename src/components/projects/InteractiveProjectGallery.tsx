"use client";

import { useState } from "react";
import { SafeProjectImage } from "./SafeProjectImage";
import { ImageLightbox, LightboxImage } from "@/components/ui/ImageLightbox";
import { Maximize2, Sparkles } from "lucide-react";

interface InteractiveProjectGalleryProps {
  coverImage: string;
  projectTitle: string;
  projectSubtitle: string;
  gallery: Array<{
    imageUrl: string;
    title: string;
    caption: string;
  }>;
}

export function InteractiveProjectGallery({
  coverImage,
  projectTitle,
  projectSubtitle,
  gallery,
}: InteractiveProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Construct complete lightbox image collection: [cover, ...gallery]
  const allImages: LightboxImage[] = [
    {
      url: coverImage,
      title: `${projectTitle} — System Architecture & Cover`,
      caption: projectSubtitle,
      badge: "Overview Hero",
    },
    ...gallery.map((g, idx) => ({
      url: g.imageUrl,
      title: `${projectTitle} — ${g.title}`,
      caption: g.caption,
      badge: `Gallery #${idx + 1}`,
    })),
  ];

  return (
    <>
      {/* 1. Hero Cover Image with Zoom Trigger */}
      <div
        onClick={() => setLightboxIndex(0)}
        className="relative w-full h-80 sm:h-[480px] rounded-2xl overflow-hidden border border-white/10 light:border-[#89958B]/35 shadow-2xl bg-[#02050e] light:bg-[#FAF7F2] flex items-center justify-center p-3 cursor-pointer group/hero transition-all hover:border-cyan-500/40 light:hover:border-[#702B40]/40"
        title="Click to view full-size in Lightbox"
      >
        <SafeProjectImage
          src={coverImage}
          alt={projectTitle}
          fill
          priority
          className="object-contain object-center transition-transform duration-500 group-hover/hero:scale-[1.02]"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/hero:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 py-2 rounded-full bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-2xl">
            <Maximize2 className="w-4 h-4" />
            <span>Click to Zoom &amp; Explore Gallery ({allImages.length} Images)</span>
          </span>
        </div>
      </div>

      {/* 2. Deep Dive Interface Gallery Section */}
      {gallery && gallery.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
              <span>07</span>
              <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
              <span>Interface Gallery &amp; Screenshots ({gallery.length} Images)</span>
            </h2>
            <span className="text-xs font-mono text-slate-400 light:text-[#5E6A66] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
              Click any screenshot to open full-screen lightbox
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item, i) => (
              <div
                key={i}
                onClick={() => setLightboxIndex(i + 1)} // offset by 1 for cover
                className="rounded-2xl overflow-hidden border border-white/10 light:border-[#89958B]/35 bg-[#060a17]/90 light:bg-[#FAF7F2] space-y-3 p-3.5 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/40 light:hover:border-[#702B40]/40 transition-all cursor-pointer group shadow-sm hover:shadow-xl"
                title="Click to view full-size in Lightbox"
              >
                {/* 16:10 container with object-contain to prevent cropping or stretching */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#030611] light:bg-[#F5F0E6] border border-white/5 light:border-[#89958B]/30 flex items-center justify-center p-2">
                  <SafeProjectImage
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 rounded-full bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="px-1 pb-1">
                  <div className="font-semibold text-sm text-white light:text-[#252B29] group-hover:text-cyan-400 light:group-hover:text-[#702B40] transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 light:text-[#4A5551] mt-1.5 font-normal leading-relaxed">
                    {item.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxIndex !== null}
        images={allImages}
        currentIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </>
  );
}
