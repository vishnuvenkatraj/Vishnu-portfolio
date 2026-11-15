"use client";

import { useState, useMemo } from "react";
import { projectsData, PROJECT_CATEGORIES, Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { FolderGit2, Sparkles } from "lucide-react";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Engineered Systems</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Architecture &amp; Projects
            </h2>
            <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
              High-throughput microservices, interactive physics simulations, and developer tooling.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {PROJECT_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All"
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpenModal={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
