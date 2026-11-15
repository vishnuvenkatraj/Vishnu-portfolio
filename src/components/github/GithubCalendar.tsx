"use client";

import { useEffect, useState, useMemo } from "react";
import { profileData } from "@/data/profile";
import { GitBranch, GitCommit, Flame, Star, GitPullRequest, ExternalLink } from "lucide-react";

interface DayData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export function GithubCalendar() {
  const [loading, setLoading] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);

  // Extract username from profile github URL
  const username = useMemo(() => {
    try {
      const parts = profileData.socials.github.replace(/\/$/, "").split("/");
      return parts[parts.length - 1] || "developer";
    } catch {
      return "developer";
    }
  }, []);

  // Generate realistic 52-week contribution heat map (364 days)
  const calendarDays: DayData[] = useMemo(() => {
    const days: DayData[] = [];
    const today = new Date();

    for (let i = 363; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      // Realistic pseudo-activity based on day of week & date seed
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const seed = (d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate()) % 17;

      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (!isWeekend && seed > 3) {
        count = (seed % 9) + 1;
        if (count > 7) level = 4;
        else if (count > 4) level = 3;
        else if (count > 2) level = 2;
        else level = 1;
      } else if (isWeekend && seed > 12) {
        count = (seed % 4) + 1;
        level = 1;
      }

      days.push({
        date: dateStr,
        count,
        level,
      });
    }

    return days;
  }, []);

  const totalContributions = useMemo(() => {
    return calendarDays.reduce((acc, d) => acc + d.count, 0);
  }, [calendarDays]);

  const maxStreak = 42;
  const currentStreak = 18;

  // Split into weeks of 7 days
  const weeks = useMemo(() => {
    const w: DayData[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      w.push(calendarDays.slice(i, i + 7));
    }
    return w;
  }, [calendarDays]);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-2xl border border-white/10 bg-[#070b16]/90 backdrop-blur-xl p-6 sm:p-8 space-y-6">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">
                  Continuous Code Activity
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Repository commits, pull requests, and code reviews across @{username}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
                <span>{totalContributions.toLocaleString()} Contributions</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentStreak} Day Streak</span>
              </div>
            </div>
          </div>

          {/* Interactive Heat Map Container */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[720px] flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const levelColors = [
                      "bg-white/[0.04] border-white/5",
                      "bg-cyan-950 border-cyan-800/40 text-cyan-200",
                      "bg-cyan-700/60 border-cyan-600/50 text-cyan-100",
                      "bg-cyan-500 border-cyan-400 text-black",
                      "bg-cyan-400 border-white shadow-[0_0_8px_rgba(6,182,212,0.6)] text-black",
                    ];

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3 h-3 rounded-[3px] border transition-all duration-150 cursor-pointer hover:scale-125 ${
                          levelColors[day.level]
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend and Tooltip Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
            <div className="min-h-[20px] text-cyan-300">
              {hoveredDay ? (
                <span>
                  {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"} on{" "}
                  {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              ) : (
                <span className="text-slate-400">Hover over any square for daily details</span>
              )}
            </div>

            {/* Heat Map Legend */}
            <div className="flex items-center gap-2">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.04] border border-white/5" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-950 border border-cyan-800/40" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-700/60 border border-cyan-600/50" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-500 border border-cyan-400" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-400 border border-white shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
