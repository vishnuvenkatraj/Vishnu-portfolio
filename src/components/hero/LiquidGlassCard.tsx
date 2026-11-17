"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Activity, Cpu, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { profileData } from "@/data/profile";

export function LiquidGlassCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.2 }}
      style={{ perspective: 1000 }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Ambient background bloom */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-indigo-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Main Glass Panel */}
      <div className="relative rounded-2xl border border-white/10 light:border-slate-300 bg-[#090f20]/80 light:bg-white/95 backdrop-blur-xl p-6 shadow-2xl light:shadow-xl overflow-hidden glass-border-highlight">
        {/* Card Header / OS Window Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 light:border-slate-200 text-xs text-slate-400 light:text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-[11px] text-slate-400 light:text-slate-600 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-cyan-400 light:text-cyan-600" />
              kernel::runtime_v2.6
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-400 light:text-cyan-800 bg-cyan-950/60 light:bg-cyan-50 border border-cyan-800/40 light:border-cyan-300 px-2 py-0.5 rounded-full font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            LIVE SYS
          </div>
        </div>

        {/* Code / Architecture Snippet */}
        <div className="my-5 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-300 leading-relaxed space-y-1.5">
          <div className="text-slate-500">{"// Initialize developer profile context"}</div>
          <div>
            <span className="text-pink-400">const</span>{" "}
            <span className="text-cyan-300">developer</span>:{" "}
            <span className="text-amber-300">SoftwareEngineer</span> = &#123;
          </div>
          <div className="pl-4">
            <span className="text-slate-400">name:</span>{" "}
            <span className="text-emerald-300">&quot;{profileData.name}&quot;</span>,
          </div>
          <div className="pl-4">
            <span className="text-slate-400">focus:</span> [
            <span className="text-cyan-200">&quot;Software Engineering&quot;</span>,{" "}
            <span className="text-cyan-200">&quot;AI Integration&quot;</span>],
          </div>
          <div className="pl-4">
            <span className="text-slate-400">status:</span>{" "}
            <span className="text-emerald-400">&quot;{profileData.availability.status}&quot;</span>,
          </div>
          <div className="pl-4">
            <span className="text-slate-400">goal:</span> () =&gt;{" "}
            <span className="text-sky-300">buildInnovativeSolutions</span>(),
          </div>
          <div>&#125;;</div>
        </div>

        {/* Diagnostic Metrics Matrix */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/5 light:border-slate-200 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 light:bg-cyan-100 text-cyan-400 light:text-cyan-700">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400 light:text-slate-500">Domain</div>
              <div className="text-xs font-semibold text-white light:text-slate-900">CSBS Undergraduate</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/5 light:border-slate-200 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 light:bg-emerald-100 text-emerald-400 light:text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400 light:text-slate-500">Focus</div>
              <div className="text-xs font-semibold text-white light:text-slate-900">Software &amp; AI</div>
            </div>
          </div>
        </div>

        {/* Bottom Status strip */}
        <div className="mt-4 pt-3 border-t border-white/5 light:border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-400 light:text-slate-600">
          <div className="flex items-center gap-1.5 text-emerald-400 light:text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>0 build errors • 100% test pass</span>
          </div>
          <div className="text-slate-500 light:text-slate-500">Matter.js Physics Ready</div>
        </div>
      </div>
    </motion.div>
  );
}
