"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  ShieldCheck,
  Cpu,
  Sparkles,
  CheckCircle2,
  Code2,
  Send,
  CornerDownLeft,
} from "lucide-react";
import { profileData } from "@/data/profile";

interface CommandLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
}

export function LiquidGlassCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeTab, setActiveTab] = useState<"code" | "terminal">("code");

  // Interactive Terminal State
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "init-1",
      command: "welcome",
      output: (
        <span className="text-slate-400 light:text-[#4A5551]">
          Type <span className="text-cyan-300 light:text-[#702B40] font-bold">help</span> or click quick commands below to inspect candidate profile.
        </span>
      ),
    },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

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

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let result: React.ReactNode = "";

    switch (cmd) {
      case "help":
        result = (
          <div className="space-y-1 text-slate-300 light:text-[#252B29]">
            <div>Available CLI commands:</div>
            <div className="pl-2 space-y-0.5 text-[11px] text-cyan-300 light:text-[#702B40]">
              <div>• <span className="font-bold">about</span> : Candidate background &amp; degree</div>
              <div>• <span className="font-bold">skills</span> : Core languages &amp; full-stack tools</div>
              <div>• <span className="font-bold">projects</span> : Flagship software &amp; innovations</div>
              <div>• <span className="font-bold">patent</span> : Indian Patent Office publication record</div>
              <div>• <span className="font-bold">contact</span> : Direct email, phone &amp; socials</div>
              <div>• <span className="font-bold">clear</span> : Clear terminal output</div>
            </div>
          </div>
        );
        break;

      case "about":
        result = (
          <div className="text-slate-300 light:text-[#252B29] space-y-1">
            <div className="text-emerald-400 light:text-[#2E5E44] font-bold">{profileData.name} — {profileData.role}</div>
            <div>Degree: B.Tech in Computer Science and Business Systems (CGPA: 8.10 / 10).</div>
            <div>Focus: Full-Stack Web Development, AI Integration &amp; Real-World Problem Solving.</div>
          </div>
        );
        break;

      case "skills":
        result = (
          <div className="text-slate-300 light:text-[#252B29] space-y-1">
            <div><span className="text-cyan-400 light:text-[#702B40] font-semibold">Languages:</span> Java, C, TypeScript, JavaScript, Python, SQL</div>
            <div><span className="text-cyan-400 light:text-[#702B40] font-semibold">Frontend:</span> React 19, Next.js 15, Tailwind CSS, Framer Motion</div>
            <div><span className="text-cyan-400 light:text-[#702B40] font-semibold">Backend/AI:</span> Node.js, Express, MongoDB Atlas, Google Gemini API</div>
          </div>
        );
        break;

      case "projects":
        result = (
          <div className="text-slate-300 light:text-[#252B29] space-y-1">
            <div>1. <span className="text-cyan-300 light:text-[#702B40] font-bold">MediConnect</span>: Healthcare platform with 3 RBAC portals &amp; Gemini AI triage.</div>
            <div>2. <span className="text-cyan-300 light:text-[#702B40] font-bold">CivicConnect</span>: E-governance system with IssueDNA &amp; SLA Guardian.</div>
            <div>3. <span className="text-cyan-300 light:text-[#702B40] font-bold">FlowVault</span>: Passive hydraulic self-reconfiguring storm drain.</div>
            <div>4. <span className="text-cyan-300 light:text-[#702B40] font-bold">RESQTRAK</span>: Published Patent (IPO App #202641130488).</div>
          </div>
        );
        break;

      case "patent":
        result = (
          <div className="text-slate-300 light:text-[#252B29] space-y-1">
            <div className="text-amber-300 light:text-[#702B40] font-bold">RESQTRAK — Gas-Triggered Mechanical Auto-Extraction System</div>
            <div>Authority: <span className="font-semibold">Indian Patent Office (IPO)</span></div>
            <div>Application Number: <span className="font-mono text-cyan-300 light:text-[#702B40] font-bold">202641130488</span></div>
            <div>Status: <span className="text-emerald-400 light:text-[#2E5E44] font-semibold">Published Patent</span></div>
            <div className="text-[10px] text-slate-400 light:text-[#5E6A66]">
              Search portal: https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus
            </div>
          </div>
        );
        break;

      case "contact":
        result = (
          <div className="text-slate-300 light:text-[#252B29] space-y-0.5">
            <div>Email: <span className="text-cyan-300 light:text-[#702B40] font-mono">{profileData.socials.email}</span></div>
            <div>Phone: <span className="text-cyan-300 light:text-[#702B40] font-mono">{profileData.socials.phone}</span></div>
            <div>GitHub: github.com/{profileData.socials.github.split("/").pop()}</div>
          </div>
        );
        break;

      default:
        result = (
          <span className="text-rose-400 light:text-rose-700">
            command not found: {cmd}. Type <span className="underline font-bold">help</span> for valid commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        output: result,
      },
    ]);
    setInputVal("");
  };

  useEffect(() => {
    if (activeTab === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, activeTab]);

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
      <div className="relative rounded-2xl border border-white/10 light:border-[#89958B]/35 bg-[#090f20]/80 light:bg-[#FAF7F2] backdrop-blur-xl p-5 sm:p-6 shadow-2xl light:shadow-xl light:shadow-[#252B29]/6 overflow-hidden glass-border-highlight">
        {/* Card Header / OS Window Controls */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 light:border-[#89958B]/25 text-xs text-slate-400 light:text-[#4A5551]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />

            {/* Tab switchers */}
            <div className="ml-2 flex items-center p-0.5 rounded-lg bg-white/5 light:bg-[#F5F0E6] border border-white/5 light:border-[#89958B]/25">
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                  activeTab === "code"
                    ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold"
                    : "text-slate-400 light:text-[#4A5551] hover:text-white"
                }`}
              >
                Code
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("terminal")}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                  activeTab === "terminal"
                    ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold"
                    : "text-slate-400 light:text-[#4A5551] hover:text-white"
                }`}
              >
                CLI Terminal
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-400 light:text-[#702B40] bg-cyan-950/60 light:bg-[#702B40]/10 border border-cyan-800/40 light:border-[#702B40]/30 px-2 py-0.5 rounded-full font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 light:bg-[#702B40] animate-ping" />
            LIVE SYS
          </div>
        </div>

        {activeTab === "code" ? (
          /* ========================================================= */
          /* CODE SNIPPET MODE                                         */
          /* ========================================================= */
          <div className="my-4 p-4 rounded-xl bg-black/40 light:bg-[#F5F0E6] border border-white/5 light:border-[#89958B]/30 font-mono text-xs text-slate-300 light:text-[#252B29] leading-relaxed space-y-1.5 shadow-inner">
            <div className="text-slate-500 light:text-[#89958B] italic">{"// Initialize developer profile context"}</div>
            <div>
              <span className="text-pink-400 light:text-[#702B40] font-semibold">const</span>{" "}
              <span className="text-cyan-300 light:text-[#252B29] font-medium">developer</span>:{" "}
              <span className="text-amber-300 light:text-[#8B3751]">SoftwareEngineer</span> = &#123;
            </div>
            <div className="pl-4">
              <span className="text-slate-400 light:text-[#4A5551]">name:</span>{" "}
              <span className="text-emerald-300 light:text-[#702B40] font-semibold">&quot;{profileData.name}&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-400 light:text-[#4A5551]">degree:</span>{" "}
              <span className="text-cyan-200 light:text-[#8B3751]">&quot;B.Tech CSBS (CGPA 8.10)&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-400 light:text-[#4A5551]">patent:</span>{" "}
              <span className="text-amber-300 light:text-[#702B40] font-medium">&quot;IPO App #202641130488&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-400 light:text-[#4A5551]">status:</span>{" "}
              <span className="text-emerald-400 light:text-[#2E5E44] font-medium">&quot;{profileData.availability.status}&quot;</span>,
            </div>
            <div className="pl-4">
              <span className="text-slate-400 light:text-[#4A5551]">goal:</span> () =&gt;{" "}
              <span className="text-sky-300 light:text-[#702B40] font-semibold">buildInnovativeSolutions</span>(),
            </div>
            <div>&#125;;</div>
          </div>
        ) : (
          /* ========================================================= */
          /* INTERACTIVE CLI TERMINAL MODE                             */
          /* ========================================================= */
          <div className="my-4 space-y-3 font-mono text-xs">
            <div className="h-44 overflow-y-auto p-3.5 rounded-xl bg-black/50 light:bg-[#F5F0E6] border border-white/5 light:border-[#89958B]/30 space-y-2 shadow-inner text-[11px] leading-relaxed">
              {history.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 light:text-[#702B40]">
                    <span className="text-emerald-400 light:text-[#2E5E44]">vishnu@dev</span>:
                    <span className="text-slate-400 light:text-[#5E6A66]">~</span>$ {item.command}
                  </div>
                  <div className="pl-3">{item.output}</div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Command Input Field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeCommand(inputVal);
              }}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-black/40 light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/30"
            >
              <span className="text-cyan-400 light:text-[#702B40] font-bold text-xs pl-2">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'patent', 'skills'..."
                className="w-full bg-transparent text-xs text-white light:text-[#252B29] placeholder:text-slate-500 light:placeholder:text-[#89958B] focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 rounded bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] hover:opacity-90 transition-opacity cursor-pointer"
                title="Execute command"
                aria-label="Execute command"
              >
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>

            {/* Quick Command Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 light:text-[#5E6A66]">Quick:</span>
              {["help", "patent", "skills", "projects", "about", "contact", "clear"].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => executeCommand(q)}
                  className="px-2 py-0.5 rounded bg-white/5 light:bg-[#FAF7F2] hover:bg-white/10 light:hover:bg-[#F5F0E6] text-[10px] text-cyan-300 light:text-[#702B40] border border-white/5 light:border-[#89958B]/30 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Diagnostic Metrics Matrix */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/5 light:border-[#89958B]/30 flex items-center gap-3 light:shadow-sm">
            <div className="p-2 rounded-lg bg-cyan-500/10 light:bg-[#702B40]/10 text-cyan-400 light:text-[#702B40]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400 light:text-[#5E6A66]">Domain</div>
              <div className="text-xs font-semibold text-white light:text-[#252B29]">CSBS Undergraduate</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/5 light:border-[#89958B]/30 flex items-center gap-3 light:shadow-sm">
            <div className="p-2 rounded-lg bg-emerald-500/10 light:bg-[#89958B]/20 text-emerald-400 light:text-[#2E5E44]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400 light:text-[#5E6A66]">Patent</div>
              <div className="text-xs font-semibold text-white light:text-[#252B29]">IPO #202641130488</div>
            </div>
          </div>
        </div>

        {/* Bottom Status strip */}
        <div className="mt-4 pt-3 border-t border-white/5 light:border-[#89958B]/25 flex items-center justify-between text-[11px] font-mono text-slate-400 light:text-[#4A5551]">
          <div className="flex items-center gap-1.5 text-emerald-400 light:text-[#2E5E44] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 light:text-[#2E5E44]" />
            <span>0 build errors • 100% test pass</span>
          </div>
          <div className="text-slate-500 light:text-[#5E6A66]">Ready for Roles</div>
        </div>
      </div>
    </motion.div>
  );
}