"use client";

import { useState, useMemo } from "react";
import { skillsData, SKILL_CATEGORIES, SkillCategory } from "@/data/skills";
import {
  Search,
  CheckCircle2,
  Filter,
  FileCode,
  Code2,
  Terminal,
  Cpu,
  Database,
  Layout,
  Component,
  Globe,
  Palette,
  Sparkles,
  Activity,
  Box,
  Server,
  Layers,
  Network,
  Webhook,
  Radio,
  HardDrive,
  Table,
  FolderTree,
  GitBranch,
  Boxes,
  Workflow,
  Binary,
  ShieldCheck,
} from "lucide-react";

// Icon mapping helper
const ICON_MAP: Record<string, React.ReactNode> = {
  FileCode: <FileCode className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Component: <Component className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Box: <Box className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Webhook: <Webhook className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
  HardDrive: <HardDrive className="w-5 h-5" />,
  Table: <Table className="w-5 h-5" />,
  FolderTree: <FolderTree className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Boxes: <Boxes className="w-5 h-5" />,
  Workflow: <Workflow className="w-5 h-5" />,
  Binary: <Binary className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
};

export function CategorizedSkills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === "All"
                ? "bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            All Disciplines ({skillsData.length})
          </button>

          {SKILL_CATEGORIES.map((cat) => {
            const count = skillsData.filter((s) => s.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10">
          <p className="text-slate-400 text-sm">
            No technologies found matching &ldquo;{searchQuery}&rdquo;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle accent border glow on top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: skill.color || "#00f2fe" }}
              />

              <div>
                {/* Header: Icon, Name, Category */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform"
                      style={{ color: skill.color || "#38bdf8" }}
                    >
                      {ICON_MAP[skill.iconName] || <Code2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        {skill.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Proficiency Tag */}
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      skill.level === "Advanced"
                        ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                        : skill.level === "Proficient"
                        ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                        : "bg-slate-500/10 text-slate-300 border-slate-500/30"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Production Ready
                </span>
                {skill.featuredInSandbox && (
                  <span className="text-cyan-400/80">In Sandbox</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
