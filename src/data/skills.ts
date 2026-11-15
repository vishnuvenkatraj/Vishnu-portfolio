export type SkillCategory =
  | "Programming"
  | "Web"
  | "Database"
  | "DevTools"
  | "AI"
  | "Business";

export type SkillLevel =
  | "Comfortable"
  | "Familiar"
  | "Currently Learning"
  | "Domain Interest";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  level: SkillLevel;
  description: string;
  iconName: string;
  featuredInSandbox?: boolean;
  color: string;
}

export const SKILL_CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: "Programming", label: "Programming & Core Concepts" },
  { id: "Web", label: "Web Technologies" },
  { id: "Database", label: "Database" },
  { id: "DevTools", label: "Development Tools" },
  { id: "AI", label: "AI Integration" },
  { id: "Business", label: "Business & Domain Interests" },
];

export const skillsData: SkillItem[] = [
  // Programming and Core Concepts
  {
    id: "java",
    name: "Java",
    category: "Programming",
    categoryLabel: "Programming & Core Concepts",
    level: "Comfortable",
    description: "Core Java programming, object-oriented concepts, inheritance, polymorphism, and application logic.",
    iconName: "Code2",
    featuredInSandbox: true,
    color: "#e76f00",
  },
  {
    id: "c-lang",
    name: "C",
    category: "Programming",
    categoryLabel: "Programming & Core Concepts",
    level: "Comfortable",
    description: "Procedural programming, memory structures, pointers, functions, and embedded microcontroller basics.",
    iconName: "Cpu",
    featuredInSandbox: true,
    color: "#00599c",
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "Programming",
    categoryLabel: "Programming & Core Concepts",
    level: "Currently Learning",
    description: "Currently studying fundamental data structures, arrays, linked lists, stacks, queues, and sorting algorithms.",
    iconName: "Binary",
    featuredInSandbox: true,
    color: "#8b5cf6",
  },
  {
    id: "oop",
    name: "Object-Oriented Programming",
    category: "Programming",
    categoryLabel: "Programming & Core Concepts",
    level: "Comfortable",
    description: "Class hierarchies, encapsulation, abstraction, interfaces, code modularity, and reusable design.",
    iconName: "ShieldCheck",
    featuredInSandbox: true,
    color: "#06b6d4",
  },

  // Web Technologies
  {
    id: "html",
    name: "HTML",
    category: "Web",
    categoryLabel: "Web Technologies",
    level: "Familiar",
    description: "Semantic page structures, responsive layouts, forms, and web document markup.",
    iconName: "Layout",
    featuredInSandbox: true,
    color: "#e34f26",
  },
  {
    id: "css",
    name: "CSS",
    category: "Web",
    categoryLabel: "Web Technologies",
    level: "Familiar",
    description: "Styling, box model, Flexbox, responsive design, and clean user interface aesthetics.",
    iconName: "Palette",
    featuredInSandbox: true,
    color: "#264de4",
  },
  {
    id: "react",
    name: "React",
    category: "Web",
    categoryLabel: "Web Technologies",
    level: "Familiar",
    description: "Component-based architecture, state and props management, user interface rendering, and hooks.",
    iconName: "Component",
    featuredInSandbox: true,
    color: "#61dafb",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Web",
    categoryLabel: "Web Technologies",
    level: "Familiar",
    description: "Server-side JavaScript runtime, backend logic, and application workflows.",
    iconName: "Server",
    featuredInSandbox: true,
    color: "#339933",
  },

  // Database
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    categoryLabel: "Database",
    level: "Comfortable",
    description: "Relational database design, table schemas, SQL queries, joins, and data persistence.",
    iconName: "Database",
    featuredInSandbox: true,
    color: "#00758f",
  },

  // Development Tools
  {
    id: "git",
    name: "Git",
    category: "DevTools",
    categoryLabel: "Development Tools",
    level: "Comfortable",
    description: "Version control fundamentals, commits, branching, merging, and local repository tracking.",
    iconName: "GitBranch",
    featuredInSandbox: true,
    color: "#f05032",
  },
  {
    id: "github",
    name: "GitHub",
    category: "DevTools",
    categoryLabel: "Development Tools",
    level: "Comfortable",
    description: "Remote code hosting, repository management, collaborative workflows, and project releases.",
    iconName: "Boxes",
    featuredInSandbox: true,
    color: "#ffffff",
  },

  // AI Integration
  {
    id: "genai",
    name: "Generative AI Integration",
    category: "AI",
    categoryLabel: "AI Integration",
    level: "Comfortable",
    description: "Integrating generative AI capabilities into practical applications for symptom analysis, assistance, and issue detection.",
    iconName: "Sparkles",
    featuredInSandbox: true,
    color: "#00f2fe",
  },

  // Business and Domain Interests
  {
    id: "biz-analytics",
    name: "Business Analytics",
    category: "Business",
    categoryLabel: "Business & Domain Interests",
    level: "Domain Interest",
    description: "Analyzing business data to extract actionable insights, evaluate performance, and optimize processes.",
    iconName: "Table",
    featuredInSandbox: false,
    color: "#10b981",
  },
  {
    id: "biz-systems",
    name: "Business Systems",
    category: "Business",
    categoryLabel: "Business & Domain Interests",
    level: "Domain Interest",
    description: "Studying interlinked business processes, organizational systems, and enterprise technology workflows.",
    iconName: "Layers",
    featuredInSandbox: false,
    color: "#6366f1",
  },
  {
    id: "tech-biz-solutions",
    name: "Technology-driven Business Solutions",
    category: "Business",
    categoryLabel: "Business & Domain Interests",
    level: "Domain Interest",
    description: "Applying software engineering and practical technological tools to solve real-world organizational challenges.",
    iconName: "Workflow",
    featuredInSandbox: false,
    color: "#ec4899",
  },
];
