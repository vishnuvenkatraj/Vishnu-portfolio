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
  return (
    <main className="relative">
      <Hero />
      <About />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <AchievementsSection />
      <GithubCalendar />
      <ContactSection />
    </main>
  );
}
