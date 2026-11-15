"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { profileData } from "@/data/profile";
import { BackgroundParticles } from "./BackgroundParticles";
import { LiquidGlassCard } from "./LiquidGlassCard";
import { TechMarquee } from "./TechMarquee";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { scrollToElement } from "@/lib/utils";
import {
  ArrowRight,
  Download,
  FileText,
  Github,
  Linkedin,
  Code2,
  Mail,
  Sparkles,
} from "lucide-react";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background Interactive Particles */}
      <BackgroundParticles />

      {/* Subtle Radial Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Availability Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>{profileData.availability.status}</span>
              </div>
            </motion.div>

            {/* Editable Name & Role Placeholder */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="text-sm uppercase tracking-widest text-cyan-400 font-mono font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{profileData.role}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Hi, I&apos;m{" "}
                <span className="text-gradient-cyan drop-shadow-[0_0_35px_rgba(56,189,248,0.25)]">
                  {profileData.name}
                </span>
              </h1>
            </motion.div>

            {/* Headline & Short Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed font-light"
            >
              {profileData.headline}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl leading-relaxed"
            >
              {profileData.shortBio}
            </motion.p>

            {/* Action Buttons: Magnetic Explore & Resume */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <MagneticButton
                onClick={() => scrollToElement("projects")}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 group">
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </MagneticButton>

              <MagneticButton
                href={profileData.resume.url}
                download={profileData.resume.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-cyan-500/40 text-sm font-medium transition-all duration-300 backdrop-blur-md group">
                  <Download className="w-4 h-4 text-cyan-400 transition-transform group-hover:-translate-y-0.5" />
                  <span>Download Resume</span>
                </div>
              </MagneticButton>

              <Link
                href="/resume"
                className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500/30 text-xs font-mono transition-all duration-300"
                title="View formatted web resume"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Online</span>
              </Link>
            </motion.div>

            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
              <span className="text-xs font-mono text-slate-400">CONNECT:</span>
              <div className="flex items-center gap-2">
                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={profileData.socials.hackerrank}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-white/10 transition-all"
                  aria-label="HackerRank Profile"
                  title="HackerRank Profile"
                >
                  <Code2 className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profileData.socials.email}`}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                  aria-label="Send Email"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Liquid-Glass Visual Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <LiquidGlassCard />
          </motion.div>
        </div>
      </div>

      {/* Bottom Technology Marquee */}
      <div className="relative mt-16 z-10">
        <TechMarquee />
      </div>
    </section>
  );
}
