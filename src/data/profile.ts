export interface Profile {
  name: string;
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
  };
  resume: {
    url: string;
    filename: string;
    updatedDate: string;
  };
  socials: {
    github: string;
    linkedin: string;
    hackerrank: string;
    email: string;
    phone: string;
  };
  metrics: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  technologiesTicker: string[];
}

export const profileData: Profile = {
  name: "VISHNU V",
  initials: "VV",
  role: "Aspiring Software Developer",
  headline: "Passionate about software development, problem-solving and building innovative technology solutions.",
  shortBio:
    "I am a Computer Science and Business Systems undergraduate with a strong interest in software engineering, problem-solving and technology-driven innovation. Open to internships.",
  about: {
    introduction:
      "I am a Computer Science and Business Systems undergraduate with a strong interest in software engineering, problem-solving and technology-driven innovation. I enjoy developing practical applications, exploring emerging technologies and transforming ideas into meaningful solutions. Through projects in healthcare and e-governance, technical competitions, and engineering innovation concepts, I continuously work to strengthen my technical abilities and development experience. My involvement in innovation projects, including FlowVault and RESQTRAK, reflects my interest in exploring practical solutions to real-world challenges. My goal is to grow as a software developer and contribute to impactful technology solutions.",
    developmentInterests: [
      "Software Engineering & Web Application Development",
      "Problem-Solving & Core Data Structures",
      "Generative AI Integration into Practical Systems",
      "Healthcare and E-Governance Platforms",
      "Technology-Driven Business Solutions",
    ],
    technicalInterests: [
      "Object-Oriented Programming (Java & C)",
      "Web Technologies (React & Node.js)",
      "Relational Database Management (MySQL)",
      "Version Control Workflows (Git & GitHub)",
      "Engineering Innovation & Embedded Systems",
    ],
    careerObjectives:
      "My goal is to grow as a software developer, strengthen my engineering and problem-solving abilities, and contribute to impactful technology solutions in forward-thinking teams.",
    personalPhilosophy:
      "Transforming ideas into practical solutions by combining rigorous software problem-solving with technology-driven innovation to address real-world challenges.",
  },
  availability: {
    status: "Open to internships",
    isOpen: true,
  },
  resume: {
    url: "/resume.pdf",
    filename: "Vishnu_V_Resume.pdf",
    updatedDate: "Configurable PDF",
  },
  socials: {
    github: "https://github.com/vishnuvenkatraj",
    linkedin: "https://linkedin.com/in/vishnu-v-5aaa93350",
    hackerrank: "https://www.hackerrank.com/profile/vishnuvenkatraj",
    email: "vishnuvenkatraj@gmail.com",
    phone: "+91 74185 63738",
  },
  metrics: [
    {
      label: "Academic CGPA",
      value: "8.10 / 10",
      description: "B.Tech CSBS (up to 4th Semester)",
    },
    {
      label: "Projects & Concepts",
      value: "4 Projects",
      description: "MediConnect, CivicConnect, FlowVault, RESQTRAK",
    },
    {
      label: "Awards & Honors",
      value: "3 Awards",
      description: "Innoverse 1st, Gencraft 3rd, Dr. Kalam Award",
    },
    {
      label: "Hackathon Track",
      value: "3 Hackathons",
      description: "24-Hour Competitive Development Events",
    },
  ],
  technologiesTicker: [
    "Java",
    "C",
    "React",
    "Node.js",
    "MySQL",
    "Git",
    "GitHub",
    "Generative AI",
    "Object-Oriented Programming",
    "Data Structures",
    "HTML",
    "CSS",
    "Business Analytics",
    "Business Systems",
  ],
};
