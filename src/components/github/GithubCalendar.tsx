"use client";

import { useEffect, useState } from "react";
import { profileData } from "@/data/profile";
import {
  Github,
  GitBranch,
  ExternalLink,
  Code2,
  FolderGit2,
  Loader2,
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

export function GithubCalendar() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const username = "vishnuvenkatraj";

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl border border-white/10 bg-[#070b16]/90 backdrop-blur-xl p-6 sm:p-8 space-y-8">
          {/* GitHub Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">
                  GitHub Profile &amp; Open Source Repositories
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Verified public code repositories for @{username}
              </p>
            </div>

            {/* Direct Profile CTA */}
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-cyan-300 transition-all shrink-0"
            >
              <span>VISIT GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Repository Showcase */}
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs font-mono">
              <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
              <span>Fetching verified repositories from GitHub API...</span>
            </div>
          ) : error || repos.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <p className="text-sm text-slate-300">
                Explore confirmed repositories directly on GitHub:
              </p>
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
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
                  className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 transition-colors" />
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                      {repo.description || "Public repository on GitHub."}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    {repo.language ? (
                      <span className="flex items-center gap-1.5 text-cyan-300">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        {repo.language}
                      </span>
                    ) : (
                      <span>Code</span>
                    )}
                    <span className="text-slate-500">Public Repo</span>
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
