"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import {
  Code,
  Compass,
  Cpu,
  Target,
  BookOpen,
  Sparkles,
  Layers,
  CheckCircle,
} from "lucide-react";

export function About() {
  const [activeTab, setActiveTab] = useState<"interests" | "philosophy" | "objectives">("interests");

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile &amp; Vision</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Me &amp; Background
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            Computer Science and Business Systems undergraduate focused on software engineering,
            problem-solving, and technology-driven innovation.
          </p>
        </div>

        {/* Top Grid: Bio & Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Main Editorial Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none" />

              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Professional Overview</span>
              </h3>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base font-light">
                <p>
                  I am a Computer Science and Business Systems undergraduate with a strong interest in software engineering, problem-solving and technology-driven innovation.
                </p>
                <p>
                  I enjoy developing practical applications, exploring emerging technologies and transforming ideas into meaningful solutions. Through projects in healthcare and e-governance, technical competitions, and engineering innovation concepts, I continuously work to strengthen my technical abilities and development experience.
                </p>
                <p>
                  My involvement in innovation projects, including FlowVault and RESQTRAK, reflects my interest in exploring practical solutions to real-world challenges.
                </p>
                <p className="text-white font-medium">
                  My goal is to grow as a software developer and contribute to impactful technology solutions.
                </p>
              </div>

              {/* Quick Focus Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                      Software Engineering
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Building practical web applications and core problem-solving solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                      Practical Innovation
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Transforming ideas into meaningful solutions for real-world challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Matrix (Real Confirmed Figures Only) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {profileData.metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all hover:bg-white/[0.04] group flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 font-mono tracking-tight group-hover:scale-105 transition-transform origin-left">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-white mt-2 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-3 font-light leading-snug">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Tabbed Deep-Dive: Interests, Objectives & Philosophy */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8">
          {/* Tab Headers */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab("interests")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "interests"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Development &amp; Technical Interests</span>
            </button>

            <button
              onClick={() => setActiveTab("philosophy")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "philosophy"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Personal Philosophy</span>
            </button>

            <button
              onClick={() => setActiveTab("objectives")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "objectives"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Career Objectives</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="pt-6">
            {activeTab === "interests" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Development Interests</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {profileData.about.developmentInterests.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider font-mono text-indigo-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>Core Technical Focus</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {profileData.about.technicalInterests.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "philosophy" && (
              <div className="max-w-3xl space-y-4 text-slate-300 leading-relaxed font-light text-base">
                <blockquote className="border-l-2 border-cyan-400 pl-4 py-1 text-lg italic text-white">
                  &ldquo;{profileData.about.personalPhilosophy}&rdquo;
                </blockquote>
                <p>
                  I believe in learning through continuous hands-on development, rigorous problem-solving,
                  and applying core computer science fundamentals to create practical, well-engineered solutions.
                </p>
              </div>
            )}

            {activeTab === "objectives" && (
              <div className="max-w-3xl space-y-4 text-slate-300 leading-relaxed font-light text-base">
                <p className="text-lg text-white font-medium">
                  {profileData.about.careerObjectives}
                </p>
                <p>
                  Eager to gain industry experience, take on challenging software development responsibilities,
                  and work alongside experienced engineering teams.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
