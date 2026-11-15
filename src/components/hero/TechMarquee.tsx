"use client";

import { profileData } from "@/data/profile";
import {
  JavaIcon,
  CIcon,
  ReactIcon,
  NodeIcon,
  Html5Icon,
  Css3Icon,
  MySqlIcon,
  GitIcon,
  GenAiIcon,
  DsaIcon,
  OopIcon,
  BusinessAnalyticsIcon,
  BusinessSystemsIcon,
} from "@/components/ui/BrandIcons";
import { Github } from "lucide-react";

const MARQUEE_ICONS: Record<string, React.ReactNode> = {
  Java: <JavaIcon className="w-3.5 h-3.5 text-amber-500" />,
  C: <CIcon className="w-3.5 h-3.5 text-sky-400" />,
  React: <ReactIcon className="w-3.5 h-3.5 text-cyan-400" />,
  "Node.js": <NodeIcon className="w-3.5 h-3.5 text-emerald-400" />,
  MySQL: <MySqlIcon className="w-3.5 h-3.5 text-sky-300" />,
  Git: <GitIcon className="w-3.5 h-3.5 text-orange-400" />,
  GitHub: <Github className="w-3.5 h-3.5 text-slate-200" />,
  "Generative AI": <GenAiIcon className="w-3.5 h-3.5 text-cyan-300" />,
  "Object-Oriented Programming": <OopIcon className="w-3.5 h-3.5 text-cyan-400" />,
  "Data Structures": <DsaIcon className="w-3.5 h-3.5 text-purple-400" />,
  HTML: <Html5Icon className="w-3.5 h-3.5 text-orange-500" />,
  CSS: <Css3Icon className="w-3.5 h-3.5 text-blue-400" />,
  "Business Analytics": <BusinessAnalyticsIcon className="w-3.5 h-3.5 text-emerald-400" />,
  "Business Systems": <BusinessSystemsIcon className="w-3.5 h-3.5 text-indigo-400" />,
};

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
            {MARQUEE_ICONS[tech] || <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />}
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
