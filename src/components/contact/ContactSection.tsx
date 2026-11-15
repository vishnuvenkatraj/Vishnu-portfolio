"use client";

import { useState } from "react";
import { profileData } from "@/data/profile";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      } else {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error connecting to API. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Initiate Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Resilient
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
            Whether discussing full-stack roles, consulting on architecture, or building creative
            web applications, my inbox is open.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-6">
              <h3 className="text-lg font-bold text-white">Direct Channels</h3>

              {/* Copy Email Box */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Primary Email
                  </div>
                  <div className="text-sm font-semibold text-white truncate font-mono">
                    {profileData.socials.email}
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social Profiles */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Connected Networks
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all"
                  >
                    <Github className="w-4 h-4 text-slate-400" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profileData.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all"
                  >
                    <Twitter className="w-4 h-4 text-sky-400" />
                    <span>Twitter / X</span>
                  </a>

                  <a
                    href={profileData.resume.url}
                    download={profileData.resume.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-2 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Resume PDF</span>
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-4 border-t border-white/5 text-xs text-slate-400 leading-relaxed font-light">
                Typically responds within 24 hours. Confidential inquiries and NDA requests
                honored.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-6"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-sm font-semibold text-white">Send Direct Message</span>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  Real API Route
                </span>
              </div>

              {/* Status Notifications */}
              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Message successfully received!</div>
                    <div>Thank you for reaching out. I will review and reply shortly.</div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Submission Error</div>
                    <div>{errorMessage}</div>
                  </div>
                </div>
              )}

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  Subject <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Full-Stack Engineering Opportunity / Project Architecture"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your team, system requirements, or upcoming technical milestones..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-black font-semibold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Payload...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
