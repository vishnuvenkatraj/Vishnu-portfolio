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

  if (pathname === "/resume") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 print:hidden transition-all duration-300 ${
        scrolled
          ? "bg-[#070b14]/85 dark:bg-[#070b14]/85 light:bg-[#FAF7F2]/90 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-[#89958B]/30 py-3 shadow-lg shadow-black/10 light:shadow-[#252B29]/5"
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 light:from-[#702B40]/10 light:to-[#89958B]/20 border border-cyan-500/30 light:border-[#702B40]/30 flex items-center justify-center font-mono font-bold text-cyan-400 light:text-[#702B40] group-hover:border-cyan-400 light:group-hover:border-[#702B40] group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] light:shadow-none">
            {profileData.initials}
          </div>
          <div className="hidden sm:block">
            <span className="font-semibold text-white dark:text-white light:text-[#252B29] group-hover:text-cyan-400 light:group-hover:text-[#702B40] transition-colors tracking-tight">
              {profileData.name}
            </span>
            <span className="block text-[10px] font-mono text-cyan-400/80 light:text-[#702B40] font-semibold -mt-0.5">
              DEV.PORTFOLIO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] dark:bg-white/[0.03] light:bg-[#FAF7F2] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 dark:border-white/10 light:border-[#89958B]/30 light:shadow-sm">
          {NAV_LINKS.map((link) => {
            const isActive = isHomePage && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/20 light:bg-[#702B40] text-cyan-300 light:text-[#FAF7F2] font-semibold shadow-[0_0_12px_rgba(6,182,212,0.3)] light:shadow-[0_2px_8px_rgba(112,43,64,0.25)]"
                    : "text-slate-400 light:text-[#4A5551] hover:text-white dark:hover:text-white light:hover:text-[#702B40] light:hover:bg-[#89958B]/15"
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
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs text-slate-300 light:text-[#252B29] bg-white/5 light:bg-[#FAF7F2] hover:bg-white/10 light:hover:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/35 rounded-lg transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 light:focus:ring-[#702B40]/40 light:shadow-sm"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40] group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline font-mono text-[11px] text-slate-400 light:text-[#5E6A66]">
              Cmd+K
            </span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-slate-300 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] bg-white/5 light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 light:focus:ring-[#702B40]/40 cursor-pointer light:shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400 light:text-[#702B40]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#070b14]/95 dark:bg-[#070b14]/95 light:bg-[#FAF7F2]/98 backdrop-blur-2xl border-b border-white/10 dark:border-white/10 light:border-[#89958B]/30 py-6 px-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = isHomePage && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-500/15 light:bg-[#702B40]/10 text-cyan-300 light:text-[#702B40] border border-cyan-500/30 light:border-[#702B40]/30 font-semibold"
                      : "text-slate-300 light:text-[#252B29] hover:bg-white/5 light:hover:bg-[#89958B]/15 hover:text-white light:hover:text-[#702B40]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-cyan-400 light:text-[#702B40]" />}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
