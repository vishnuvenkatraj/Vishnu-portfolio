"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cpu,
  ShieldCheck,
  Database,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Server,
  Laptop,
  AlertCircle,
  FileText,
} from "lucide-react";

interface LayerData {
  id: string;
  title: string;
  category: string;
  badge: string;
  technologies: string[];
  description: string;
  responsibilities: string[];
  securityNote: string;
}

interface FlowStep {
  step: number;
  source: string;
  target: string;
  action: string;
  details: string;
}

interface ArchitectureConfig {
  projectTitle: string;
  systemSummary: string;
  layers: LayerData[];
  flowSteps: FlowStep[];
}

const ARCHITECTURES: Record<string, ArchitectureConfig> = {
  "project-mediconnect": {
    projectTitle: "MediConnect System Architecture",
    systemSummary:
      "A tripartite role-based distributed clinical platform integrating Google Gemini Generative AI for symptom triage and end-to-end appointment scheduling.",
    layers: [
      {
        id: "presentation",
        title: "Presentation & Role Portals",
        category: "Client Tier",
        badge: "Client Layer",
        technologies: ["React 19", "Tailwind CSS", "Framer Motion", "Context API"],
        description:
          "Triple-segmented responsive web client providing custom role interfaces for Patients, Clinical Doctors, and Administrative Staff with dedicated view permissions.",
        responsibilities: [
          "Patient consultation booking, real-time doctor availability checking, and health query intake",
          "Doctor clinical calendar, prescription logging, and patient history review console",
          "Administrative overview tracking appointment queues and departmental throughput",
        ],
        securityNote:
          "Zero client-side credential persistence; role permissions verified via cryptographically signed JWT headers.",
      },
      {
        id: "api_gateway",
        title: "API Gateway & Security Layer",
        category: "Backend Services",
        badge: "Control Plane",
        technologies: ["Node.js", "Express / Next.js API Routes", "JWT Auth", "Rate Limiting"],
        description:
          "Central orchestrator managing incoming HTTP requests, role-based route guards, payload sanitization, and session token verification.",
        responsibilities: [
          "Defensive RBAC middleware ensuring patients cannot query doctor or admin endpoints",
          "Sanitizes all patient inputs to prevent stored XSS and prompt injection attacks",
          "Rate limits AI symptom analysis requests to prevent API resource exhaustion",
        ],
        securityNote:
          "Strict CORS configuration, sliding window rate limiter, and RFC-compliant input validation.",
      },
      {
        id: "ai_engine",
        title: "Generative AI Triage Engine",
        category: "AI & Intelligence",
        badge: "AI Core",
        technologies: ["Google Gemini AI API", "Structured Prompt Engineering", "JSON Schema Validation"],
        description:
          "Specialized AI inference pipeline that parses natural language symptom descriptions, evaluates urgency thresholds, and synthesizes preliminary clinical advice.",
        responsibilities: [
          "Maps vague conversational complaints into standardized anatomical symptom classifications",
          "Flags red-flag emergency symptoms requiring immediate physical ER visits",
          "Generates structured summaries for doctors to review prior to patient consultations",
        ],
        securityNote:
          "All personally identifiable information (PII) is masked before prompt dispatch to external LLM APIs.",
      },
      {
        id: "persistence",
        title: "Clinical Persistence & Storage",
        category: "Data Layer",
        badge: "Data Tier",
        technologies: ["MongoDB Atlas", "Mongoose ODM", "Encrypted Document Stores"],
        description:
          "Secure, high-availability document store maintaining clinical records, appointment schedules, physician registries, and immutable audit logs.",
        responsibilities: [
          "Atomically reserves appointment slots to eliminate double-booking race conditions",
          "Maintains timestamped historical consultation logs for clinical continuity",
          "Stores administrative workflow records and role authentication credentials",
        ],
        securityNote:
          "Encrypted at rest using AES-256 and transmitted exclusively over TLS 1.3 encrypted sockets.",
      },
    ],
    flowSteps: [
      {
        step: 1,
        source: "Patient Role Portal",
        target: "API Gateway & Security Layer",
        action: "Symptom Submission & Intake",
        details: "Patient enters natural language symptoms and requests triage guidance.",
      },
      {
        step: 2,
        source: "API Gateway",
        target: "Generative AI Triage Engine",
        action: "Sanitized Prompt Dispatch",
        details: "Gateway validates session token, strips PII, and sends intake payload to Gemini API.",
      },
      {
        step: 3,
        source: "Generative AI Triage Engine",
        target: "API Gateway",
        action: "Structured Clinical Guidance",
        details: "Gemini returns validated JSON with symptom categories and urgency triage flag.",
      },
      {
        step: 4,
        source: "API Gateway",
        target: "Clinical Persistence & Storage",
        action: "Atomic Slot Reservation",
        details: "System matches appropriate specialist doctor and persists consultation record.",
      },
      {
        step: 5,
        source: "API Gateway",
        target: "Doctor & Patient Portals",
        action: "Synchronized Real-Time Update",
        details: "Doctor calendar populates with intake summary; patient receives booking confirmation.",
      },
    ],
  },
  "project-civicconnect": {
    projectTitle: "CivicConnect System Architecture",
    systemSummary:
      "A multi-district e-governance platform featuring IssueDNA algorithmic deduplication, ResolveChain lifecycle routing, and SLA Guardian proactive violation tracking.",
    layers: [
      {
        id: "presentation",
        title: "Citizen Portal & Municipal Console",
        category: "Client Tier",
        badge: "Client Layer",
        technologies: ["React 19", "Tailwind CSS", "Geolocation API", "Responsive Web App"],
        description:
          "Dual-facing application offering citizens a simple complaint lodging interface and municipal officers a command dashboard for tracking civic issues.",
        responsibilities: [
          "Citizen issue submission with automatic camera/photo upload and GPS coordinate capture",
          "Public grievance tracking dashboard with real-time status progression",
          "Departmental resolution console for field officers to verify and close complaints",
        ],
        securityNote:
          "Device location access is requested with explicit consent; EXIF metadata stripped on image upload.",
      },
      {
        id: "workflow_engine",
        title: "ResolveChain Workflow Engine",
        category: "Orchestration",
        badge: "Workflow Core",
        technologies: ["Node.js State Machine", "Event Dispatcher", "Automated Routing"],
        description:
          "Hierarchical business process pipeline that transitions grievances across states: Lodged -> Triaged -> In Progress -> Resolved -> Citizen Verified.",
        responsibilities: [
          "Routes complaints to specific municipal departments (Roads, Water, Sanitation, Electricity)",
          "Enforces state transitions and prevents unauthorized grievance closure without photo proof",
          "Dispatches notification webhooks to municipal engineers upon new assignments",
        ],
        securityNote:
          "Officer resolution actions require cryptographic signing and verified resolution photos.",
      },
      {
        id: "ai_dedup",
        title: "IssueDNA & SLA Guardian Engine",
        category: "AI & Analytics",
        badge: "Intelligence Layer",
        technologies: ["Contextual Deduplication", "Geo-Clustering", "Predictive SLA Analytics"],
        description:
          "Dual AI modules: IssueDNA merges identical civic reports within spatial clusters, while SLA Guardian predicts and flags deadline breach risks.",
        responsibilities: [
          "Calculates semantic similarity between newly reported issues and existing active complaints",
          "Aggregates multiple citizen reports into single high-priority civic work orders",
          "Monitors resolution elapsed time against statutory municipal SLAs, escalating delayed tickets",
        ],
        securityNote:
          "Clustering thresholds are calibrated to prevent false-positive grouping of distinct incidents.",
      },
      {
        id: "persistence",
        title: "Municipal Grievance Data Core",
        category: "Data Layer",
        badge: "Data Tier",
        technologies: ["MongoDB Atlas", "Geospatial Indexing", "Audit Storage"],
        description:
          "Geospatially indexed database managing municipal administrative boundaries, citizen grievance histories, and resolution performance analytics.",
        responsibilities: [
          "Executes 2dsphere spatial queries to group local civic grievances by ward and district",
          "Stores immutable resolution audit trails for transparency and public auditing",
          "Generates aggregate ward performance metrics for municipal commissioners",
        ],
        securityNote:
          "Role-segregated database connection pools with strict read-only replicas for public query dashboards.",
      },
    ],
    flowSteps: [
      {
        step: 1,
        source: "Citizen Reporting Portal",
        target: "ResolveChain Workflow Engine",
        action: "Grievance Lodged with Geo-Tag",
        details: "Citizen submits pothole report with GPS coordinates and photographic evidence.",
      },
      {
        step: 2,
        source: "ResolveChain Workflow Engine",
        target: "IssueDNA Deduplication Core",
        action: "Spatial & Semantic Deduplication",
        details: "IssueDNA scans existing tickets in 50m radius and computes description similarity.",
      },
      {
        step: 3,
        source: "IssueDNA Core",
        target: "ResolveChain Workflow Engine",
        action: "Cluster Aggregation or New Ticket",
        details: "If duplicate, adds citizen as co-reporter and upvotes urgency; otherwise creates new work order.",
      },
      {
        step: 4,
        source: "ResolveChain Engine",
        target: "SLA Guardian Risk Monitor",
        action: "SLA Clock Initialization",
        details: "Sets statutory resolution countdown and establishes tiered escalation triggers.",
      },
      {
        step: 5,
        source: "ResolveChain Engine",
        target: "Municipal Command Console",
        action: "Departmental Officer Dispatch",
        details: "Ward road engineer receives work order; public tracker updates with assigned officer details.",
      },
    ],
  },
};

