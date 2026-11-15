"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#070b16] text-white shadow-2xl z-10 p-6 sm:p-8 space-y-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-3 pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {project.timeline}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light">
              {project.subtitle}
            </p>
          </div>

          {/* Cover Image Preview */}
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 bg-black">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-white/10 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs sm:text-sm transition-all"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium text-xs sm:text-sm transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              <span>Open Dedicated Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Overview, Problem & Solution */}
          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            <div>
              <h3 className="text-base font-semibold text-white mb-2 uppercase font-mono tracking-wider text-cyan-400">
                1. Project Overview
              </h3>
              <p>{project.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <h4 className="text-xs uppercase font-mono text-amber-400 mb-2 flex items-center gap-1.5 font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  Problem Statement
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  {project.problemStatement}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono text-emerald-400 mb-2 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Proposed Solution
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  {project.proposedSolution}
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white uppercase font-mono tracking-wider text-cyan-400">
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1"
                >
                  <div className="font-semibold text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{feat.title}</span>
                  </div>
                  <div className="text-xs text-slate-400">{feat.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Layers */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Technical Architecture</span>
            </h3>
            <div className="space-y-2">
              {project.architecture.map((layer, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {layer.layer}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {layer.description}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 shrink-0">
                    {layer.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Challenges */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white uppercase font-mono tracking-wider text-cyan-400">
              Engineering Challenges &amp; Resolution
            </h3>
            <div className="space-y-3">
              {project.challenges.map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2"
                >
                  <div className="text-sm font-semibold text-white">{c.title}</div>
                  <div className="text-xs text-rose-300/90">
                    <span className="font-mono font-bold uppercase text-[10px] text-rose-400 mr-2">
                      Challenge:
                    </span>
                    {c.problem}
                  </div>
                  <div className="text-xs text-emerald-300/90">
                    <span className="font-mono font-bold uppercase text-[10px] text-emerald-400 mr-2">
                      Resolution:
                    </span>
                    {c.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
