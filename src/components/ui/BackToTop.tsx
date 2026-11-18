"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full border border-cyan-500/30 light:border-[#89958B]/40 bg-[#0b1329]/80 light:bg-[#FAF7F2] backdrop-blur-md text-cyan-400 light:text-[#702B40] hover:text-white light:hover:text-[#FAF7F2] hover:bg-cyan-600/30 light:hover:bg-[#702B40] hover:border-cyan-400 light:hover:border-[#702B40] transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.25)] light:shadow-lg light:shadow-[#252B29]/10 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-cyan-400 light:focus:ring-[#702B40]/40 print:hidden"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
