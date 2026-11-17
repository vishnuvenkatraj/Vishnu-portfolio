import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#060913] light:bg-slate-50 text-white light:text-slate-900 px-6 text-center select-none transition-colors duration-300">
      <div className="w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
        <Terminal className="w-8 h-8" />
      </div>

      <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2">
        Error 404 • Resource Desynchronized
      </div>

      <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
        Sector Not Found
      </h1>

      <p className="text-slate-400 max-w-md text-sm sm:text-base leading-relaxed mb-8 font-light">
        The requested pathway or case study cannot be resolved in the current routing table.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Portfolio Grid</span>
      </Link>
    </main>
  );
}
