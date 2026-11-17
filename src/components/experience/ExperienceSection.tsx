"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
  FileCheck,
} from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28 overflow-hidden bg-background">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 light:bg-cyan-50 border border-cyan-500/20 light:border-cyan-200 text-cyan-400 light:text-cyan-700 text-xs font-mono uppercase tracking-wider font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Practical Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Internship &amp; Industry Experience
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl text-base sm:text-lg font-light">
            Hands-on technical internship experience in embedded systems, microcontroller programming,
            and circuit simulation.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 light:border-slate-300 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
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
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#060913] light:bg-white border-2 border-cyan-400 light:border-cyan-600 group-hover:bg-cyan-400 group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 hover:border-cyan-500/30 light:hover:border-cyan-500/50 transition-all duration-300 space-y-6 group-hover:bg-white/[0.04] light:group-hover:bg-slate-50 light:shadow-md">
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg sm:text-xl font-bold text-white light:text-slate-900 group-hover:text-cyan-300 light:group-hover:text-cyan-700 transition-colors">
                        {exp.role}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 light:bg-cyan-50 text-cyan-300 light:text-cyan-800 border border-cyan-500/30 light:border-cyan-200 font-semibold">
                        {exp.type}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-300 light:text-slate-800 mt-1 flex items-center gap-2">
                      <span>{exp.organization}</span>
                      {exp.department && (
                        <>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 light:text-slate-500 font-normal">{exp.department}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Duration & Location */}
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 text-xs font-mono text-slate-400 light:text-slate-600 shrink-0">
                    <span className="flex items-center gap-1.5 text-cyan-300 light:text-cyan-700 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-600" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 light:text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 light:text-slate-700 font-light leading-relaxed">
                  {exp.summary}
                </p>

                {/* Tools Used */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 light:text-cyan-700 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Tools &amp; Development Environments</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-lg bg-cyan-950/40 light:bg-cyan-50 border border-cyan-500/30 light:border-cyan-200 font-mono text-xs text-cyan-300 light:text-cyan-800 font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-2 pt-2 border-t border-white/5 light:border-slate-200">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 light:text-slate-600">
                    Responsibilities &amp; Tasks
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 light:text-slate-700 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 light:text-cyan-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certificate Placeholder / Verification */}
                {exp.certificatePlaceholder && (
                  <div className="pt-3 border-t border-white/5 light:border-slate-200 flex items-center gap-2 text-xs font-mono text-slate-400 light:text-slate-600">
                    <FileCheck className="w-4 h-4 text-cyan-400 light:text-cyan-600" />
                    <span>{exp.certificatePlaceholder}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
