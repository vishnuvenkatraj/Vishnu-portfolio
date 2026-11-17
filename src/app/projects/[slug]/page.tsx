import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { InteractiveProjectGallery } from "@/components/projects/InteractiveProjectGallery";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Calendar,
  UserCheck,
  ChevronRight,
} from "lucide-react";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const project = projectsData.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title} • Engineering Case Study`,
      description: project.tagline,
    };
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject =
    projectIndex > 0 ? projectsData[projectIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : projectsData[0];

  return (
    <main className="min-h-screen bg-[#060913] light:bg-slate-50 text-white light:text-slate-900 pt-28 pb-20 selection:bg-cyan-500/30 transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 light:text-cyan-700 hover:text-cyan-300 light:hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PORTFOLIO</span>
          </Link>

          <span className="text-xs font-mono text-slate-400 light:text-slate-500">
            CASE STUDY #{projectIndex + 1} OF {projectsData.length}
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 light:bg-cyan-50 border border-cyan-500/30 light:border-cyan-200 text-xs font-mono text-cyan-300 light:text-cyan-700 font-semibold">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 light:text-slate-600">
              <Calendar className="w-3.5 h-3.5" />
              {project.timeline}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 light:text-slate-600">
              <UserCheck className="w-3.5 h-3.5" />
              {project.role}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white light:text-slate-900 leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 light:text-slate-700 font-light max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 light:shadow-sm backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs sm:text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 light:bg-slate-100 hover:bg-white/10 light:hover:bg-slate-200 text-white light:text-slate-900 border border-white/10 light:border-slate-200 font-medium text-xs sm:text-sm transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Source on GitHub</span>
              </a>
            )}

            {!project.demoUrl && !project.githubUrl && (
              <span className="text-xs font-mono text-slate-400 light:text-slate-600 bg-white/5 light:bg-slate-100 px-3.5 py-2 rounded-xl border border-white/5 light:border-slate-200">
                Demonstration and details available upon inquiry
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stats.map((s, i) => (
              <div
                key={i}
                className="px-3 py-1 rounded-lg bg-white/[0.02] light:bg-slate-100 border border-white/5 light:border-slate-200 font-mono text-xs"
              >
                <span className="text-slate-400 light:text-slate-600 mr-2">{s.label}:</span>
                <span className="text-cyan-300 light:text-cyan-800 font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Cover & Gallery Section (Interactive Lightbox Viewer) */}
        <InteractiveProjectGallery
          coverImage={project.coverImage}
          projectTitle={project.title}
          projectSubtitle={project.subtitle}
          gallery={project.gallery || []}
        />

        {/* Deep Dive 1: Project Overview */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700 flex items-center gap-2">
            <span>01</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-cyan-600/50" />
            <span>Executive Overview</span>
          </h2>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 light:shadow-sm text-slate-300 light:text-slate-700 leading-relaxed text-base sm:text-lg font-light space-y-4">
            <p>{project.overview}</p>
          </div>
        </section>

        {/* Deep Dive 2 & 3: Problem Statement and Proposed Solution */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700 flex items-center gap-2">
            <span>02</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-cyan-600/50" />
            <span>Problem &amp; Architectural Solution</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 light:shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-rose-400 light:text-rose-600 font-mono text-xs font-semibold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>The Problem Statement</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed font-light">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 light:shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 light:text-emerald-600 font-mono text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Proposed Solution</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 light:text-slate-700 leading-relaxed font-light">
                {project.proposedSolution}
              </p>
            </div>
          </div>
        </section>

        {/* Deep Dive 4: Key Features */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700 flex items-center gap-2">
            <span>03</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-cyan-600/50" />
            <span>Key Engineering Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 light:shadow-sm space-y-2 hover:border-cyan-500/30 transition-colors"
              >
                <div className="font-semibold text-white light:text-slate-900 flex items-center gap-2 text-base">
                  <Sparkles className="w-4 h-4 text-cyan-400 light:text-cyan-600 shrink-0" />
                  <span>{feat.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive 5: Technical Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700 flex items-center gap-2">
            <span>04</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-cyan-600/50" />
            <span>Layered System Architecture</span>
          </h2>
          <div className="space-y-3">
            {project.architecture.map((layer, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 light:shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-base font-semibold text-white light:text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400 light:text-cyan-600" />
                    <span>{layer.layer}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 font-light max-w-2xl">
                    {layer.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {layer.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200 font-mono text-xs text-cyan-300 light:text-cyan-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive 6: Technologies Used */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700 flex items-center gap-2">
            <span>05</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-cyan-600/50" />
            <span>Complete Technology Stack</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-xl bg-white/[0.03] light:bg-white border border-white/10 light:border-slate-200 light:shadow-sm font-mono text-sm text-white light:text-slate-800 hover:border-cyan-400/50 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive 7: Engineering Challenges & Solutions */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 uppercase font-mono tracking-wider text-cyan-400 light:text-cyan-700 flex items-center gap-2">
            <span>06</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-cyan-600/50" />
            <span>Development Challenges &amp; Resolution</span>
          </h2>
          <div className="space-y-4">
            {project.challenges.map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 light:shadow-sm space-y-3"
              >
                <h3 className="text-base font-semibold text-white light:text-slate-900">{c.title}</h3>
                <div className="p-3.5 rounded-xl bg-rose-950/20 light:bg-rose-50 border border-rose-900/30 light:border-rose-200 text-xs sm:text-sm text-rose-200 light:text-rose-900">
                  <span className="font-mono font-bold uppercase text-[10px] text-rose-400 light:text-rose-600 block mb-1">
                    The Challenge
                  </span>
                  {c.problem}
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/20 light:bg-emerald-50 border border-emerald-900/30 light:border-emerald-200 text-xs sm:text-sm text-emerald-200 light:text-emerald-900">
                  <span className="font-mono font-bold uppercase text-[10px] text-emerald-400 light:text-emerald-600 block mb-1">
                    The Solution
                  </span>
                  {c.resolution}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next / Previous Project Navigation */}
        <div className="pt-10 border-t border-white/10 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 light:bg-white border border-white/10 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black light:shadow-sm transition-colors text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PREV: {prevProject.title}</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 light:bg-white border border-white/10 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black light:shadow-sm transition-colors text-xs font-mono"
          >
            <span>NEXT: {nextProject.title}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
