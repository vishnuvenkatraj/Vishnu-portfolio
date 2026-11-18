"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { profileData } from "@/data/profile";
import {
  Github,
  ExternalLink,
  FolderGit2,
  RefreshCw,
  Sparkles,
  Code2,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

const VERIFIED_REPOSITORIES: Repository[] = [
  {
    id: 101,
    name: "AI-Threat-Analysis",
    description: "AI-driven threat intelligence and automated security analysis pipeline.",
    html_url: "https://github.com/vishnuvenkatraj/AI-Threat-Analysis",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: 102,
    name: "MEDCONNECT",
    description: "Healthcare workflow digitization platform with role-based access control and AI symptom analysis.",
    html_url: "https://github.com/vishnuvenkatraj/MEDCONNECT",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: 103,
    name: "Legal-Metrology-Compliance-Checker",
    description: "Automated regulatory compliance verification tool for e-commerce legal metrology norms.",
    html_url: "https://github.com/vishnuvenkatraj/Legal-Metrology-Compliance-Checker",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: 104,
    name: "C-Programming-Quiz",
    description: "Interactive C programming application assessing memory structures, pointers, and data types.",
    html_url: "https://github.com/vishnuvenkatraj/C-Programming-Quiz",
    language: "C",
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: 105,
    name: "mediconnect",
    description: "End-to-end full-stack healthcare portal integrating GenAI medical insights and appointment management.",
    html_url: "https://github.com/vishnuvenkatraj/mediconnect",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
  },
  {
    id: 106,
    name: "Vishnu-portfolio",
    description: "Personal engineering portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Matter.js.",
    html_url: "https://github.com/vishnuvenkatraj/Vishnu-portfolio",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
  },
];

const CACHE_KEY = "github_repos_cache_v2";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export function GithubCalendar() {
  const [repos, setRepos] = useState<Repository[]>(VERIFIED_REPOSITORIES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const username = "vishnuvenkatraj";

  const fetchRepositories = useCallback(async (force = false) => {
    // Check sessionStorage cache first if not forced
    if (!force && typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data) && data.length > 0) {
            setRepos(data);
            setLastFetched(new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
            return;
          }
        }
      } catch {
        // Fall through to network fetch
      }
    }

    if (force) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=9`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const sanitizedRepos: Repository[] = data.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            language: r.language,
            stargazers_count: r.stargazers_count || 0,
            forks_count: r.forks_count || 0,
          }));

          setRepos(sanitizedRepos);
          const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          setLastFetched(nowStr);

          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ data: sanitizedRepos, timestamp: Date.now() })
              );
            } catch {
              // Ignore session storage write errors
            }
          }
        }
      }
    } catch {
      // Retain verified fallback repositories gracefully
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [username]);

  useEffect(() => {
    fetchRepositories(false);
  }, [fetchRepositories]);

  const filteredRepos = useMemo(() => {
    if (selectedFilter === "all") return repos;
    if (selectedFilter === "js-ts") {
      return repos.filter(
        (r) =>
          r.language === "JavaScript" ||
          r.language === "TypeScript" ||
          r.name.toLowerCase().includes("connect") ||
          r.name.toLowerCase().includes("portfolio")
      );
    }
    if (selectedFilter === "python") {
      return repos.filter((r) => r.language === "Python" || r.name.toLowerCase().includes("threat"));
    }
    if (selectedFilter === "c-systems") {
      return repos.filter((r) => r.language === "C" || r.language === "C++");
    }
    return repos;
  }, [repos, selectedFilter]);

  return (
    <section className="relative py-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl border border-white/10 light:border-[#89958B]/35 bg-[#070b16]/90 light:bg-[#FAF7F2] backdrop-blur-xl p-6 sm:p-8 space-y-6 light:shadow-md">
          {/* GitHub Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 light:border-[#89958B]/25">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-cyan-400 light:text-[#702B40]" />
                <h3 className="text-xl font-bold text-white light:text-[#252B29]">
                  GitHub Profile &amp; Open Source Repositories
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 light:text-[#5C6764] font-mono">
                Verified public code repositories for @{username}
                {lastFetched && ` • Synced at ${lastFetched}`}
              </p>
            </div>

            {/* Direct Profile CTA & Manual Refresh */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fetchRepositories(true)}
                disabled={isRefreshing}
                className="p-2 rounded-xl bg-white/5 light:bg-[#F5F0E6] hover:bg-white/10 light:hover:bg-[#FAF7F2] text-slate-300 light:text-[#252B29] border border-white/10 light:border-[#89958B]/35 transition-colors cursor-pointer disabled:opacity-50"
                title="Refresh latest repositories from GitHub"
                aria-label="Refresh repositories"
              >
                <RefreshCw
                  className={`w-4 h-4 text-cyan-400 light:text-[#702B40] ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
              </button>

              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 light:bg-[#FAF7F2] hover:bg-white/10 light:hover:bg-[#702B40] border border-white/10 light:border-[#89958B]/40 light:hover:border-[#702B40] text-xs font-mono text-cyan-300 light:text-[#702B40] light:hover:text-[#FAF7F2] transition-all font-medium"
              >
                <span>VISIT GITHUB PROFILE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Repositories" },
              { id: "js-ts", label: "JavaScript / TypeScript" },
              { id: "python", label: "Python & AI" },
              { id: "c-systems", label: "C & Systems" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold shadow-sm"
                    : "bg-white/5 light:bg-[#F5F0E6] text-slate-400 light:text-[#5C6764] hover:text-white light:hover:text-[#252B29] border border-white/5 light:border-[#89958B]/25"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Repository Showcase */}
          {isLoading && repos.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-3 animate-pulse"
                >
                  <div className="h-4 bg-white/10 light:bg-[#89958B]/30 rounded w-2/3" />
                  <div className="h-3 bg-white/5 light:bg-[#89958B]/20 rounded w-full" />
                  <div className="h-3 bg-white/5 light:bg-[#89958B]/20 rounded w-4/5" />
                  <div className="h-3 bg-white/10 light:bg-[#89958B]/30 rounded w-1/4 pt-2" />
                </div>
              ))}
            </div>
          ) : filteredRepos.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] border border-white/5 light:border-[#89958B]/30 space-y-3">
              <p className="text-sm text-slate-300 light:text-[#4A5551]">
                No repositories match the selected filter.
              </p>
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className="text-xs font-mono text-cyan-400 light:text-[#702B40] underline underline-offset-4 cursor-pointer"
              >
                Reset to All Repositories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] hover:bg-white/[0.05] light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/30 hover:border-cyan-500/30 light:hover:border-[#702B40]/40 light:shadow-sm transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-white light:text-[#252B29] text-sm group-hover:text-cyan-300 light:group-hover:text-[#702B40] transition-colors flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-cyan-400 light:text-[#702B40] shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 light:text-[#89958B] group-hover:text-cyan-400 light:group-hover:text-[#702B40] shrink-0 transition-colors" />
                    </div>

                    <p className="text-xs text-slate-400 light:text-[#4A5551] leading-relaxed font-light line-clamp-3">
                      {repo.description || "Public repository on GitHub."}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 light:border-[#89958B]/20 flex items-center justify-between text-[11px] font-mono text-slate-400 light:text-[#5C6764]">
                    {repo.language ? (
                      <span className="flex items-center gap-1.5 text-cyan-300 light:text-[#702B40] font-medium">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 light:bg-[#702B40]" />
                        {repo.language}
                      </span>
                    ) : (
                      <span>Code</span>
                    )}
                    <span className="text-slate-500 light:text-[#5C6764]">Public Repo</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}