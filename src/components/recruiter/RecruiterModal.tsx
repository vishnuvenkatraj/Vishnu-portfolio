"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";
import { showToast } from "@/components/ui/ToastNotification";
import {
  X,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Github,
  Award,
  Sparkles,
  GraduationCap,
  Briefcase,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setCopiedEmail(true);
    showToast(`Copied ${profileData.socials.email} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profileData.socials.phone);
    setCopiedPhone(true);
    showToast(`Copied ${profileData.socials.phone} to clipboard!`);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 dark:bg-black/80 light:bg-black/50 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#090e1a] dark:bg-[#090e1a] light:bg-[#FAF7F2] border border-cyan-500/30 dark:border-cyan-500/30 light:border-[#89958B]/40 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 dark:border-white/10 light:border-[#89958B]/25 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 light:bg-[#702B40]/10 border border-cyan-500/20 light:border-[#702B40]/30 text-cyan-400 light:text-[#702B40] text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recruiter Fast-Track (30s Brief)</span>
                </div>
                <h3 className="text-2xl font-bold text-white dark:text-white light:text-[#252B29]">
                  {profileData.name}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400 light:text-[#702B40] font-mono">
                  {profileData.role} • {profileData.availability.status}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 light:bg-[#F5F0E6] hover:bg-white/10 light:hover:bg-[#89958B]/20 text-slate-400 light:text-[#252B29] transition-colors cursor-pointer"
                aria-label="Close recruiter summary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
                  <span>Academic CGPA</span>
                </div>
                <div className="text-lg font-bold text-white dark:text-white light:text-[#252B29]">
                  8.10 / 10
                </div>
                <div className="text-[10px] text-slate-400 light:text-[#4A5551]">
                  M. Kumarasamy College of Engg (Sem 4)
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400 light:text-[#702B40]" />
                  <span>Patent Status</span>
                </div>
                <div className="text-lg font-bold text-white dark:text-white light:text-[#252B29]">
                  Published
                </div>
                <div className="text-[10px] text-slate-400 light:text-[#4A5551]">
                  App #202641130488
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400 light:text-[#702B40]" />
                  <span>Availability</span>
                </div>
                <div className="text-lg font-bold text-emerald-400 light:text-emerald-700">
                  Immediate
                </div>
                <div className="text-[10px] text-slate-400 light:text-[#4A5551]">
                  Internship / Full-Time
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-[#5C6764] font-semibold">
                Core Technical Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Java",
                  "C",
                  "React",
                  "Next.js 15",
                  "Node.js",
                  "TypeScript",
                  "MySQL",
                  "MongoDB Atlas",
                  "Generative AI",
                  "Tailwind CSS",
                  "Embedded Systems",
                  "Git & GitHub",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 font-mono text-xs text-cyan-300 light:text-[#252B29]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Project Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-[#5C6764] font-semibold">
                High-Impact Featured Work
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/25">
                  <div className="font-semibold text-white light:text-[#252B29] text-xs">
                    MediConnect • Healthcare WayFinder
                  </div>
                  <p className="text-[11px] text-slate-400 light:text-[#4A5551] mt-0.5">
                    Multi-role hospital portal with indoor navigation and AI symptom triage.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/25">
                  <div className="font-semibold text-white light:text-[#252B29] text-xs">
                    RESQTRAK • Patent #202641130488
                  </div>
                  <p className="text-[11px] text-slate-400 light:text-[#4A5551] mt-0.5">
                    Smart buoyancy & retrieval system with real-time sensor trigger mechanism.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-[#89958B]/25 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={profileData.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold text-xs transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>

                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 light:bg-[#F5F0E6] hover:bg-white/10 light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 text-xs font-mono text-slate-300 light:text-[#252B29] transition-colors cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 light:bg-[#F5F0E6] hover:bg-white/10 light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 text-xs font-mono text-slate-300 light:text-[#252B29] transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
                  <span>GitHub</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/5 light:bg-[#F5F0E6] hover:bg-white/10 light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 text-slate-300 light:text-[#252B29] transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                </button>

                <a
                  href={`tel:${profileData.socials.phone.replace(/\s+/g, "")}`}
                  className="p-2 rounded-xl bg-white/5 light:bg-[#F5F0E6] hover:bg-white/10 light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 text-slate-300 light:text-[#252B29] transition-colors cursor-pointer"
                  title="Call Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
