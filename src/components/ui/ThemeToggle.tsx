"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const isLightDom = document.documentElement.classList.contains("light");
    const activeTheme = savedTheme || (isLightDom ? "light" : "dark");
    setTheme(activeTheme);

    if (activeTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"dark" | "light">;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
        setTheme(e.newValue);
        if (e.newValue === "light") {
          document.documentElement.classList.add("light");
          document.documentElement.classList.remove("dark");
        } else {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        }
      }
    };

    window.addEventListener("theme-change", handleThemeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    window.dispatchEvent(new CustomEvent("theme-change", { detail: nextTheme }));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors border border-white/10 light:border-[#89958B]/35 bg-white/5 hover:bg-white/10 light:bg-[#FAF7F2] light:hover:bg-[#F5F0E6] text-slate-300 light:text-[#252B29] hover:text-cyan-400 light:hover:text-[#702B40] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 light:focus:ring-[#702B40]/40 cursor-pointer ${className}`}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-[#702B40] transition-transform hover:-rotate-12" />
        )
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45 block light:hidden" />
          <Moon className="w-4 h-4 text-[#702B40] transition-transform hover:-rotate-12 hidden light:block" />
        </>
      )}
    </button>
  );
}
