export interface Profile {
  name: string;
  pronouns?: string;
  initials: string;
  role: string;
  headline: string;
  shortBio: string;
  about: {
    introduction: string;
    developmentInterests: string[];
    technicalInterests: string[];
    careerObjectives: string;
    personalPhilosophy: string;
  };
  availability: {
    status: string;
    isOpen: boolean;
    location: string;
    timezone: string;
  };
  resume: {
    url: string;
    filename: string;
    updatedDate: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    discord?: string;
  };
  metrics: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  technologiesTicker: string[];
}

export const profileData: Profile = {
  name: "Alex River",
  pronouns: "they/them",
  initials: "AR",
  role: "Full-Stack Engineer & Creative Technologist",
  headline: "Architecting resilient distributed systems and crafting immersive, fluid digital experiences.",
  shortBio:
    "Engineering robust web applications with a focus on modern TypeScript, reactive frontend architectures, and high-performance services. Passionate about developer tooling, interactive physics, and clean system design.",
  about: {
    introduction:
      "Hello! I am a full-stack developer focused on building scalable, reliable, and delightful software solutions. With an analytical mindset and a strong aesthetic eye, I bridge the gap between rigorous systems programming and expressive interaction design.",
    developmentInterests: [
      "Modern Web Architecture & Server Components",
      "Interactive 2D/3D Canvas & Physics Systems",
      "Resilient Microservices & API Design",
      "Developer Experience & Tooling Automation",
      "Accessibility & Cross-Platform Performance",
    ],
    technicalInterests: [
      "Type-safe End-to-End Applications",
      "Cloud Infrastructure & Containerization",
      "Database Optimization & Caching Strategies",
      "Physics Engines (Matter.js) & Web Animations",
      "Reactive State Management & Functional Patterns",
    ],
    careerObjectives:
      "To design and deliver world-class digital products within an innovative engineering organization. I aim to take ownership of complex technical challenges, mentor peers, and continually elevate engineering standards.",
    personalPhilosophy:
      "Code is written for humans first and machines second. Every line of code should be intentional, observable, and built to withstand the test of evolving requirements without sacrificing user empathy.",
  },
  availability: {
    status: "Available for select opportunities",
    isOpen: true,
    location: "San Francisco, CA (Open to Remote)",
    timezone: "PST / UTC-8",
  },
  resume: {
    url: "#resume",
    filename: "Alex_River_Software_Engineer_Resume.pdf",
    updatedDate: "Updated Q1 2026",
  },
  socials: {
    github: "https://github.com/placeholder-developer",
    linkedin: "https://linkedin.com/in/placeholder-developer",
    twitter: "https://x.com/placeholder_dev",
    email: "alex.river.dev@example.com",
    discord: "https://discord.com/users/placeholder",
  },
  metrics: [
    {
      label: "Years of Experience",
      value: "4+",
      description: "Building production web applications",
    },
    {
      label: "Projects Completed",
      value: "25+",
      description: "From architecture to deployment",
    },
    {
      label: "Code Commits",
      value: "2,400+",
      description: "Across public & private repositories",
    },
    {
      label: "Code Quality & Uptime",
      value: "99.9%",
      description: "Test-driven development standard",
    },
  ],
  technologiesTicker: [
    "TypeScript",
    "Next.js",
    "React 19",
    "Tailwind CSS",
    "Node.js",
    "Go",
    "PostgreSQL",
    "GraphQL",
    "Redis",
    "Docker",
    "Matter.js",
    "GSAP",
    "Framer Motion",
    "Python",
    "Prisma",
    "AWS",
  ],
};
