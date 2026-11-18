"use client";

import { useState, useRef, useEffect } from "react";
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
  ShieldCheck,
} from "lucide-react";
import { HackerRankIcon } from "@/components/ui/BrandIcons";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Honeypot field (invisible to real human users)
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Spam mitigation: track form mount timestamp
  const formMountedAt = useRef<number>(Date.now());
  const lastSubmittedHash = useRef<{ text: string; time: number } | null>(null);

  useEffect(() => {
    formMountedAt.current = Date.now();
  }, []);

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
    setErrorMessage("");

    // 1. Honeypot check
    if (honeypot.trim().length > 0) {
      // Silently pretend success to fool automated scrapers
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    // 2. Client-side timing check (bot speed detection)
    const elapsed = Date.now() - formMountedAt.current;
    if (elapsed < 2000) {
      setStatus("error");
      setErrorMessage("Submission was too fast. Please take a moment to review your message.");
      return;
    }

    // 3. Strict RFC email format check
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address (e.g., name@example.com).");
      return;
    }

    // 4. Message length check
    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a more descriptive message (at least 10 characters).");
      return;
    }

    // 5. Duplicate submission prevention
    const messageFingerprint = `${formData.email.trim().toLowerCase()}_${formData.message.trim()}`;
    if (
      lastSubmittedHash.current &&
      lastSubmittedHash.current.text === messageFingerprint &&
      Date.now() - lastSubmittedHash.current.time < 60000
    ) {
      setStatus("error");
      setErrorMessage("You have already submitted this exact message. Please wait a minute before sending again.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website: honeypot, // Honeypot parameter
          _elapsed: elapsed,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      } else {
        setStatus("success");
        lastSubmittedHash.current = {
          text: messageFingerprint,
          time: Date.now(),
        };
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 light:bg-[#702B40]/10 border border-cyan-500/20 light:border-[#702B40]/25 text-cyan-400 light:text-[#702B40] text-xs font-mono uppercase tracking-wider font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white light:text-[#252B29] tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-400 light:text-[#4A5551] max-w-2xl text-base sm:text-lg font-light">
            Open to software development opportunities, internship inquiries, and technical collaboration.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 backdrop-blur-md space-y-6 light:shadow-md">
              <h3 className="text-lg font-bold text-white light:text-[#252B29]">Contact Information</h3>

              {/* Email Box */}
              <div className="p-4 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-slate-400 light:text-[#5C6764] uppercase flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
                    <span>Public Email</span>
                  </div>
                  <div className="text-sm font-semibold text-white light:text-[#252B29] truncate font-mono mt-1">
                    {profileData.socials.email}
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-white/5 light:bg-[#FAF7F2] hover:bg-white/10 light:hover:bg-[#F5F0E6] text-slate-300 light:text-[#252B29] hover:text-cyan-400 light:hover:text-[#702B40] border border-white/10 light:border-[#89958B]/40 light:shadow-sm transition-colors shrink-0 cursor-pointer"
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
              <div className="p-4 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] border border-white/10 light:border-[#89958B]/30 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-slate-400 light:text-[#5C6764] uppercase flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40]" />
                    <span>Direct Telephone</span>
                  </div>
                  <div className="text-sm font-semibold text-white light:text-[#252B29] truncate font-mono mt-1">
                    {profileData.socials.phone}
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2.5 rounded-lg bg-white/5 light:bg-[#FAF7F2] hover:bg-white/10 light:hover:bg-[#F5F0E6] text-slate-300 light:text-[#252B29] hover:text-cyan-400 light:hover:text-[#702B40] border border-white/10 light:border-[#89958B]/40 light:shadow-sm transition-colors shrink-0 cursor-pointer"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Direct Social Links */}
              <div className="pt-2 border-t border-white/10 light:border-[#89958B]/25 space-y-3">
                <div className="text-xs font-mono text-slate-400 light:text-[#5C6764] uppercase font-semibold">
                  Professional Profiles &amp; CV
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] hover:bg-white/5 light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/30 hover:border-cyan-500/30 light:hover:border-[#702B40]/40 text-xs font-mono text-slate-300 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] flex items-center gap-2 transition-all light:shadow-sm"
                  >
                    <Github className="w-4 h-4 text-cyan-400 light:text-[#702B40]" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] hover:bg-white/5 light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/30 hover:border-cyan-500/30 light:hover:border-[#702B40]/40 text-xs font-mono text-slate-300 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] flex items-center gap-2 transition-all light:shadow-sm"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-400 light:text-[#702B40]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profileData.socials.hackerrank}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] hover:bg-white/5 light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/30 hover:border-emerald-500/30 light:hover:border-[#702B40]/40 text-xs font-mono text-slate-300 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] flex items-center gap-2 transition-all light:shadow-sm"
                  >
                    <HackerRankIcon className="w-4 h-4 text-emerald-400 light:text-[#702B40]" />
                    <span>HackerRank</span>
                  </a>

                  <a
                    href={profileData.resume.url}
                    download={profileData.resume.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] light:bg-[#F5F0E6] hover:bg-white/5 light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#702B40]/30 hover:border-cyan-500/30 light:hover:border-[#702B40] text-xs font-mono text-cyan-300 light:text-[#702B40] hover:text-cyan-200 flex items-center gap-2 transition-all light:shadow-sm font-semibold"
                  >
                    <FileText className="w-4 h-4 text-cyan-400 light:text-[#702B40]" />
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
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 backdrop-blur-md space-y-6 light:shadow-md"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/5 light:border-[#89958B]/20">
                <span className="text-sm font-semibold text-white light:text-[#252B29]">Send Direct Message</span>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 light:text-[#2E5E44]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Spam-Protected &amp; Encrypted</span>
                </div>
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
                <div className="p-4 rounded-xl bg-rose-950/40 light:bg-rose-50 border border-rose-500/40 light:border-rose-300 text-rose-200 light:text-rose-900 text-xs sm:text-sm flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-400 light:text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white light:text-rose-950">Submission Error</div>
                      <div className="text-rose-200/90 light:text-rose-900/90 mt-0.5">{errorMessage}</div>
                    </div>
                  </div>
                  <a
                    href={`mailto:${profileData.socials.email}?subject=${encodeURIComponent(
                      `Inquiry from ${formData.name || "Portfolio Visitor"}`
                    )}&body=${encodeURIComponent(formData.message || "")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 light:text-rose-900 border border-rose-500/40 text-xs font-mono shrink-0 transition-colors cursor-pointer self-start sm:self-auto"
                    title="Send your message directly via email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Email Directly</span>
                  </a>
                </div>
              )}

              {/* Hidden Honeypot Input for Bot Trap */}
              <div aria-hidden="true" style={{ display: "none", opacity: 0, position: "absolute", left: "-9999px" }}>
                <label htmlFor="form_website_hp">Leave this field blank</label>
                <input
                  id="form_website_hp"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 light:text-[#252B29] font-medium">
                    Your Name <span className="text-cyan-400 light:text-[#702B40]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/40 text-white light:text-[#252B29] placeholder-slate-500 light:placeholder-[#89958B] focus:outline-none focus:border-cyan-400 light:focus:border-[#702B40] focus:ring-1 focus:ring-cyan-400/50 light:focus:ring-[#702B40]/30 text-sm light:shadow-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 light:text-[#252B29] font-medium">
                    Your Email <span className="text-cyan-400 light:text-[#702B40]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address (e.g. name@example.com)"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/40 text-white light:text-[#252B29] placeholder-slate-500 light:placeholder-[#89958B] focus:outline-none focus:border-cyan-400 light:focus:border-[#702B40] focus:ring-1 focus:ring-cyan-400/50 light:focus:ring-[#702B40]/30 text-sm light:shadow-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 light:text-[#252B29] font-medium">
                      Message <span className="text-cyan-400 light:text-[#702B40]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-400 light:text-[#5C6764]">
                      {formData.message.length} / 5000
                    </span>
                  </div>
                  <textarea
                    required
                    rows={6}
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message, project inquiry, or internship opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/40 text-white light:text-[#252B29] placeholder-slate-500 light:placeholder-[#89958B] focus:outline-none focus:border-cyan-400 light:focus:border-[#702B40] focus:ring-1 focus:ring-cyan-400/50 light:focus:ring-[#702B40]/30 text-sm light:shadow-sm transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 light:from-[#702B40] light:to-[#551E2E] hover:from-cyan-400 hover:to-blue-500 light:hover:from-[#5E2234] light:hover:to-[#451724] disabled:opacity-50 text-black light:text-[#FAF7F2] font-semibold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] light:shadow-lg light:shadow-[#702B40]/25 flex items-center justify-center gap-2 cursor-pointer"
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