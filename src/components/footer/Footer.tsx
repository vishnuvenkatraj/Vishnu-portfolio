"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileData } from "@/data/profile";
import { NAV_LINKS } from "@/components/navigation/Navbar";
import { scrollToElement } from "@/lib/utils";
import { ArrowUp, Github, Linkedin, Mail, Phone, Heart } from "lucide-react";
import { HackerRankIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (id: string) => {
    if (isHomePage) {
      scrollToElement(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="relative border-t border-white/10 light:border-slate-200 bg-[#050811] light:bg-slate-100 text-slate-400 light:text-slate-600 py-16 overflow-hidden print:hidden transition-colors">
      {/* Background subtle radial */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Tier: Monogram, Nav Links, Socials, Back to Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5 light:border-slate-200">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 light:from-cyan-100 light:to-blue-100 border border-cyan-500/30 light:border-cyan-300 flex items-center justify-center font-mono font-bold text-cyan-400 light:text-cyan-800">
                {profileData.initials}
              </div>
              <span className="text-white light:text-slate-900 font-bold tracking-tight text-base">
                {profileData.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 light:text-slate-600 font-mono">
              {profileData.role}
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-xs text-slate-400 light:text-slate-600 hover:text-white light:hover:text-black transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Back to Top Action */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 light:bg-white hover:bg-white/10 light:hover:bg-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black border border-white/10 light:border-slate-300 light:shadow-sm transition-colors text-xs font-mono cursor-pointer shrink-0"
          >
            <span>TOP OF PAGE</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-600" />
          </button>
        </div>

        {/* Bottom Tier: Copyright, Socials, Stack Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 light:text-slate-600">
          <div>
            &copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-cyan-700 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-cyan-700 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profileData.socials.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-cyan-700 transition-colors"
              aria-label="HackerRank Profile"
            >
              <HackerRankIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.socials.email}`}
              className="text-slate-400 light:text-slate-600 hover:text-cyan-400 light:hover:text-cyan-700 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="text-slate-400 light:text-slate-600 text-center sm:text-right">
            Built with Next.js 15, TypeScript, Tailwind, GSAP, Matter.js &amp; Lenis
          </div>
        </div>
      </div>
    </footer>
  );
}
