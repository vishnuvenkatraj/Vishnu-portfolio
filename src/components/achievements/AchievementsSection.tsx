"use client";

import { useState } from "react";
import { achievementsData, AchievementType } from "@/data/achievements";
import {
  Award,
  Calendar,
  Sparkles,
  FileCheck,
} from "lucide-react";

export function AchievementsSection() {
  const [selectedFilter, setSelectedFilter] = useState<AchievementType | "All">("All");

  const filterOptions: Array<AchievementType | "All"> = [
    "All",
    "Award",
    "Hackathon",
    "Certification",
  ];

  const filteredItems =
    selectedFilter === "All"
      ? achievementsData
      : achievementsData.filter((item) => item.type === selectedFilter);

  return (
    <section id="achievements" className="relative py-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Competitions &amp; Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Achievements, Hackathons &amp; Certifications
            </h2>
            <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
              Awards, competitive 24-hour hackathon participations, and verified technical certifications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((filter) => {
              const isSelected = selectedFilter === filter;
              const count =
                filter === "All"
                  ? achievementsData.length
                  : achievementsData.filter((a) => a.type === filter).length;

              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {filter} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between overflow-hidden group shadow-lg p-6 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                      item.type === "Award"
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : item.type === "Hackathon"
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                        : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    {item.type}
                  </span>

                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {item.issuerOrEvent}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>

                {item.score && (
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold">
                    {item.score}
                  </div>
                )}
              </div>

              {/* Certificate Placeholder or Verified Note */}
              <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-400">
                <FileCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{item.credentialPlaceholder}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
