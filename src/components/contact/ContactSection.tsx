"use client";

import { useState } from "react";
import { profileData } from "@/data/profile";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Github,
  Linkedin,
  FileText,
  Loader2,
} from "lucide-react";
import { HackerRankIcon } from "@/components/ui/BrandIcons";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profileData.socials.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
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
        setFormData({ name: "", email: "", message: "" });
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error connecting to API. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-background">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 light:bg-cyan-50 border border-cyan-500/20 light:border-cyan-200 text-cyan-400 light:text-cyan-700 text-xs font-mono uppercase tracking-wider font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-400 light:text-slate-600 max-w-2xl text-base sm:text-lg font-light">
            Open to software development opportunities, internship inquiries, and technical collaboration.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-md space-y-6 light:shadow-md">
              <h3 className="text-lg font-bold text-white light:text-slate-900">Contact Information</h3>

              {/* Email Box */}
              <div className="p-4 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/10 light:border-slate-200 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-slate-400 light:text-slate-500 uppercase flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-600" />
                    <span>Public Email</span>
                  </div>
                  <div className="text-sm font-semibold text-white light:text-slate-900 truncate font-mono mt-1">
                    {profileData.socials.email}
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-white/5 light:bg-white hover:bg-white/10 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 border border-white/10 light:border-slate-200 light:shadow-sm transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Box */}
              <div className="p-4 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/10 light:border-slate-200 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-slate-400 light:text-slate-500 uppercase flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-cyan-400 light:text-cyan-600" />
                    <span>Public Phone</span>
                  </div>
                  <div className="text-sm font-semibold text-white light:text-slate-900 truncate font-mono mt-1">
                    {profileData.socials.phone}
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2.5 rounded-lg bg-white/5 light:bg-white hover:bg-white/10 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-cyan-400 light:hover:text-cyan-600 border border-white/10 light:border-slate-200 light:shadow-sm transition-colors shrink-0 cursor-pointer"
                  title="Copy phone number to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social Profiles */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-slate-400 light:text-slate-600 uppercase font-semibold">
                  Confirmed Profiles &amp; Resume
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] light:bg-slate-50 hover:bg-white/5 light:hover:bg-slate-100 border border-white/10 light:border-slate-200 hover:border-cyan-500/30 text-xs font-mono text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black flex items-center gap-2 transition-all light:shadow-sm"
                  >
                    <Github className="w-4 h-4 text-slate-400 light:text-slate-600" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] light:bg-slate-50 hover:bg-white/5 light:hover:bg-slate-100 border border-white/10 light:border-slate-200 hover:border-cyan-500/30 text-xs font-mono text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black flex items-center gap-2 transition-all light:shadow-sm"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profileData.socials.hackerrank}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] light:bg-slate-50 hover:bg-white/5 light:hover:bg-slate-100 border border-white/10 light:border-slate-200 hover:border-cyan-500/30 text-xs font-mono text-slate-300 light:text-slate-700 hover:text-white light:hover:text-black flex items-center gap-2 transition-all light:shadow-sm"
                  >
                    <HackerRankIcon className="w-4 h-4 text-emerald-400" />
                    <span>HackerRank</span>
                  </a>

                  <a
                    href={profileData.resume.url}
                    download={profileData.resume.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] light:bg-slate-50 hover:bg-white/5 light:hover:bg-slate-100 border border-white/10 light:border-slate-200 hover:border-cyan-500/30 text-xs font-mono text-cyan-300 light:text-cyan-800 hover:text-cyan-200 light:hover:text-cyan-900 flex items-center gap-2 transition-all light:shadow-sm font-semibold"
                  >
                    <FileText className="w-4 h-4 text-cyan-400 light:text-cyan-600" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-md space-y-6 light:shadow-md"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/5 light:border-slate-200">
                <span className="text-sm font-semibold text-white light:text-slate-900">Send Direct Message</span>
                <span className="text-[11px] font-mono text-cyan-400 light:text-cyan-800 bg-cyan-950/60 light:bg-cyan-50 px-2 py-0.5 rounded border border-cyan-800/40 light:border-cyan-200 font-semibold">
                  MongoDB Atlas Connected
                </span>
              </div>

              {/* Status Notifications */}
              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-950/40 light:bg-emerald-50 border border-emerald-500/40 light:border-emerald-300 text-emerald-200 light:text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 light:text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white light:text-emerald-950">Message successfully received!</div>
                    <div>Thank you for reaching out. I will review and reply to your inquiry shortly.</div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-rose-950/40 light:bg-rose-50 border border-rose-500/40 light:border-rose-300 text-rose-200 light:text-rose-900 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 light:text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white light:text-rose-950">Submission Error</div>
                    <div>{errorMessage}</div>
                  </div>
                </div>
              )}

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 light:text-slate-700 font-medium">
                    Your Name <span className="text-cyan-400 light:text-cyan-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 light:bg-white border border-white/10 light:border-slate-300 text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm light:shadow-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 light:text-slate-700 font-medium">
                    Your Email <span className="text-cyan-400 light:text-cyan-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 light:bg-white border border-white/10 light:border-slate-300 text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm light:shadow-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 light:text-slate-700 font-medium">
                    Message <span className="text-cyan-400 light:text-cyan-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message, project inquiry, or internship opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 light:bg-white border border-white/10 light:border-slate-300 text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-sm light:shadow-sm transition-all resize-none"
                  />
                </div>
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
                    <span>Sending Message...</span>
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
