"use client";

import { useState } from "react";
import { Preloader } from "@/components/animations/Preloader";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { EducationSection } from "@/components/education/EducationSection";
import { AchievementsSection } from "@/components/achievements/AchievementsSection";
import { GithubCalendar } from "@/components/github/GithubCalendar";
import { ContactSection } from "@/components/contact/ContactSection";

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {/* High-Tech Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Main Content Flow */}
      <div className={`transition-opacity duration-700 ${preloaderDone ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        <About />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <GithubCalendar />
        <ContactSection />
      </div>
    </>
  );
}
