"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileData } from "@/data/profile";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { scrollToElement } from "@/lib/utils";
import { Menu, X, Command, Sparkles } from "lucide-react";

export const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const scrollPosition = window.scrollY + 120;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (isHomePage) {
      scrollToElement(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#070b14]/85 dark:bg-[#070b14]/85 light:bg-white/85 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-slate-200 py-3 shadow-lg shadow-black/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram / Brand Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              scrollToElement("hero");
            }
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            {profileData.initials}
          </div>
          <div className="hidden sm:block">
            <span className="font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors tracking-tight">
              {profileData.name}
            </span>
            <span className="block text-[10px] font-mono text-cyan-400/80 -mt-0.5">
              DEV.PORTFOLIO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-200/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 dark:border-white/10 light:border-slate-300">
          {NAV_LINKS.map((link) => {
            const isActive = isHomePage && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                    : "text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Command Palette Button, Theme Toggle, Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={openPalette}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline font-mono text-[11px] text-slate-400">
              Cmd+K
            </span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#070b14]/95 dark:bg-[#070b14]/95 light:bg-white/95 backdrop-blur-2xl border-b border-white/10 dark:border-white/10 light:border-slate-200 py-6 px-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = isHomePage && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
