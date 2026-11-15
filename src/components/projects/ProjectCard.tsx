"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  Maximize2,
  Layers,
  ChevronRight,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onOpenModal, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isAsymmetricSpan = index % 3 === 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.2 }}
      style={{ perspective: 1000 }}
      className={`relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] ${
        isAsymmetricSpan ? "lg:col-span-2" : "lg:col-span-1"
      }`}
    >
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />

      <div>
        {/* Preview Image Container with Zoom & Overlay */}
        <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-950">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-transparent to-transparent opacity-90" />

          {/* Category Badge & Featured Pill */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="px-3 py-1 rounded-full bg-[#060a17]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Featured
              </span>
            )}
          </div>

          {/* Quick Preview Button on Top-Right */}
          <button
            onClick={() => onOpenModal(project)}
            aria-label={`Quick view ${project.title}`}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#060a17]/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            title="Open Quick Case Study Modal"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Card Content Area */}
        <div className="p-6 sm:p-7 space-y-4">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 px-3 rounded-xl bg-white/[0.02] border border-white/5">
            {project.stats.slice(0, 4).map((stat, i) => (
              <div key={i} className="text-left">
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  {stat.label}
                </div>
                <div className="text-xs font-semibold text-cyan-300 font-mono">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Title & Tagline */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-cyan-400/80 mt-1">
              {project.subtitle}
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light line-clamp-2">
            {project.tagline}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-white/5 flex items-center justify-between gap-4">
        {/* Case Study Link */}
        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group/link transition-colors"
          >
            <span>Full Case Study</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>

          <button
            onClick={() => onOpenModal(project)}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Quick View
          </button>
        </div>

        {/* External Links */}
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
              title="Live Demo"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
