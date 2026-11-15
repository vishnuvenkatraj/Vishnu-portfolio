"use client";

import { SkillsSandbox } from "./SkillsSandbox";
import { CategorizedSkills } from "./CategorizedSkills";
import { Cpu, Layers, Sparkles } from "lucide-react";

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Technology Core</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical Arsenal &amp; Physics Sandbox
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            An interactive 2D physics simulation alongside a comprehensive categorized inventory of
            languages, frameworks, and architecture tools.
          </p>
        </div>

        {/* Component 1: Interactive Technology Sandbox (Matter.js) */}
        <div>
          <SkillsSandbox />
        </div>

        {/* Component 2: Categorized Skills Inventory */}
        <div className="pt-6">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Full Technology Breakdown</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
              Filtered by architecture domain with clear technical capabilities.
            </p>
          </div>

          <CategorizedSkills />
        </div>
      </div>
    </section>
  );
}
