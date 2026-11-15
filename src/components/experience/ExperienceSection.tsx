"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional Experience &amp; Impact
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            A chronological timeline of engineering leadership, production software delivery, and
            distributed systems architecture.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#060913] border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 space-y-6 group-hover:bg-white/[0.04]">
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {exp.type}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-300 mt-1 flex items-center gap-2">
                      <span>{exp.organization}</span>
                      {exp.department && (
                        <>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 font-normal">{exp.department}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Duration & Location */}
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 text-xs font-mono text-slate-400 shrink-0">
                    <span className="flex items-center gap-1.5 text-cyan-300/90">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {exp.summary}
                </p>

                {/* Technical Contributions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Technical Contributions &amp; Architectural Wins</span>
                  </h4>
                  <ul className="space-y-2">
                    {exp.technicalContributions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Responsibilities */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Gained Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skillsGained.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
