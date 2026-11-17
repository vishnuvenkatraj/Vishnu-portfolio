"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  achievementsData,
  AchievementItem,
  CertificateCategory,
  CERTIFICATE_CATEGORIES,
} from "@/data/achievements";
import { ImageLightbox, LightboxImage } from "@/components/ui/ImageLightbox";
import {
  Trophy,
  Medal,
  Clock,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Calendar,
  Maximize2,
  FileCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  Layers,
  Award,
  BookOpen,
  Building2,
  Globe,
} from "lucide-react";

type ActiveTab = CertificateCategory | "all";

export function AchievementsSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("competitions");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (activeTab === "all") return achievementsData;
    return achievementsData.filter((item) => item.category === activeTab);
  }, [activeTab]);

  // Counts per category
  const counts = useMemo(() => {
    return {
      all: achievementsData.length,
      competitions: achievementsData.filter((a) => a.category === "competitions").length,
      academic: achievementsData.filter((a) => a.category === "academic").length,
      professional: achievementsData.filter((a) => a.category === "professional").length,
    };
  }, []);

  // Prepare images array for ImageLightbox
  const lightboxImages: LightboxImage[] = useMemo(() => {
    return filteredItems.map((item) => ({
      url: item.previewImage,
      title: item.title,
      caption: `${item.issuerOrEvent} • ${item.date} • ${item.description}`,
      badge: item.statusBadge,
    }));
  }, [filteredItems]);

  const handleOpenCertificate = (index: number) => {
    setActiveLightboxIndex(index);
  };

  return (
    <section id="achievements" className="relative py-28 overflow-hidden bg-background">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 dark:bg-cyan-500/10 light:bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-purple-600/10 dark:bg-purple-500/10 light:bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 dark:bg-indigo-500/5 light:bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-50 border border-cyan-500/20 light:border-cyan-200 text-cyan-400 light:text-cyan-800 text-xs font-mono uppercase tracking-wider font-semibold shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-700" />
            <span>Verified Credentials &amp; Recognition</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight">
                Certificates &amp; Achievements
              </h2>
              <p className="text-slate-400 light:text-slate-600 max-w-2xl text-base sm:text-lg font-light mt-2">
                Organized into three distinct disciplines: competitive hackathons and awards, academic NPTEL certifications, and professional enterprise credentials.
              </p>
            </div>

            {/* Quick Stat Counter Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-xl bg-white/[0.03] light:bg-white border border-white/10 light:border-slate-200 shadow-sm text-center">
                <span className="block text-2xl font-mono font-extrabold text-cyan-400 light:text-cyan-700">
                  {counts.all}
                </span>
                <span className="text-[10px] uppercase font-mono text-slate-400 light:text-slate-500 tracking-wider">
                  Total Credentials
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Interactive Category Tabs (with Certificate Counts) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tab 1: Competitions & Achievements */}
          <button
            onClick={() => setActiveTab("competitions")}
            className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer group flex flex-col justify-between ${
              activeTab === "competitions"
                ? "bg-gradient-to-br from-cyan-950/40 via-[#070e1c] to-[#040812] light:from-cyan-50 light:via-white light:to-white border-cyan-400 light:border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.25)] light:shadow-md"
                : "bg-white/[0.02] light:bg-white border-white/10 light:border-slate-200 hover:border-cyan-500/30 light:hover:border-cyan-300 light:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className={`p-2.5 rounded-xl transition-colors ${
                  activeTab === "competitions"
                    ? "bg-cyan-500/20 light:bg-cyan-100 text-cyan-300 light:text-cyan-800"
                    : "bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600 group-hover:text-cyan-400"
                }`}
              >
                <Trophy className="w-5 h-5" />
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold transition-all ${
                  activeTab === "competitions"
                    ? "bg-cyan-500 light:bg-cyan-600 text-black light:text-white shadow-sm"
                    : "bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600"
                }`}
              >
                {counts.competitions}
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-white light:text-slate-900 leading-snug">
                1. Competitions &amp; Achievements
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-600 font-light mt-0.5">
                Hackathons, Ideathons &amp; Awards
              </p>
            </div>
            {activeTab === "competitions" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500" />
            )}
          </button>

          {/* Tab 2: Academic Certifications (NPTEL) */}
          <button
            onClick={() => setActiveTab("academic")}
            className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer group flex flex-col justify-between ${
              activeTab === "academic"
                ? "bg-gradient-to-br from-amber-950/40 via-[#100d07] to-[#080603] light:from-amber-50 light:via-white light:to-white border-amber-400 light:border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.25)] light:shadow-md"
                : "bg-white/[0.02] light:bg-white border-white/10 light:border-slate-200 hover:border-amber-500/30 light:hover:border-amber-300 light:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className={`p-2.5 rounded-xl transition-colors ${
                  activeTab === "academic"
                    ? "bg-amber-500/20 light:bg-amber-100 text-amber-300 light:text-amber-800"
                    : "bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600 group-hover:text-amber-400"
                }`}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold transition-all ${
                  activeTab === "academic"
                    ? "bg-amber-500 light:bg-amber-600 text-black light:text-white shadow-sm"
                    : "bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600"
                }`}
              >
                {counts.academic}
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-white light:text-slate-900 leading-snug">
                2. Academic Certifications
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-600 font-light mt-0.5">
                NPTEL &amp; Ministry of Education
              </p>
            </div>
            {activeTab === "academic" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
            )}
          </button>

          {/* Tab 3: Professional Certifications */}
          <button
            onClick={() => setActiveTab("professional")}
            className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer group flex flex-col justify-between ${
              activeTab === "professional"
                ? "bg-gradient-to-br from-blue-950/40 via-[#070b1c] to-[#040612] light:from-blue-50 light:via-white light:to-white border-blue-400 light:border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.25)] light:shadow-md"
                : "bg-white/[0.02] light:bg-white border-white/10 light:border-slate-200 hover:border-blue-500/30 light:hover:border-blue-300 light:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className={`p-2.5 rounded-xl transition-colors ${
                  activeTab === "professional"
                    ? "bg-blue-500/20 light:bg-blue-100 text-blue-300 light:text-blue-800"
                    : "bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600 group-hover:text-blue-400"
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold transition-all ${
                  activeTab === "professional"
                    ? "bg-blue-500 light:bg-blue-600 text-white shadow-sm"
                    : "bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600"
                }`}
              >
                {counts.professional}
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-white light:text-slate-900 leading-snug">
                3. Professional Certifications
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-600 font-light mt-0.5">
                IBM, Google Cloud, Hedera &amp; Coursera
              </p>
            </div>
            {activeTab === "professional" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />
            )}
          </button>

          {/* Tab 4: All Credentials */}
          <button
            onClick={() => setActiveTab("all")}
            className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer group flex flex-col justify-between ${
              activeTab === "all"
                ? "bg-gradient-to-br from-purple-950/40 via-[#0d071c] to-[#060412] light:from-purple-50 light:via-white light:to-white border-purple-400 light:border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.25)] light:shadow-md"
                : "bg-white/[0.02] light:bg-white border-white/10 light:border-slate-200 hover:border-purple-500/30 light:hover:border-purple-300 light:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className={`p-2.5 rounded-xl transition-colors ${
                  activeTab === "all"
                    ? "bg-purple-500/20 light:bg-purple-100 text-purple-300 light:text-purple-800"
                    : "bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600 group-hover:text-purple-400"
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-purple-500 light:bg-purple-600 text-white shadow-sm"
                    : "bg-white/5 light:bg-slate-100 text-slate-400 light:text-slate-600"
                }`}
              >
                {counts.all}
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-white light:text-slate-900 leading-snug">
                All Verified Credentials
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-600 font-light mt-0.5">
                Complete Inventory ({counts.all} items)
              </p>
            </div>
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
            )}
          </button>
        </div>

        {/* Category Description Banner */}
        <div className="p-4 rounded-xl bg-white/[0.02] light:bg-slate-100 border border-white/10 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300 light:text-slate-700">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-cyan-400 light:text-cyan-800">
              {activeTab === "competitions" && "Category 1 of 3: Competitions & Achievements"}
              {activeTab === "academic" && "Category 2 of 3: Academic Certifications (NPTEL)"}
              {activeTab === "professional" && "Category 3 of 3: Professional Certifications"}
              {activeTab === "all" && "Complete Portfolio Repository"}
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400 light:text-slate-600">
              {activeTab === "competitions" && "Competitive hackathons, appathons, national innovation summits and honors."}
              {activeTab === "academic" && "NPTEL engineering courses verified by Ministry of Education, Govt. of India & IIT."}
              {activeTab === "professional" && "Enterprise-grade technical certifications from IBM, Google Cloud, Hedera & Coursera."}
              {activeTab === "all" && "Showing all 12 verified credentials across competitions, academic, and industry."}
            </span>
          </div>

          <span className="text-slate-400 light:text-slate-600 shrink-0">
            Showing {filteredItems.length} of {counts.all} credentials
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredItems.map((item, index) => {
            const isWinner1st = item.tier === "winner-1st";
            const isWinner3rd = item.tier === "winner-3rd";
            const isHonor = item.tier === "honor";
            const isHackathon = item.tier === "hackathon-24h";
            const isAcademic = item.category === "academic";
            const isProfessional = item.category === "professional";

            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                  isWinner1st
                    ? "bg-gradient-to-b from-amber-500/15 via-[#070b16] to-[#04060d] light:from-amber-50 light:via-white light:to-white border-2 border-amber-400/70 light:border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.18)] hover:shadow-[0_0_45px_rgba(251,191,36,0.28)]"
                    : isWinner3rd
                    ? "bg-gradient-to-b from-cyan-500/10 via-[#070b16] to-[#04060d] light:from-sky-50 light:via-white light:to-white border border-cyan-400/40 light:border-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400"
                    : isHonor
                    ? "bg-gradient-to-b from-emerald-500/10 via-[#070b16] to-[#04060d] light:from-emerald-50 light:via-white light:to-white border border-emerald-400/40 light:border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.12)] hover:border-emerald-400"
                    : isHackathon
                    ? "bg-gradient-to-b from-purple-950/25 via-[#080718] to-[#04040c] light:from-purple-50/70 light:via-white light:to-white border border-purple-500/30 light:border-purple-200 hover:border-purple-400"
                    : isAcademic
                    ? "bg-gradient-to-b from-amber-950/20 via-[#080b14] to-[#04060d] light:from-amber-50/50 light:via-white light:to-white border border-amber-500/30 light:border-amber-200 hover:border-amber-400"
                    : isProfessional
                    ? "bg-gradient-to-b from-blue-950/20 via-[#070b16] to-[#04060d] light:from-blue-50/50 light:via-white light:to-white border border-blue-500/30 light:border-blue-200 hover:border-blue-400"
                    : "bg-[#060a17]/90 light:bg-white border border-white/10 light:border-slate-200 hover:border-cyan-500/30"
                }`}
              >
                {/* 1st Prize Gold Champion Accent Banner */}
                {isWinner1st && (
                  <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono font-extrabold text-black tracking-wider shadow-md">
                    <span className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 fill-black" />
                      1ST PRIZE CHAMPION
                    </span>
                    <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded uppercase font-bold">
                      GOLD PODIUM
                    </span>
                  </div>
                )}

                {/* 24-Hour Hackathon Accent Banner */}
                {isHackathon && (
                  <div className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono font-bold text-white tracking-wider shadow-md">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 animate-pulse" />
                      24-HOUR NON-STOP SPRINT
                    </span>
                    <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded uppercase font-bold">
                      RAPID PROTOTYPE
                    </span>
                  </div>
                )}

                {/* Academic NPTEL Gold Accent Banner */}
                {item.tier === "academic-gold" && (
                  <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-500 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono font-extrabold text-black tracking-wider shadow-md">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      NPTEL ELITE + GOLD MEDAL
                    </span>
                    <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded uppercase font-bold">
                      TOP 1% PERCENTILE
                    </span>
                  </div>
                )}

                {/* Professional Corporate Banner */}
                {isProfessional && (
                  <div className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono font-bold text-white tracking-wider shadow-md">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      PROFESSIONAL CERTIFIED
                    </span>
                    <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded uppercase font-bold">
                      INDUSTRY CREDENTIAL
                    </span>
                  </div>
                )}

                {/* Main Card Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Top Meta Line: Badges + Date */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {isWinner1st ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 light:text-amber-800 border border-amber-500/40 light:border-amber-300">
                            <Trophy className="w-3.5 h-3.5" />
                            {item.statusBadge}
                          </span>
                        ) : isWinner3rd ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 light:text-sky-800 border border-sky-500/40 light:border-sky-300">
                            <Medal className="w-3.5 h-3.5" />
                            {item.statusBadge}
                          </span>
                        ) : isHonor ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 light:text-emerald-800 border border-emerald-500/40 light:border-emerald-300">
                            <Sparkles className="w-3.5 h-3.5" />
                            {item.statusBadge}
                          </span>
                        ) : isHackathon ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 light:text-purple-800 border border-purple-500/40 light:border-purple-300">
                            <Zap className="w-3.5 h-3.5 text-cyan-400" />
                            {item.statusBadge}
                          </span>
                        ) : isAcademic ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 light:text-amber-800 border border-amber-500/40 light:border-amber-300">
                            <GraduationCap className="w-3.5 h-3.5" />
                            {item.statusBadge}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 light:text-blue-800 border border-blue-500/40 light:border-blue-300">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {item.statusBadge}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono text-cyan-400 light:text-cyan-700 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    {/* Certificate Preview Image Frame (Clickable for zoom lightbox) */}
                    <div
                      onClick={() => handleOpenCertificate(index)}
                      className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-slate-950/80 light:bg-slate-100 border border-white/10 light:border-slate-300 group/img cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                      title="Click to zoom certificate full-size"
                    >
                      <Image
                        src={item.previewImage}
                        alt={`${item.title} Certificate`}
                        fill
                        unoptimized
                        className="object-contain p-1.5 transition-transform duration-300 group-hover/img:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                        <div className="px-3.5 py-1.5 rounded-full bg-cyan-500 text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>View Full-Size</span>
                        </div>
                      </div>
                    </div>

                    {/* Title & Organization */}
                    <div>
                      <h3 className="font-bold text-white light:text-slate-900 text-base group-hover:text-cyan-300 light:group-hover:text-cyan-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <div className="text-xs text-slate-400 light:text-slate-600 font-mono mt-1">
                        {item.issuerOrEvent}
                      </div>
                    </div>

                    {/* Score / Status Highlight if present */}
                    {item.score && (
                      <div className="inline-block px-3 py-1 rounded-lg bg-emerald-950/40 light:bg-emerald-50 border border-emerald-500/40 light:border-emerald-300 text-emerald-300 light:text-emerald-800 font-mono text-xs font-bold">
                        {item.score}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed font-light">
                      {item.description}
                    </p>

                    {/* Highlight Pills */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200 text-[10px] font-mono text-slate-300 light:text-slate-700"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom / Action Footer */}
                  <div className="pt-4 mt-2 border-t border-white/10 light:border-slate-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 light:text-cyan-700">
                      <FileCheck className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[160px] sm:max-w-[190px]">
                        {item.credentialId || "Verified Credential"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenCertificate(index)}
                      className="px-3 py-1 rounded-lg bg-white/5 light:bg-slate-100 hover:bg-cyan-500/20 light:hover:bg-cyan-100 text-cyan-300 light:text-cyan-800 border border-white/10 light:border-slate-300 hover:border-cyan-400/40 text-xs font-mono transition-all flex items-center gap-1 cursor-pointer shrink-0 font-medium"
                    >
                      <span>Preview</span>
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox Viewer with Next / Previous Gallery Navigation */}
      <ImageLightbox
        isOpen={activeLightboxIndex !== null}
        images={lightboxImages}
        currentIndex={activeLightboxIndex ?? 0}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIndex) => setActiveLightboxIndex(newIndex)}
      />
    </section>
  );
}
