"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { achievementsData, AchievementType } from "@/data/achievements";
import {
  Award,
  Calendar,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function AchievementsSection() {
  const [selectedFilter, setSelectedFilter] = useState<AchievementType | "All">("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filterOptions: Array<AchievementType | "All"> = [
    "All",
    "Certification",
    "Hackathon",
    "Award",
    "Competition",
  ];

  const filteredItems =
    selectedFilter === "All"
      ? achievementsData
      : achievementsData.filter((item) => item.type === selectedFilter);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
              <span>Verified Honors</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Certifications &amp; Achievements
            </h2>
            <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
              Industry cloud certifications, competitive hackathons, and collegiate awards.
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
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                <div>
                  {/* Preview Image if available */}
                  {item.previewImage && (
                    <div className="relative w-full h-44 overflow-hidden bg-slate-950">
                      <Image
                        src={item.previewImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#060a17]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{item.issuerOrEvent}</span>
                      <span className="text-cyan-400">{item.date}</span>
                    </div>

                    <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-2">
                      {item.description}
                    </p>

                    {item.credentialId && (
                      <div className="text-[10px] font-mono text-slate-400 pt-1">
                        ID: {item.credentialId}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expandable Takeaways */}
                <div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-4 pt-1 space-y-2 border-t border-white/5"
                      >
                        <div className="text-[11px] font-mono font-semibold uppercase text-cyan-400">
                          Key Validations &amp; Skills:
                        </div>
                        <ul className="space-y-1.5">
                          {item.keyTakeaways.map((takeaway, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-300 flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Actions Footer */}
                  <div className="px-6 py-3.5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? "Collapse" : "View Takeaways"}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {item.verificationUrl && (
                      <a
                        href={item.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                        title="Verify Credential"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
