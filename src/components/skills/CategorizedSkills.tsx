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
  Github,
} from "lucide-react";
import {
  JavaIcon,
  CIcon,
  ReactIcon,
  NodeIcon,
  Html5Icon,
  Css3Icon,
  MySqlIcon,
  GitIcon,
  GenAiIcon,
  DsaIcon,
  OopIcon,
  BusinessAnalyticsIcon,
  BusinessSystemsIcon,
  TechSolutionsIcon,
} from "@/components/ui/BrandIcons";

// Direct authentic brand icon mapping by skill ID
const SKILL_BRAND_ICONS: Record<string, React.ReactNode> = {
  java: <JavaIcon className="w-5 h-5" />,
  "c-lang": <CIcon className="w-5 h-5" />,
  dsa: <DsaIcon className="w-5 h-5" />,
  oop: <OopIcon className="w-5 h-5" />,
  html: <Html5Icon className="w-5 h-5" />,
  css: <Css3Icon className="w-5 h-5" />,
  react: <ReactIcon className="w-5 h-5" />,
  nodejs: <NodeIcon className="w-5 h-5" />,
  mysql: <MySqlIcon className="w-5 h-5" />,
  git: <GitIcon className="w-5 h-5" />,
  github: <Github className="w-5 h-5" />,
  genai: <GenAiIcon className="w-5 h-5" />,
  "biz-analytics": <BusinessAnalyticsIcon className="w-5 h-5" />,
  "biz-systems": <BusinessSystemsIcon className="w-5 h-5" />,
  "tech-biz-solutions": <TechSolutionsIcon className="w-5 h-5" />,
};

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
                ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)] light:shadow-[0_2px_8px_rgba(112,43,64,0.25)]"
                : "bg-white/5 light:bg-[#FAF7F2] text-slate-300 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] hover:bg-white/10 light:hover:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/35"
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
                    ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)] light:shadow-[0_2px_8px_rgba(112,43,64,0.25)]"
                    : "bg-white/5 light:bg-[#FAF7F2] text-slate-300 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] hover:bg-white/10 light:hover:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/35"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 light:text-[#89958B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white/5 light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/40 text-white light:text-[#252B29] placeholder-slate-400 light:placeholder-[#5E6A66] focus:outline-none focus:border-cyan-400 light:focus:border-[#702B40] focus:ring-1 focus:ring-cyan-400/50 light:focus:ring-[#702B40]/30 light:shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 light:text-[#702B40] hover:text-white light:hover:text-[#582031] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35">
          <p className="text-slate-400 light:text-[#4A5551] text-sm">
            No technologies found matching &ldquo;{searchQuery}&rdquo;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] hover:bg-white/[0.05] light:hover:bg-[#FFFFFF] border border-white/10 light:border-[#89958B]/35 hover:border-cyan-500/40 light:hover:border-[#702B40]/40 light:shadow-sm hover:light:shadow-md transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
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
                      className="p-2.5 rounded-xl bg-white/5 light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 group-hover:scale-105 transition-transform"
                      style={{ color: skill.color || "#38bdf8" }}
                    >
                      {SKILL_BRAND_ICONS[skill.id] || ICON_MAP[skill.iconName] || <Code2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white light:text-[#252B29] text-sm group-hover:text-cyan-300 light:group-hover:text-[#702B40] transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400 light:text-[#5E6A66]">
                        {skill.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Proficiency Tag */}
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border whitespace-nowrap ${
                      skill.level === "Comfortable"
                        ? "bg-emerald-500/10 light:bg-[#89958B]/15 text-emerald-300 light:text-[#252B29] border-emerald-500/30 light:border-[#89958B]/40"
                        : skill.level === "Familiar"
                        ? "bg-cyan-500/10 light:bg-[#702B40]/10 text-cyan-300 light:text-[#702B40] border-cyan-500/30 light:border-[#702B40]/30"
                        : skill.level === "Currently Learning"
                        ? "bg-amber-500/10 light:bg-[#89958B]/15 text-amber-300 light:text-[#702B40] border-amber-500/30 light:border-[#89958B]/35"
                        : "bg-purple-500/10 light:bg-[#702B40]/10 text-purple-300 light:text-[#702B40] border-purple-500/30 light:border-[#702B40]/30"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 light:text-[#4A5551] leading-relaxed font-normal">
                  {skill.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="mt-4 pt-3 border-t border-white/5 light:border-[#89958B]/25 flex items-center justify-between text-[11px] font-mono text-slate-500 light:text-[#4A5551]">
                <span className="flex items-center gap-1.5 text-slate-400 light:text-[#4A5551]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
                  <span>Production Ready</span>
                </span>
                <span className="text-slate-400 light:text-[#5E6A66]">
                  {skill.categoryLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
