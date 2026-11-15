export interface ExperienceItem {
  id: string;
  type: "Full-time" | "Contract" | "Internship" | "Open Source";
  role: string;
  organization: string;
  department?: string;
  location: string;
  duration: string;
  period: {
    start: string;
    end: string | "Present";
  };
  summary: string;
  responsibilities: string[];
  technicalContributions: string[];
  skillsGained: string[];
  companyUrl?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-senior-eng",
    type: "Full-time",
    role: "Senior Software Engineer",
    organization: "Tech Innovators Corp [Placeholder Company]",
    department: "Core Platform Architecture",
    location: "San Francisco, CA (Hybrid)",
    duration: "2024 — Present",
    period: {
      start: "Jan 2024",
      end: "Present",
    },
    summary:
      "Leading architecture and implementation of scalable customer-facing web platforms and real-time data streaming pipelines.",
    responsibilities: [
      "Drive frontend and backend system designs for high-throughput distributed applications.",
      "Mentor mid-level and junior engineers through thorough code reviews and technical design docs.",
      "Collaborate closely with product managers and UX designers to establish unified component systems.",
    ],
    technicalContributions: [
      "Migrated monolithic frontend codebase to Next.js App Router, cutting cold page load times by 42%.",
      "Designed and deployed asynchronous event processing workers using Go and Redis Pub/Sub.",
      "Introduced end-to-end automated testing pipelines with Playwright, decreasing production regression bugs by 35%.",
    ],
    skillsGained: [
      "Distributed Systems",
      "Next.js App Router",
      "System Architecture",
      "Redis Caching",
      "Engineering Leadership",
    ],
    companyUrl: "https://example.com/company-placeholder",
  },
  {
    id: "exp-software-eng",
    type: "Full-time",
    role: "Full-Stack Software Engineer",
    organization: "Nexus Digital Labs [Placeholder Company]",
    department: "Product Engineering",
    location: "New York, NY (Remote)",
    duration: "2022 — 2024",
    period: {
      start: "Jun 2022",
      end: "Dec 2023",
    },
    summary:
      "Developed interactive SaaS dashboards, GraphQL APIs, and reliable database transaction flows for enterprise clients.",
    responsibilities: [
      "Engineered responsive, accessible user interfaces following WCAG 2.1 AA compliance standards.",
      "Maintained PostgreSQL schemas and authored complex migration scripts with Prisma ORM.",
      "Implemented OAuth2 and single sign-on (SSO) authentication flows for enterprise accounts.",
    ],
    technicalContributions: [
      "Constructed a reusable design system in Tailwind CSS and Storybook used across 6 internal web applications.",
      "Optimized slow SQL queries with proper composite indexing and connection pooling, boosting query speed by 60%.",
      "Integrated automated Docker build stages in GitHub Actions to streamline staging deployments.",
    ],
    skillsGained: [
      "React Ecosystem",
      "TypeScript",
      "PostgreSQL & Prisma",
      "GraphQL",
      "CI/CD Automation",
      "Docker",
    ],
    companyUrl: "https://example.com/company-placeholder",
  },
  {
    id: "exp-intern",
    type: "Internship",
    role: "Software Engineering Intern",
    organization: "Apex Solutions Inc. [Placeholder Company]",
    department: "Cloud Services Group",
    location: "Austin, TX",
    duration: "Summer 2021",
    period: {
      start: "May 2021",
      end: "Aug 2021",
    },
    summary:
      "Gained hands-on experience building REST microservices, automated CLI scripts, and cloud deployment pipelines.",
    responsibilities: [
      "Assisted senior engineers in developing and debugging RESTful endpoints using Node.js and Express.",
      "Participated in daily agile standups, sprint retrospectives, and cross-functional planning sessions.",
      "Authored unit and integration tests using Jest to maintain code coverage standards above 85%.",
    ],
    technicalContributions: [
      "Built an internal dashboard to monitor AWS CloudWatch server alarms and send Slack alerts.",
      "Automated database seeding scripts that saved developers ~20 minutes during local dev onboarding.",
    ],
    skillsGained: [
      "Node.js & Express",
      "RESTful API Design",
      "Jest Unit Testing",
      "Git Team Workflows",
      "Cloud Infrastructure Basics",
    ],
    companyUrl: "https://example.com/company-placeholder",
  },
];
