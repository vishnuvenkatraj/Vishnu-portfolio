"use client";

import { motion } from "framer-motion";
import { educationData } from "@/data/education";
import {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  MapPin,
  CheckCircle,
} from "lucide-react";

export function EducationSection() {
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
            Education &amp; Foundations
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            Formal training in computational complexity, distributed systems, and computer engineering.
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-8">
          {educationData.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all space-y-6"
            >
              {/* Institution, Degree, Time */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-semibold text-cyan-400 mt-1">
                    {edu.institution}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {edu.department}
                  </div>
                </div>

                <div className="flex md:flex-col items-start md:items-end gap-2 text-xs font-mono text-slate-400 shrink-0">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {edu.location}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                    {edu.academicPerformance}
                  </span>
                </div>
              </div>

              {/* Honors / Accolades */}
              {edu.honors && edu.honors.length > 0 && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>Academic Honors &amp; Leadership</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {edu.honors.map((honor, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{honor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Relevant Coursework */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Rigorous Coursework Completed</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {edu.relevantCoursework.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-mono"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Capstone Highlights */}
              {edu.highlights && edu.highlights.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Academic Highlights
                  </h4>
                  <ul className="space-y-1.5">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
