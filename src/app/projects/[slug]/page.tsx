import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { InteractiveProjectGallery } from "@/components/projects/InteractiveProjectGallery";
import { InteractiveArchitectureDiagram } from "@/components/projects/InteractiveArchitectureDiagram";
import { ProjectSimulatorSandbox } from "@/components/projects/ProjectSimulatorSandbox";
import { CopyButton } from "@/components/ui/CopyButton";
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
  Award,
  BookOpen,
  GitCommit,
  Check,
  ShieldCheck,
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
    <main className="min-h-screen bg-[#060913] light:bg-[#F5F0E6] text-white light:text-[#252B29] pt-28 pb-20 selection:bg-cyan-500/30 light:selection:bg-[#702B40]/20 transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 light:text-[#702B40] hover:text-cyan-300 light:hover:text-[#551E2E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PORTFOLIO</span>
          </Link>

          <span className="text-xs font-mono text-slate-400 light:text-[#5C6764]">
            CASE STUDY #{projectIndex + 1} OF {projectsData.length}
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 light:bg-[#702B40]/10 border border-cyan-500/30 light:border-[#702B40]/30 text-xs font-mono text-cyan-300 light:text-[#702B40] font-semibold">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 light:text-[#5C6764]">
              <Calendar className="w-3.5 h-3.5" />
              {project.timeline}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 light:text-[#5C6764]">
              <UserCheck className="w-3.5 h-3.5" />
              {project.role}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white light:text-[#252B29] leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 light:text-[#4A5551] font-light max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 light:from-[#702B40] light:to-[#551E2E] text-black light:text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] light:shadow-md"
              >
                <span>{project.patentDetails ? "Verify on IPO Official Portal" : "Launch Live Application"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 light:bg-[#F5F0E6] hover:bg-white/10 light:hover:bg-[#FAF7F2] text-white light:text-[#252B29] border border-white/10 light:border-[#89958B]/35 font-medium text-xs sm:text-sm transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Source on GitHub</span>
              </a>
            )}

            {!project.demoUrl && !project.githubUrl && (
              <span className="text-xs font-mono text-slate-400 light:text-[#5C6764] bg-white/5 light:bg-[#F5F0E6] px-3.5 py-2 rounded-xl border border-white/5 light:border-[#89958B]/25">
                Demonstration and details available upon inquiry
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stats.map((s, i) => (
              <div
                key={i}
                className="px-3 py-1 rounded-lg bg-white/[0.02] light:bg-[#F5F0E6] border border-white/5 light:border-[#89958B]/25 font-mono text-xs"
              >
                <span className="text-slate-400 light:text-[#5C6764] mr-2">{s.label}:</span>
                <span className="text-cyan-300 light:text-[#702B40] font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Published Patent Status Callout (When Applicable) */}
        {project.patentDetails && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-cyan-500/10 light:from-[#702B40]/10 light:to-[#89958B]/15 border border-amber-500/30 light:border-[#702B40]/30 backdrop-blur-md space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-amber-300 light:text-[#702B40] font-mono text-xs uppercase tracking-wider font-bold">
                <Award className="w-4 h-4" />
                <span>Official Published Patent Record</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 light:bg-[#702B40]/20 text-amber-300 light:text-[#702B40] border border-amber-500/40 light:border-[#702B40]/30 font-mono text-xs font-bold">
                  Application Number: {project.patentDetails.applicationNumber}
                </span>
                <CopyButton
                  text={project.patentDetails.applicationNumber}
                  label="Copy App No"
                  className="bg-amber-500/10 light:bg-[#702B40]/10 text-amber-300 light:text-[#702B40] border-amber-500/30 light:border-[#702B40]/30 hover:bg-amber-500/20"
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 light:text-[#252B29] leading-relaxed">
              This intellectual property is officially published under the <strong>{project.patentDetails.authority}</strong> publication search system. Search records and status updates can be validated directly on the official IPO search database using Application Number <strong>{project.patentDetails.applicationNumber}</strong>.
            </p>
            <div>
              <a
                href={project.patentDetails.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 light:text-[#702B40] hover:underline font-bold"
              >
                <span>Access Indian Patent Office Search Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Hero Cover & Gallery Section (Interactive Lightbox Viewer) */}
        <InteractiveProjectGallery
          coverImage={project.coverImage}
          projectTitle={project.title}
          projectSubtitle={project.subtitle}
          gallery={project.gallery || []}
        />

        {/* Deep Dive 1: Project Overview */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
            <span>01</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
            <span className="text-white light:text-[#252B29]">Executive Overview</span>
          </h2>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm text-slate-300 light:text-[#4A5551] leading-relaxed text-base sm:text-lg font-light space-y-4">
            <p>{project.overview}</p>
          </div>
        </section>

        {/* Deep Dive 2 & 3: Problem Statement and Proposed Solution */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
            <span>02</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
            <span className="text-white light:text-[#252B29]">Problem &amp; Architectural Solution</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-rose-400 light:text-rose-700 font-mono text-xs font-semibold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>The Problem Statement</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 light:text-[#4A5551] leading-relaxed font-light">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 light:text-emerald-700 font-mono text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Proposed Solution</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 light:text-[#4A5551] leading-relaxed font-light">
                {project.proposedSolution}
              </p>
            </div>
          </div>
        </section>

        {/* Deep Dive 4: Key Features */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
            <span>03</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
            <span className="text-white light:text-[#252B29]">Key Engineering Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm space-y-2 hover:border-cyan-500/30 light:hover:border-[#702B40]/40 transition-colors"
              >
                <div className="font-semibold text-white light:text-[#252B29] flex items-center gap-2 text-base">
                  <Sparkles className="w-4 h-4 text-cyan-400 light:text-[#702B40] shrink-0" />
                  <span>{feat.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 light:text-[#4A5551] font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive 5: Technical Architecture */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
            <span>04</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
            <span className="text-white light:text-[#252B29]">System Architecture &amp; Stack Layers</span>
          </h2>

          <div className="space-y-3">
            {project.architecture.map((layer, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-base font-semibold text-white light:text-[#252B29] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400 light:text-[#702B40]" />
                    <span>{layer.layer}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 light:text-[#4A5551] font-light max-w-2xl">
                    {layer.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {layer.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/5 light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 font-mono text-xs text-cyan-300 light:text-[#252B29]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Architecture Showcase for MediConnect & CivicConnect */}
          {(project.id === "project-mediconnect" || project.id === "project-civicconnect") && (
            <InteractiveArchitectureDiagram projectId={project.id} />
          )}

          {/* Interactive Algorithmic Simulation Sandbox */}
          <div className="pt-2">
            <ProjectSimulatorSandbox projectId={project.id} />
          </div>
        </section>

        {/* Deep Dive 5: Personal Technical Contributions (When Available) */}
        {project.myContributions && project.myContributions.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
              <span>05</span>
              <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
              <span className="text-white light:text-[#252B29]">Personal Technical Contributions</span>
            </h2>
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm space-y-3">
              <ul className="space-y-3">
                {project.myContributions.map((contrib, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm sm:text-base text-slate-300 light:text-[#252B29] leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 light:text-[#702B40] shrink-0 mt-0.5" />
                    <span>{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Deep Dive 6: Engineering Learnings (When Available) */}
        {project.learnings && project.learnings.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
              <span>06</span>
              <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
              <span className="text-white light:text-[#252B29]">Key Learnings &amp; Engineering Takeaways</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.learnings.map((learning, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm space-y-2 hover:border-cyan-500/30 light:hover:border-[#702B40]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-cyan-400 light:text-[#702B40] font-mono text-xs font-semibold uppercase">
                    <BookOpen className="w-4 h-4" />
                    <span>Insight 0{i + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 light:text-[#4A5551] leading-relaxed font-light">
                    {learning}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deep Dive 7: Project Changelog & Development Milestones (When Available) */}
        {project.changelog && project.changelog.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
              <span>07</span>
              <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
              <span className="text-white light:text-[#252B29]">Development Timeline &amp; Changelog</span>
            </h2>
            <div className="relative pl-6 border-l-2 border-white/10 light:border-[#89958B]/30 space-y-6">
              {project.changelog.map((entry, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-500 light:bg-[#702B40] border-2 border-[#060913] light:border-[#F5F0E6] group-hover:scale-125 transition-transform" />
                  <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white light:text-[#252B29]">
                        {entry.title}
                      </h4>
                      <span className="text-xs font-mono text-cyan-400 light:text-[#702B40] bg-cyan-950/60 light:bg-[#702B40]/10 px-2 py-0.5 rounded-md border border-cyan-800/40 light:border-[#702B40]/25 font-semibold">
                        {entry.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 light:text-[#4A5551] font-light leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deep Dive 8: Technologies Used */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
            <span>08</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
            <span className="text-white light:text-[#252B29]">Complete Technology Stack</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-xl bg-white/[0.03] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm font-mono text-sm text-white light:text-[#252B29] hover:border-cyan-400/50 light:hover:border-[#702B40]/50 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive 9: Engineering Challenges & Solutions */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase font-mono tracking-wider text-cyan-400 light:text-[#702B40] flex items-center gap-2">
            <span>09</span>
            <span className="w-6 h-[1px] bg-cyan-400/50 light:bg-[#702B40]/40" />
            <span className="text-white light:text-[#252B29]">Development Challenges &amp; Resolution</span>
          </h2>
          <div className="space-y-4">
            {project.challenges.map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 light:shadow-sm space-y-3"
              >
                <h3 className="text-base font-semibold text-white light:text-[#252B29]">{c.title}</h3>
                <div className="p-3.5 rounded-xl bg-rose-950/20 light:bg-rose-50 border border-rose-900/30 light:border-rose-200 text-xs sm:text-sm text-rose-200 light:text-rose-900">
                  <span className="font-mono font-bold uppercase text-[10px] text-rose-400 light:text-rose-700 block mb-1">
                    The Challenge
                  </span>
                  {c.problem}
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/20 light:bg-emerald-50 border border-emerald-900/30 light:border-emerald-200 text-xs sm:text-sm text-emerald-200 light:text-emerald-900">
                  <span className="font-mono font-bold uppercase text-[10px] text-emerald-400 light:text-emerald-700 block mb-1">
                    The Solution
                  </span>
                  {c.resolution}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next / Previous Project Navigation */}
        <div className="pt-10 border-t border-white/10 light:border-[#89958B]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 text-slate-300 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] light:shadow-sm transition-colors text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>PREV: {prevProject.title}</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 text-slate-300 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] light:shadow-sm transition-colors text-xs font-mono"
          >
            <span>NEXT: {nextProject.title}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
