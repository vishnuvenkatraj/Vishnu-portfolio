"use client";

import { profileData } from "@/data/profile";

export function TechMarquee() {
  const items = [...profileData.technologiesTicker, ...profileData.technologiesTicker];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/5 bg-white/[0.01]">
      {/* Side Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#060913] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#060913] to-transparent pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="flex items-center gap-2 mx-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all select-none cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
