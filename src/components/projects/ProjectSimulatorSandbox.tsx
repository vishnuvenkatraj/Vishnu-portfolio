"use client";

import { useState, useId } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Flame,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

interface ProjectSimulatorSandboxProps {
  projectId: string;
}

export function ProjectSimulatorSandbox({ projectId }: ProjectSimulatorSandboxProps) {
  const depthInputId = useId();

  // MediConnect state
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    "Acute Chest Tightness",
  ]);

  // CivicConnect state
  const [civicQuery, setCivicQuery] = useState(
    "Water pipeline burst and leaking onto main street near Ward 4 market"
  );

  // RESQTRAK state
  const [simDepth, setSimDepth] = useState<number>(0.8);
  const [isWaterTriggerActive, setIsWaterTriggerActive] = useState<boolean>(false);

  // FlowVault state
  const [vaultPermission, setVaultPermission] = useState<"viewer" | "editor" | "admin">(
    "editor"
  );

  // MediConnect symptom list
  const availableSymptoms = [
    { label: "Acute Chest Tightness", critical: true },
    { label: "Severe Shortness of Breath", critical: true },
    { label: "High Fever (>102°F)", urgent: true },
    { label: "Abdominal Cramping", urgent: true },
    { label: "Mild Cough & Cold", routine: true },
    { label: "Localized Skin Rash", routine: true },
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const hasCritical = selectedSymptoms.some((s) =>
    ["Acute Chest Tightness", "Severe Shortness of Breath"].includes(s)
  );
  const hasUrgent = selectedSymptoms.some((s) =>
    ["High Fever (>102°F)", "Abdominal Cramping"].includes(s)
  );

  // CivicConnect mock database tickets
  const mockTickets = [
    {
      id: "CC-4091",
      ward: "Ward 4",
      title: "Broken municipal water pipeline flooding road",
      matchScore: 94.6,
      status: "In Progress (SLA: 18h left)",
    },
    {
      id: "CC-3810",
      ward: "Ward 2",
      title: "Flickering streetlights along highway intersection",
      matchScore: 12.4,
      status: "Resolved",
    },
    {
      id: "CC-4105",
      ward: "Ward 4",
      title: "Drainage overflow after monsoon rainfall",
      matchScore: 78.2,
      status: "Pending Dispatch",
    },
  ];

  return (
    <div className="rounded-3xl bg-white/[0.02] light:bg-[#FAF7F2] border border-cyan-500/20 light:border-[#89958B]/35 p-6 sm:p-8 space-y-6 light:shadow-md">
      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 dark:border-white/10 light:border-[#89958B]/25 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 light:bg-[#702B40]/10 border border-cyan-500/20 light:border-[#702B40]/30 text-cyan-400 light:text-[#702B40] text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Algorithmic Simulation</span>
          </div>
          <h3 className="text-xl font-bold text-white dark:text-white light:text-[#252B29]">
            {projectId === "project-mediconnect" && "MediConnect • Real-Time AI Symptom Triage Sandbox"}
            {projectId === "project-civicconnect" && "CivicConnect • IssueDNA Deduplication & SLA Engine"}
            {projectId === "project-resqtrak" && "RESQTRAK • Buoyancy Telemetry & Trigger Simulator"}
            {projectId === "project-flowvault" && "FlowVault • Microservice Token & RBAC Resolver"}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 light:text-emerald-700 bg-emerald-500/10 light:bg-emerald-500/15 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Simulation Active</span>
        </div>
      </div>

      {/* 1. MediConnect Triage Simulation */}
      {projectId === "project-mediconnect" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400 light:text-[#5C6764] font-semibold">
              Select Patient Symptoms (Click to toggle):
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSymptoms.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.label);
                return (
                  <button
                    key={sym.label}
                    onClick={() => toggleSymptom(sym.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                        : "bg-white/5 light:bg-[#F5F0E6] text-slate-300 light:text-[#252B29] border border-white/10 light:border-[#89958B]/35 hover:bg-white/10"
                    }`}
                  >
                    {sym.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase">
                Triage Classification
              </span>
              <div
                className={`text-lg font-bold ${
                  hasCritical
                    ? "text-rose-400 light:text-rose-700"
                    : hasUrgent
                    ? "text-amber-400 light:text-amber-700"
                    : "text-emerald-400 light:text-emerald-700"
                }`}
              >
                {hasCritical
                  ? "EMERGENCY (Level 1)"
                  : hasUrgent
                  ? "URGENT CARE (Level 2)"
                  : "ROUTINE OPD (Level 3)"}
              </div>
              <p className="text-[11px] text-slate-400 light:text-[#4A5551]">
                {hasCritical
                  ? "Immediate resuscitation priority assigned."
                  : hasUrgent
                  ? "Priority clinical examination queue."
                  : "Standard outpatient consultation."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase">
                Department Routing
              </span>
              <div className="text-lg font-bold text-white dark:text-white light:text-[#252B29]">
                {hasCritical
                  ? "Cardiology / ER Bay 2"
                  : hasUrgent
                  ? "Internal Medicine OPD"
                  : "General Outpatient Clinic"}
              </div>
              <p className="text-[11px] text-slate-400 light:text-[#4A5551]">
                Indoor WayFinder beacon routing activated.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase">
                Est. Waiting Queue
              </span>
              <div className="text-lg font-bold text-cyan-400 light:text-[#702B40]">
                {hasCritical ? "0 mins (Instant)" : hasUrgent ? "12 mins" : "35 mins"}
              </div>
              <p className="text-[11px] text-slate-400 light:text-[#4A5551]">
                AI confidence score: 98.4%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. CivicConnect Deduplication Simulation */}
      {projectId === "project-civicconnect" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400 light:text-[#5C6764] font-semibold">
              Enter or Select a Civic Grievance to Test IssueDNA Matching:
            </label>
            <input
              type="text"
              value={civicQuery}
              onChange={(e) => setCivicQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/35 text-white light:text-[#252B29] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400 light:text-[#5C6764] font-semibold">
              IssueDNA Vector Similarity Against Ward 4 Active Tickets:
            </span>
            <div className="space-y-2">
              {mockTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-3.5 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/25 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 light:text-[#702B40]">
                        {ticket.id}
                      </span>
                      <span className="text-xs font-semibold text-white light:text-[#252B29]">
                        {ticket.title}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 light:text-[#4A5551]">
                      {ticket.ward} • {ticket.status}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`text-sm font-mono font-bold ${
                        ticket.matchScore > 80
                          ? "text-rose-400 light:text-rose-700"
                          : "text-slate-400 light:text-[#4A5551]"
                      }`}
                    >
                      {ticket.matchScore}% Match
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono">
                      {ticket.matchScore > 80 ? "DEDUPLICATED" : "INDEPENDENT"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. RESQTRAK Telemetry Simulation */}
      {projectId === "project-resqtrak" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor={depthInputId}
                className="text-xs font-mono uppercase text-slate-400 light:text-[#5C6764] font-semibold"
              >
                Submersion Depth Simulator: <span className="text-cyan-400 light:text-[#702B40] font-bold">{simDepth.toFixed(1)}m</span>
              </label>
              <button
                onClick={() => {
                  setSimDepth(3.4);
                  setIsWaterTriggerActive(true);
                }}
                className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 light:text-rose-700 border border-rose-500/30 text-[11px] font-mono hover:bg-rose-500/30 transition-colors cursor-pointer"
              >
                Trigger Submersion Alert
              </button>
            </div>
            <input
              id={depthInputId}
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={simDepth}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setSimDepth(val);
                setIsWaterTriggerActive(val > 2.0);
              }}
              className="w-full accent-cyan-400 light:accent-[#702B40] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
                <span>Buoyancy Trigger</span>
              </span>
              <div
                className={`text-base font-bold ${
                  simDepth > 2.0 || isWaterTriggerActive
                    ? "text-rose-400 light:text-rose-700 animate-pulse"
                    : "text-emerald-400 light:text-emerald-700"
                }`}
              >
                {simDepth > 2.0 || isWaterTriggerActive
                  ? "TRIGGER ACTIVATED"
                  : "ARMED & STANDBY"}
              </div>
              <div className="text-[10px] text-slate-400 light:text-[#4A5551]">
                CO2 Inflator: {simDepth > 2.0 || isWaterTriggerActive ? "DISCHARGED (Surface Bound)" : "SEALED"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
                <span>Beacon Telemetry</span>
              </span>
              <div className="text-xs font-mono font-bold text-white light:text-[#252B29]">
                9.1724° N, 77.8762° E
              </div>
              <div className="text-[10px] text-slate-400 light:text-[#4A5551]">
                LoRa Frequency: 868 MHz (Active)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 light:text-[#5C6764] uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 light:text-[#702B40]" />
                <span>Battery &amp; Sensors</span>
              </span>
              <div className="text-base font-bold text-white light:text-[#252B29]">
                3.82V (Nominal)
              </div>
              <div className="text-[10px] text-slate-400 light:text-[#4A5551]">
                Water Sensor: {simDepth > 2.0 ? "SUBMERGED" : "DRY"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. FlowVault Token & RBAC Simulation */}
      {projectId === "project-flowvault" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400 light:text-[#5C6764] font-semibold">
              Select User Role to Test RBAC Permission Resolver:
            </label>
            <div className="flex gap-2">
              {(["viewer", "editor", "admin"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setVaultPermission(role)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                    vaultPermission === role
                      ? "bg-cyan-500 light:bg-[#702B40] text-black light:text-[#FAF7F2] font-semibold"
                      : "bg-white/5 light:bg-[#F5F0E6] text-slate-300 light:text-[#252B29] border border-white/10 light:border-[#89958B]/35"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 space-y-2 font-mono text-xs">
            <div className="text-slate-400 light:text-[#5C6764] flex items-center justify-between">
              <span>Access Token Resolution</span>
              <span className="text-emerald-400">STATUS: VALID</span>
            </div>
            <div className="text-cyan-300 light:text-[#702B40]">
              {vaultPermission === "viewer" &&
                "PERMISSIONS: [DOC_READ, HASH_VERIFY, AUDIT_LOG_VIEW]"}
              {vaultPermission === "editor" &&
                "PERMISSIONS: [DOC_READ, DOC_UPLOAD, DOC_ENCRYPT, VERSION_PIN]"}
              {vaultPermission === "admin" &&
                "PERMISSIONS: [DOC_ALL, KEY_ROTATE, TENANT_PURGE, ACCESS_GRANT]"}
            </div>
            <div className="text-[11px] text-slate-400 light:text-[#4A5551]">
              SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
