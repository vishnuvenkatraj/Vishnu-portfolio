"use client";

import Link from "next/link";
import { profileData } from "@/data/profile";
import { NAV_LINKS } from "@/components/navigation/Navbar";
import { scrollToElement } from "@/lib/utils";
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050811] text-slate-400 py-16 overflow-hidden">
      {/* Background subtle radial */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Tier: Monogram, Nav Links, Socials, Back to Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400">
                {profileData.initials}
              </div>
              <span className="text-white font-bold tracking-tight text-base">
                {profileData.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Full-Stack Software Engineer &amp; Creative Technologist
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToElement(link.id)}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Back to Top Action */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs font-mono cursor-pointer shrink-0"
          >
            <span>TOP OF PAGE</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Bottom Tier: Copyright, Socials, Stack Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {profileData.name}. All rights reserved. Clean
            placeholder configuration.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.socials.email}`}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="text-slate-400 text-center sm:text-right">
            Built with Next.js 15, TypeScript, Tailwind, GSAP, Matter.js &amp; Lenis
          </div>
        </div>
      </div>
    </footer>
  );
}
