"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import { profileData } from "@/data/profile";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030712] light:bg-[#F5F0E6] text-slate-200 light:text-[#252B29] py-6 sm:py-8 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/30 light:selection:bg-[#702B40]/20 selection:text-cyan-200 light:selection:text-[#702B40] print:bg-white print:text-black print:p-0 print:m-0 transition-colors duration-300">
      {/* Top Floating Control Bar (Hidden during print) */}
      <div className="sticky top-4 z-40 max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-[#0a0f1d]/90 light:bg-[#FAF7F2]/90 backdrop-blur-md border border-white/10 light:border-[#89958B]/35 shadow-2xl print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 light:bg-[#F5F0E6] light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 hover:border-cyan-500/40 light:hover:border-[#702B40]/50 text-sm font-medium text-slate-200 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 light:text-[#702B40]" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 light:bg-[#F5F0E6] light:hover:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 hover:border-cyan-500/40 light:hover:border-[#702B40]/50 text-sm font-medium text-slate-200 light:text-[#252B29] hover:text-white light:hover:text-[#702B40] transition-all cursor-pointer shadow-sm active:scale-95"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4 text-cyan-400 light:text-[#702B40]" />
            <span>Print</span>
          </button>

          <a
            href={profileData.resume.url}
            download={profileData.resume.filename}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 light:from-[#702B40] light:to-[#551E2E] hover:from-cyan-400 hover:to-blue-500 text-black light:text-[#FAF7F2] text-sm font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] light:shadow-lg light:shadow-[#702B40]/25 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <main className="max-w-4xl mx-auto bg-[#0a0f1d] light:bg-[#FAF7F2] border border-white/10 light:border-[#89958B]/35 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print:rounded-none">
        {/* Header */}
        <header className="border-b border-white/10 light:border-[#89958B]/25 pb-6 print:border-slate-800 print:pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-[#252B29] print:text-black">
                  {profileData.name}
                </h1>
                <span className="text-xs font-mono text-cyan-400 light:text-[#702B40] font-semibold print:text-slate-700">
                  {profileData.role}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 light:text-[#5C6764] print:text-slate-700 font-mono">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40] print:text-black" />
                  <span>{profileData.socials.phone}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40] print:text-black" />
                  <a
                    href={`mailto:${profileData.socials.email}`}
                    className="hover:text-cyan-300 light:hover:text-[#702B40] print:text-black"
                  >
                    {profileData.socials.email}
                  </a>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 light:text-[#702B40] print:text-black" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cyan-400 light:text-[#702B40] print:text-blue-700 font-mono">
                <div className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" />
                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    linkedin.com/in/vishnu-v-5aaa93350
                  </a>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" />
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    github.com/vishnuvenkatraj
                  </a>
                </div>
              </div>
            </div>

            {/* Passport Photo */}
            <div className="shrink-0">
              <div
                className="w-20 sm:w-24 rounded-xl overflow-hidden border-2 border-white/20 light:border-[#89958B]/40 shadow-md bg-slate-900 light:bg-[#F5F0E6] print:border-slate-400"
                style={{ aspectRatio: "803 / 1024" }}
                title="Passport Photo"
              >
                <Image
                  src={profileData.photo.url}
                  alt={profileData.photo.alt}
                  width={803}
                  height={1024}
                  className="w-full h-full object-cover object-top"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="mt-6 space-y-6 text-sm leading-relaxed">
          {/* CAREER SUMMARY */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 light:text-[#702B40] print:text-slate-900 border-b border-cyan-500/20 light:border-[#89958B]/25 print:border-slate-300 pb-1 mb-2 font-mono">
              Career Summary
            </h2>
            <p className="text-slate-300 light:text-[#4A5551] print:text-slate-800 text-xs sm:text-sm leading-relaxed">
              B.Tech Computer Science and Business Systems student with experience in
              developing software projects across healthcare, e-governance, and
              agriculture. Skilled in Java, C, Data Structures &amp; Algorithms, and
              Object-Oriented Programming, with exposure to AI-integrated
              applications and web technologies. Completed an embedded systems
              internship and actively participated in hackathons and innovation events.
            </p>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 light:text-[#702B40] print:text-slate-900 border-b border-cyan-500/20 light:border-[#89958B]/25 print:border-slate-300 pb-1 mb-3 font-mono">
              Education
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-semibold text-white light:text-[#252B29] print:text-black text-sm">
                    B.Tech — Computer Science and Business Systems
                  </h3>
                  <span className="text-xs text-slate-400 light:text-[#5C6764] font-mono">
                    Karur, Tamil Nadu
                  </span>
                </div>
                <div className="flex justify-between items-baseline flex-wrap gap-1 text-xs text-slate-400 light:text-[#5C6764] print:text-slate-700">
                  <span>M. Kumarasamy College of Engineering</span>
                  <span>2024 – 2028</span>
                </div>
                <div className="text-xs font-mono text-cyan-300 light:text-[#702B40] print:text-blue-800 font-semibold mt-0.5">
                  CGPA: 8.10 / 10 (up to 4th Semester)
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-semibold text-white light:text-[#252B29] print:text-black text-sm">
                    Higher Secondary Certificate (HSC)
                  </h3>
                  <span className="text-xs text-slate-400 light:text-[#5C6764] font-mono">
                    Aruppukottai, Tamil Nadu
                  </span>
                </div>
                <div className="flex justify-between items-baseline flex-wrap gap-1 text-xs text-slate-400 light:text-[#5C6764] print:text-slate-700">
                  <span>SBK Higher Secondary School</span>
                  <span>2024</span>
                </div>
                <div className="text-xs font-mono text-slate-300 light:text-[#4A5551] print:text-slate-800 mt-0.5">
                  Percentage: 81.83%
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-semibold text-white light:text-[#252B29] print:text-black text-sm">
                    Secondary School Leaving Certificate (SSLC)
                  </h3>
                  <span className="text-xs text-slate-400 light:text-[#5C6764] font-mono">
                    Aruppukottai, Tamil Nadu
                  </span>
                </div>
                <div className="flex justify-between items-baseline flex-wrap gap-1 text-xs text-slate-400 light:text-[#5C6764] print:text-slate-700">
                  <span>SBK Higher Secondary School</span>
                  <span>2022</span>
                </div>
                <div className="text-xs font-mono text-slate-300 light:text-[#4A5551] print:text-slate-800 mt-0.5">
                  Percentage: 78.2%
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS & COMPETENCIES */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 light:text-[#702B40] print:text-slate-900 border-b border-cyan-500/20 light:border-[#89958B]/25 print:border-slate-300 pb-1 mb-3 font-mono">
              Skills &amp; Areas of Competency
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800">
              <div>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">
                  Technical Skills:{" "}
                </span>
                <span>Java, Data Structures &amp; Algorithms, Object-Oriented Programming, C</span>
              </div>
              <div>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">
                  Tools &amp; Technologies:{" "}
                </span>
                <span>HTML &amp; CSS, Git &amp; GitHub, MySQL</span>
              </div>
              <div>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">
                  Areas of Interest:{" "}
                </span>
                <span>Database Management Systems, Business Analytics, Web Development, Software Engineering</span>
              </div>
              <div>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">
                  Soft Skills:{" "}
                </span>
                <span>Adaptability, Teamwork &amp; Collaboration, Time Management, Critical Thinking</span>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 light:text-[#702B40] print:text-slate-900 border-b border-cyan-500/20 light:border-[#89958B]/25 print:border-slate-300 pb-1 mb-3 font-mono">
              Projects
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-semibold text-white light:text-[#252B29] print:text-black text-sm">
                    AI-Powered Healthcare Management System (MediConnect)
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 light:text-[#702B40] print:text-slate-700 font-medium">
                    Frontend Engineer &amp; AI Integration Lead
                  </span>
                </div>
                <p className="text-xs italic text-slate-400 light:text-[#5C6764] mb-1">
                  Tech: React, Node.js, Generative AI (Gemini API), role-based authentication
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800">
                  <li>
                    Designed and built the frontend for a healthcare platform that digitizes clinical workflows with secure role-based access for doctors, staff, and patients.
                  </li>
                  <li>
                    Integrated Generative AI features for symptom analysis, medical assistance, and administrative insights, reducing manual triage effort.
                  </li>
                  <li>
                    Collaborated across frontend and AI-integration workstreams to ship a working end-to-end demo.
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-semibold text-white light:text-[#252B29] print:text-black text-sm">
                    CivicConnect — AI-Powered E-Governance Platform
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 light:text-[#702B40] print:text-slate-700 font-medium">
                    AI Integration Engineer
                  </span>
                </div>
                <p className="text-xs italic text-slate-400 light:text-[#5C6764] mb-1">
                  Tech: React, Google Gemini API, analytics/ML for issue classification
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800">
                  <li>
                    Built an AI-powered e-governance platform to manage public grievances across multiple districts.
                  </li>
                  <li>
                    Implemented analytics for duplicate-issue detection and SLA-risk prediction, helping prioritize urgent complaints.
                  </li>
                  <li>
                    Designed the UI/UX flow to make grievance submission and tracking simple for end users.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* PATENT PUBLICATION */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 light:text-[#702B40] print:text-slate-900 border-b border-cyan-500/20 light:border-[#89958B]/25 print:border-slate-300 pb-1 mb-3 font-mono">
              Patent Publication
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-white light:text-[#252B29] print:text-black text-sm">
                  FlowVault — Self-Reconfiguring Storm Drain
                </h3>
                <p className="text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800 mt-1">
                  Designed a passive hydraulic-mechanical storm-drain system that automatically redirects drainage from a severely clogged section to the next available section without electronics or external power.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h3 className="font-semibold text-white light:text-[#252B29] print:text-black text-sm">
                    RESQTRAK — Gas-Triggered Mechanical Auto-Extraction System
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400 light:text-[#702B40] font-semibold print:text-slate-700">
                    Published Patent (IPO #202641130488)
                  </span>
                </div>
                <p className="text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800 mt-1">
                  Published patent under the Indian Patent Office (Application No: 202641130488). Designed a passive H₂S-triggered rescue system converting toxic gas exposure into mechanical actuation for automatic confined-space worker retrieval without electrical ignition risk.
                </p>
                <div className="mt-1 print:hidden">
                  <a
                    href="https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 light:text-[#702B40] hover:underline"
                  >
                    <span>Verify in IPO Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* INTERNSHIP */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 light:text-[#702B40] print:text-slate-900 border-b border-cyan-500/20 light:border-[#89958B]/25 print:border-slate-300 pb-1 mb-2 font-mono">
              Internship
            </h2>
            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <h3 className="font-semibold text-white light:text-[#252B29] print:text-black text-sm">
                  Embedded Systems Intern — Crapersoft, Coimbatore
                </h3>
                <span className="text-xs text-slate-400 light:text-[#5C6764] font-mono">
                  May – Jun 2026
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800 mt-1.5">
                <li>
                  Worked hands-on with MPLAB IDE, PICkit3 Debugger, and Proteus for embedded systems development.
                </li>
                <li>
                  Gained practical experience in microcontroller programming, debugging, and circuit simulation.
                </li>
                <li>
                  Assisted in testing and validating embedded circuit designs before deployment.
                </li>
              </ul>
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 light:text-[#702B40] print:text-slate-900 border-b border-cyan-500/20 light:border-[#89958B]/25 print:border-slate-300 pb-1 mb-2 font-mono">
              Certifications
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800">
              <li>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">NPTEL</span> — Human Computer Interaction (12 Weeks) — <span className="text-cyan-300 light:text-[#702B40] print:text-slate-900 font-semibold">95%</span>
              </li>
              <li>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">NPTEL</span> — Software Testing (12 Weeks)
              </li>
            </ul>
          </section>

          {/* ACHIEVEMENTS & RECOGNITION */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 light:text-[#702B40] print:text-slate-900 border-b border-cyan-500/20 light:border-[#89958B]/25 print:border-slate-300 pb-1 mb-2 font-mono">
              Achievements &amp; Recognition
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800">
              <li>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">3rd Prize Winner</span> — Gencraft Appathon 2025
              </li>
              <li>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">1st Prize Winner</span> – Innoverse 2026
              </li>
              <li>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">Dr. Kalam Young Achiever Awards 2026</span> — World Youth Federation
              </li>
              <li>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">Hackathon Participant (24 Hours)</span> — Innovation Unbound (2026), MobilityX 2.0 (2025), Hackmatrix (2026)
              </li>
            </ul>
          </section>

          {/* LANGUAGES & HOBBIES */}
          <section className="border-t border-white/5 light:border-[#89958B]/20 print:border-slate-300 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 light:text-[#4A5551] print:text-slate-800">
              <div>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">Languages: </span>
                <span>Tamil (Read, Write, Speak) • English (Read, Write, Speak)</span>
              </div>
              <div>
                <span className="font-semibold text-white light:text-[#252B29] print:text-black">Hobbies: </span>
                <span>Listening to Music • Learning New Technologies</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