interface InteractiveArchitectureDiagramProps {
  projectId: string;
}

export function InteractiveArchitectureDiagram({
  projectId,
}: InteractiveArchitectureDiagramProps) {
  const config = ARCHITECTURES[projectId];
  const [activeLayerId, setActiveLayerId] = useState<string>(
    config?.layers[0]?.id || ""
  );
  const [viewMode, setViewMode] = useState<"layers" | "simulator">("layers");
  const [simStep, setSimStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  if (!config) return null;

  const activeLayer =
    config.layers.find((l) => l.id === activeLayerId) || config.layers[0];

  const handleNextStep = () => {
    setSimStep((prev) => (prev + 1) % config.flowSteps.length);
  };

  const handleResetStep = () => {
    setSimStep(0);
    setIsPlaying(false);
  };

  return (
    <section className="space-y-6 pt-6 border-t border-white/10 light:border-[#89958B]/25">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 light:bg-[#702B40]/10 border border-cyan-500/30 light:border-[#702B40]/30 text-xs font-mono text-cyan-400 light:text-[#702B40] font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive System Architecture</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white light:text-[#252B29]">
            {config.projectTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 light:text-[#4A5551] mt-1 max-w-2xl font-normal">
            {config.systemSummary}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-white/5 light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/35 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("layers")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              viewMode === "layers"
                ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold shadow-sm"
                : "text-slate-400 light:text-[#4A5551] hover:text-white light:hover:text-[#252B29]"
            }`}
          >
            System Layers
          </button>
          <button
            type="button"
            onClick={() => setViewMode("simulator")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              viewMode === "simulator"
                ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold shadow-sm"
                : "text-slate-400 light:text-[#4A5551] hover:text-white light:hover:text-[#252B29]"
            }`}
          >
            Request Flow Simulator
          </button>
        </div>
      </div>

      {viewMode === "layers" ? (
        /* ========================================================= */
        /* LAYER-BY-LAYER EXPLORER                                   */
        /* ========================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Layer Stack Navigator */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 light:text-[#5C6764] px-1 font-semibold">
              Select Architecture Layer
            </div>

            {config.layers.map((layer, idx) => {
              const isSelected = layer.id === activeLayerId;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? "bg-cyan-500/15 light:bg-[#702B40]/10 border-cyan-400/60 light:border-[#702B40] shadow-md shadow-cyan-500/10 light:shadow-sm"
                      : "bg-white/[0.02] light:bg-[#FAF7F2] border-white/10 light:border-[#89958B]/35 hover:bg-white/[0.05] light:hover:bg-[#F5F0E6] hover:border-cyan-500/30 light:hover:border-[#702B40]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                        isSelected
                          ? "bg-cyan-400 light:bg-[#702B40] text-black light:text-[#FAF7F2]"
                          : "bg-white/10 light:bg-[#89958B]/20 text-slate-300 light:text-[#252B29] group-hover:text-cyan-300 light:group-hover:text-[#702B40]"
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <div
                        className={`text-sm font-semibold transition-colors ${
                          isSelected
                            ? "text-cyan-300 light:text-[#702B40]"
                            : "text-white light:text-[#252B29] group-hover:text-cyan-200"
                        }`}
                      >
                        {layer.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 light:text-[#5C6764]">
                        {layer.category}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? "text-cyan-400 light:text-[#702B40] translate-x-1"
                        : "text-slate-500 light:text-[#89958B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Layer Specifications */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 backdrop-blur-md space-y-5 light:shadow-md"
              >
                {/* Title & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 light:border-[#89958B]/25">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 light:text-[#702B40] font-semibold">
                      {activeLayer.badge}
                    </span>
                    <h4 className="text-xl font-bold text-white light:text-[#252B29]">
                      {activeLayer.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLayer.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/5 light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 font-mono text-xs text-cyan-300 light:text-[#252B29]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 light:text-[#4A5551] leading-relaxed font-light">
                  {activeLayer.description}
                </p>

                {/* Responsibilities */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 light:text-[#5C6764] font-semibold">
                    Core Operational Responsibilities
                  </div>
                  <ul className="space-y-2">
                    {activeLayer.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 light:text-[#252B29]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 light:text-[#702B40] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security & Reliability Safeguard */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 light:bg-emerald-50 border border-emerald-500/30 light:border-emerald-200 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 light:text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono uppercase text-emerald-400 light:text-emerald-700 font-bold">
                      Security &amp; Data Safeguard
                    </div>
                    <div className="text-xs text-emerald-200 light:text-emerald-900 mt-0.5">
                      {activeLayer.securityNote}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* REQUEST FLOW SIMULATOR                                    */
        /* ========================================================= */
        <div className="p-6 sm:p-8 rounded-2xl bg-[#030611] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 space-y-6 light:shadow-md">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 light:border-[#89958B]/25">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 light:text-[#702B40] font-semibold">
                STEP {simStep + 1} OF {config.flowSteps.length}:
              </span>
              <span className="text-xs font-semibold text-white light:text-[#252B29]">
                {config.flowSteps[simStep].action}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetStep}
                className="p-2 rounded-lg bg-white/5 light:bg-[#F5F0E6] hover:bg-white/10 light:hover:bg-[#FAF7F2] text-slate-300 light:text-[#252B29] border border-white/10 light:border-[#89958B]/35 transition-colors cursor-pointer"
                title="Reset simulation to step 1"
                aria-label="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 light:bg-[#702B40] hover:bg-cyan-400 light:hover:bg-[#582031] text-black light:text-[#FAF7F2] text-xs font-semibold font-mono transition-all cursor-pointer shadow-sm"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-2">
            {config.flowSteps.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSimStep(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === simStep
                    ? "bg-cyan-400 light:bg-[#702B40] shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    : idx < simStep
                    ? "bg-emerald-400 light:bg-[#2E5E44]"
                    : "bg-white/10 light:bg-[#89958B]/30"
                }`}
                title={`Jump to Step ${idx + 1}: ${step.action}`}
                aria-label={`Jump to Step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Active Flow Step Visual Card */}
          <motion.div
            key={simStep}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-xl bg-white/[0.03] light:bg-[#F5F0E6] border border-cyan-500/30 light:border-[#702B40]/40 space-y-4 shadow-inner"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-cyan-950/80 light:bg-[#702B40]/15 border border-cyan-500/40 light:border-[#702B40]/30 font-mono text-xs text-cyan-300 light:text-[#702B40] font-bold">
                  {config.flowSteps[simStep].source}
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 light:text-[#702B40] shrink-0" />
                <div className="px-3 py-1.5 rounded-lg bg-indigo-950/80 light:bg-[#89958B]/20 border border-indigo-500/40 light:border-[#89958B]/40 font-mono text-xs text-indigo-300 light:text-[#252B29] font-bold">
                  {config.flowSteps[simStep].target}
                </div>
              </div>

              <div className="text-[11px] font-mono text-emerald-400 light:text-[#2E5E44] flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE TRANSACTION</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-200 light:text-[#252B29] leading-relaxed">
              {config.flowSteps[simStep].details}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}