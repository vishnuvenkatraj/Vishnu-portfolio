"use client";

import { motion } from "framer-motion";
import { educationData } from "@/data/education";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";

export function EducationSection() {
  const undergrad = educationData.find((e) => e.isUndergraduate);
  const schoolEntries = educationData.filter((e) => !e.isUndergraduate);

  return (
    <section id="education" className="relative py-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education &amp; Academic Milestones
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            Formal education in Computer Science and Business Systems, combined with foundational schooling.
          </p>
        </div>

        {/* Education Display */}
        <div className="space-y-6">
          {/* Highlighted Undergraduate Card */}
          {undergrad && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden space-y-4"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono mb-2">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Undergraduate Degree</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {undergrad.degree}
                  </h3>
                  <div className="text-base font-semibold text-cyan-300 mt-1">
                    {undergrad.institution}
                  </div>
                  {undergrad.department && (
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {undergrad.department}
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col items-start md:items-end gap-2 text-xs font-mono text-slate-400 shrink-0">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {undergrad.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {undergrad.location}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 font-semibold font-mono text-xs">
                    {undergrad.academicPerformance}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Compact School Education Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schoolEntries.map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {school.duration}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium">
                    {school.academicPerformance}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-base">
                  {school.degree}
                </h4>
                <div className="text-xs text-slate-400">
                  {school.institution}
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {school.location}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
