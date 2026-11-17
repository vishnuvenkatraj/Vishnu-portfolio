"use client";

import { useEffect, useState } from "react";
import { profileData } from "@/data/profile";
import {
  Github,
  ExternalLink,
  FolderGit2,
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
];

export function GithubCalendar() {
  const [repos, setRepos] = useState<Repository[]>(VERIFIED_REPOSITORIES);

  const username = "vishnuvenkatraj";

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        }
      } catch {
        // Silently preserve verified pre-rendered repositories without blocking
      }
    }

    fetchRepos();
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl border border-white/10 light:border-slate-200 bg-[#070b16]/90 light:bg-white backdrop-blur-xl p-6 sm:p-8 space-y-8 light:shadow-md">
          {/* GitHub Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 light:border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-cyan-400 light:text-cyan-600" />
                <h3 className="text-xl font-bold text-white light:text-slate-900">
                  GitHub Profile &amp; Open Source Repositories
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 font-mono">
                Verified public code repositories for @{username}
              </p>
            </div>

            {/* Direct Profile CTA */}
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 light:bg-slate-100 hover:bg-white/10 light:hover:bg-slate-200 border border-white/10 light:border-slate-300 hover:border-cyan-500/40 text-xs font-mono text-cyan-300 light:text-cyan-800 transition-all shrink-0 font-medium"
            >
              <span>VISIT GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Repository Showcase */}
          {repos.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/5 light:border-slate-200 space-y-3">
              <p className="text-sm text-slate-300 light:text-slate-700">
                Explore confirmed repositories directly on GitHub:
              </p>
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 light:text-cyan-700 hover:text-cyan-300 underline underline-offset-4"
              >
                <span>https://github.com/{username}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-xl bg-white/[0.02] light:bg-slate-50 hover:bg-white/[0.05] light:hover:bg-slate-100 border border-white/10 light:border-slate-200 hover:border-cyan-500/30 light:hover:border-cyan-500/50 light:shadow-sm transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-white light:text-slate-900 text-sm group-hover:text-cyan-300 light:group-hover:text-cyan-700 transition-colors flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-cyan-400 light:text-cyan-600 shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 light:group-hover:text-cyan-600 shrink-0 transition-colors" />
                    </div>

                    <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed font-light line-clamp-3">
                      {repo.description || "Public repository on GitHub."}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-400 light:text-slate-500">
                    {repo.language ? (
                      <span className="flex items-center gap-1.5 text-cyan-300 light:text-cyan-700 font-medium">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 light:bg-cyan-600" />
                        {repo.language}
                      </span>
                    ) : (
                      <span>Code</span>
                    )}
                    <span className="text-slate-500 light:text-slate-500">Public Repo</span>
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
