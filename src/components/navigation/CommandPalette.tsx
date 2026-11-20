"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HackerRankIcon } from "@/components/ui/BrandIcons";
import {
  Search,
  FolderGit2,
  User,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Code2,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { scrollToElement } from "@/lib/utils";
import { showToast } from "@/components/ui/ToastNotification";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: "Sections" | "Projects" | "Actions" | "Socials";
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Ctrl+K / Cmd+K and custom open events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Construct items
  const items: CommandItem[] = useMemo(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-hero",
        title: "Home / Overview",
        description: "Go to top hero introduction",
        category: "Sections",
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        action: () => {
          scrollToElement("hero");
          setIsOpen(false);
        },
      },
      {
        id: "nav-about",
        title: "About Me",
        description: "Philosophy, technical interests, and bio",
        category: "Sections",
        icon: <User className="w-4 h-4 text-sky-400" />,
        action: () => {
          scrollToElement("about");
          setIsOpen(false);
        },
      },
      {
        id: "nav-skills",
        title: "Skills & Matter.js Physics",
        description: "Draggable interactive technology sandbox",
        category: "Sections",
        icon: <Cpu className="w-4 h-4 text-amber-400" />,
        action: () => {
          scrollToElement("skills");
          setIsOpen(false);
        },
      },
      {
        id: "nav-projects",
        title: "Featured Projects",
        description: "Architectural case studies and systems",
        category: "Sections",
        icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
        action: () => {
          scrollToElement("projects");
          setIsOpen(false);
        },
      },
      {
        id: "nav-experience",
        title: "Experience & Timeline",
        description: "Work history, internships, and contributions",
        category: "Sections",
        icon: <Briefcase className="w-4 h-4 text-indigo-400" />,
        action: () => {
          scrollToElement("experience");
          setIsOpen(false);
        },
      },
      {
        id: "nav-education",
        title: "Education",
        description: "Degrees, coursework, and academic honors",
        category: "Sections",
        icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
        action: () => {
          scrollToElement("education");
          setIsOpen(false);
        },
      },
      {
        id: "nav-achievements",
        title: "Achievements & Certifications",
        description: "Hackathons, awards, and credentials",
        category: "Sections",
        icon: <Award className="w-4 h-4 text-yellow-400" />,
        action: () => {
          scrollToElement("achievements");
          setIsOpen(false);
        },
      },
      {
        id: "nav-contact",
        title: "Contact & Inquiries",
        description: "Send direct message via contact form",
        category: "Sections",
        icon: <Mail className="w-4 h-4 text-rose-400" />,
        action: () => {
          scrollToElement("contact");
          setIsOpen(false);
        },
      },
    ];

    const projectItems: CommandItem[] = projectsData.map((project) => ({
      id: `proj-${project.id}`,
      title: project.title,
      description: project.subtitle,
      category: "Projects",
      icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        router.push(`/projects/${project.slug}`);
        setIsOpen(false);
      },
    }));

    const actionItems: CommandItem[] = [
      {
        id: "act-recruiter-brief",
        title: "Open 30-Second Recruiter Brief",
        description: "Quick candidate scorecard, academic metrics & patent summary",
        category: "Actions",
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        action: () => {
          window.dispatchEvent(new CustomEvent("open-recruiter-modal"));
          setIsOpen(false);
        },
      },
      {
        id: "act-resume",
        title: "Download Resume PDF",
        description: profileData.resume.filename,
        category: "Actions",
        icon: <FileText className="w-4 h-4 text-cyan-300" />,
        action: () => {
          window.open(profileData.resume.url, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "act-view-resume",
        title: "View Online Resume Sheet",
        description: "Open interactive printable resume page (/resume)",
        category: "Actions",
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        action: () => {
          router.push("/resume");
          setIsOpen(false);
        },
      },
      {
        id: "act-copy-email",
        title: "Copy Email Address",
        description: profileData.socials.email,
        category: "Actions",
        icon: <Mail className="w-4 h-4 text-cyan-300" />,
        action: () => {
          navigator.clipboard.writeText(profileData.socials.email);
          showToast(`Copied ${profileData.socials.email} to clipboard!`);
          setIsOpen(false);
        },
      },
      {
        id: "act-copy-phone",
        title: "Copy Phone Number",
        description: profileData.socials.phone,
        category: "Actions",
        icon: <Phone className="w-4 h-4 text-cyan-300" />,
        action: () => {
          navigator.clipboard.writeText(profileData.socials.phone);
          showToast(`Copied ${profileData.socials.phone} to clipboard!`);
          setIsOpen(false);
        },
      },
    ];

    const socialItems: CommandItem[] = [
      {
        id: "soc-github",
        title: "GitHub Profile",
        description: profileData.socials.github,
        category: "Socials",
        icon: <Github className="w-4 h-4 text-slate-300" />,
        action: () => {
          window.open(profileData.socials.github, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "soc-linkedin",
        title: "LinkedIn Profile",
        description: profileData.socials.linkedin,
        category: "Socials",
        icon: <Linkedin className="w-4 h-4 text-blue-400" />,
        action: () => {
          window.open(profileData.socials.linkedin, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "soc-hackerrank",
        title: "HackerRank Profile",
        description: profileData.socials.hackerrank,
        category: "Socials",
        icon: <HackerRankIcon className="w-4 h-4 text-emerald-400" />,
        action: () => {
          window.open(profileData.socials.hackerrank, "_blank");
          setIsOpen(false);
        },
      },
    ];

    return [...navItems, ...projectItems, ...actionItems, ...socialItems];
  }, [router]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [items, query]);

  // Handle arrow key navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 print:hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Palette Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", duration: 0.25 }}
            className="relative w-full max-w-xl rounded-2xl border border-white/10 light:border-[#89958B]/35 bg-[#0a0f1e]/95 light:bg-[#FAF7F2] text-slate-100 light:text-[#252B29] shadow-2xl overflow-hidden backdrop-blur-xl z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 light:border-[#89958B]/25 gap-3">
              <Search className="w-5 h-5 text-cyan-400 light:text-[#702B40] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, project, or section..."
                className="w-full bg-transparent text-sm sm:text-base text-white light:text-[#252B29] placeholder-slate-400 light:placeholder-[#89958B] focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-400 light:text-[#5C6764] bg-white/5 light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 rounded">
                ESC
              </kbd>
            </div>

            {/* List Results */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-400 light:text-[#5C6764]">
                  No matching results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-cyan-500/15 light:bg-[#702B40]/15 text-white light:text-[#252B29] border border-cyan-500/30 light:border-[#702B40]/30"
                          : "text-slate-300 light:text-[#4A5551] hover:bg-white/5 light:hover:bg-[#F5F0E6] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? "bg-cyan-500/20 light:bg-[#702B40]/20 text-cyan-300 light:text-[#702B40]" : "bg-white/5 light:bg-[#F5F0E6] text-slate-400 light:text-[#5C6764]"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="truncate">
                          <div className="font-medium text-white light:text-[#252B29] flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 light:bg-[#F5F0E6] text-slate-400 light:text-[#5C6764] border border-white/5 light:border-[#89958B]/25">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 light:text-[#5C6764] truncate">{item.description}</div>
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? "opacity-100 translate-x-0.5 text-cyan-400 light:text-[#702B40]" : "opacity-0"
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5 light:border-[#89958B]/25 bg-white/[0.02] light:bg-[#F5F0E6] text-[11px] text-slate-400 light:text-[#5C6764] font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="text-cyan-400/80 light:text-[#702B40]">Command Palette Active</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
