"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import { SafeProjectImage } from "./SafeProjectImage";
import { ImageLightbox, LightboxImage } from "@/components/ui/ImageLightbox";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  Sparkles,
  Maximize2,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxIndex === null) {
        onClose();
      }
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose, lightboxIndex]);

  if (!project) return null;

  // Build complete list of images for lightbox: cover + gallery items
  const allImages: LightboxImage[] = [
    {
      url: project.coverImage,
      title: `${project.title} — Overview Cover`,
      caption: project.subtitle,
      badge: "Cover Preview",
    },
    ...(project.gallery || []).map((item, idx) => ({
      url: item.imageUrl,
      title: `${project.title} — ${item.title}`,
      caption: item.caption,
      badge: `Screenshot ${idx + 1}`,
    })),
  ];

  return (
    <>
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 light:border-slate-200 bg-[#070b16] light:bg-white text-white light:text-slate-900 shadow-2xl z-10 p-6 sm:p-8 space-y-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 light:bg-slate-100 hover:bg-white/10 light:hover:bg-slate-200 text-slate-400 light:text-slate-600 hover:text-white light:hover:text-black border border-white/10 light:border-slate-200 transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-3 pr-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 light:bg-cyan-50 border border-cyan-500/30 light:border-cyan-200 text-xs font-mono text-cyan-300 light:text-cyan-700 font-semibold">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-400 light:text-slate-500">
                  {project.timeline}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white light:text-slate-900 tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 light:text-slate-700 font-light">
                {project.subtitle}
              </p>
            </div>

            {/* Cover Image Preview (Clickable to zoom) */}
            <div
              onClick={() => setLightboxIndex(0)}
              className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 light:border-slate-200 bg-[#02050e] light:bg-slate-100 flex items-center justify-center p-2 cursor-pointer group/cover"
              title="Click to zoom in full-screen"
            >
              <SafeProjectImage
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-contain object-center transition-transform duration-300 group-hover/cover:scale-105"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3.5 py-1.5 rounded-full bg-cyan-500 text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Zoom Full-Screen</span>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-white/10 light:border-slate-200 pb-6">
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
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 light:bg-slate-100 hover:bg-white/10 light:hover:bg-slate-200 text-white light:text-slate-800 border border-white/10 light:border-slate-200 font-medium text-xs sm:text-sm transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {!project.demoUrl && !project.githubUrl && (
                  <span className="text-xs font-mono text-slate-400 light:text-slate-600 bg-white/5 light:bg-slate-100 px-3 py-1.5 rounded-lg border border-white/5 light:border-slate-200">
                    Demonstration available upon inquiry
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-600 hover:underline"
              >
                <span>Open Dedicated Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Overview, Problem & Solution */}
            <div className="space-y-6 text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed font-light">
              <div>
                <h3 className="text-base font-semibold text-white light:text-slate-900 mb-2 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700">
                  1. Project Overview
                </h3>
                <p>{project.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/5 light:border-slate-200">
                <div>
                  <h4 className="text-xs uppercase font-mono text-amber-400 light:text-amber-600 mb-2 flex items-center gap-1.5 font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    Problem Statement
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700">
                    {project.problemStatement}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono text-emerald-400 light:text-emerald-600 mb-2 flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Proposed Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700">
                    {project.proposedSolution}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/5 light:border-slate-200 space-y-1"
                  >
                    <div className="font-semibold text-sm text-white light:text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-600" />
                      <span>{feat.title}</span>
                    </div>
                    <div className="text-xs text-slate-400 light:text-slate-600">{feat.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Layers */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Technical Architecture</span>
              </h3>
              <div className="space-y-2">
                {project.architecture.map((layer, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/5 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white light:text-slate-900">
                        {layer.layer}
                      </div>
                      <div className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                        {layer.description}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 shrink-0">
                      {layer.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-white/5 light:bg-slate-200 border border-white/10 light:border-slate-300 text-[10px] font-mono text-cyan-300 light:text-cyan-800"
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
              <h3 className="text-base font-semibold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700">
                Engineering Challenges &amp; Resolution
              </h3>
              <div className="space-y-3">
                {project.challenges.map((c, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/5 light:border-slate-200 space-y-2"
                  >
                    <div className="text-sm font-semibold text-white light:text-slate-900">{c.title}</div>
                    <div className="text-xs text-rose-300/90 light:text-rose-700">
                      <span className="font-mono font-bold uppercase text-[10px] text-rose-400 light:text-rose-600 mr-2">
                        Challenge:
                      </span>
                      {c.problem}
                    </div>
                    <div className="text-xs text-emerald-300/90 light:text-emerald-700">
                      <span className="font-mono font-bold uppercase text-[10px] text-emerald-400 light:text-emerald-600 mr-2">
                        Resolution:
                      </span>
                      {c.resolution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Image Gallery (All Multiple Images with Lightbox Zoom) */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10 light:border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700">
                    Interface Gallery &amp; Screenshots ({project.gallery.length} Images)
                  </h3>
                  <span className="text-xs font-mono text-slate-400 light:text-slate-500">
                    Click any screenshot to zoom
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.gallery.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => setLightboxIndex(i + 1)} // offset by 1 because index 0 is cover
                      className="rounded-xl overflow-hidden border border-white/10 light:border-slate-200 bg-[#050811] light:bg-slate-50 p-3 space-y-2 flex flex-col justify-between cursor-pointer group/card hover:border-cyan-500/40 transition-all shadow-sm hover:shadow-md"
                      title="Click to view full-size in Lightbox"
                    >
                      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-[#02050e] light:bg-slate-100 border border-white/5 light:border-slate-200 flex items-center justify-center p-1.5">
                        <SafeProjectImage
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-contain object-center transition-transform duration-300 group-hover/card:scale-105"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="p-2 rounded-full bg-cyan-500 text-black shadow-lg">
                            <Maximize2 className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-white light:text-slate-900 line-clamp-1 group-hover/card:text-cyan-400 light:group-hover/card:text-cyan-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 light:text-slate-600 mt-1 line-clamp-2 font-light leading-relaxed">
                          {item.caption}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Interactive Lightbox Viewer */}
      <ImageLightbox
        isOpen={lightboxIndex !== null}
        images={allImages}
        currentIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </>
  );
}
