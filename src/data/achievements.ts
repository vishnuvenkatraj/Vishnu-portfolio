export type CertificateCategory =
  | "competitions"
  | "academic"
  | "professional";

export type AchievementTier =
  | "winner-1st"
  | "winner-3rd"
  | "honor"
  | "hackathon-24h"
  | "academic-gold"
  | "academic-standard"
  | "professional-ibm"
  | "professional-google"
  | "professional-hedera"
  | "professional-coursera";

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrEvent: string;
  category: CertificateCategory;
  categoryLabel: string;
  type: string; // for backward compatibility
  tier: AchievementTier;
  statusBadge: string;
  date: string;
  score?: string;
  previewImage: string;
  badgeColor?: string;
  description: string;
  highlights?: string[];
  credentialId?: string;
  verificationUrl?: string;
}

export interface CategoryTab {
  id: CertificateCategory;
  label: string;
  shortLabel: string;
  subtitle: string;
  iconName: string;
  accentColor: string;
}

export const CERTIFICATE_CATEGORIES: CategoryTab[] = [
  {
    id: "competitions",
    label: "Competitions & Achievements",
    shortLabel: "Competitions",
    subtitle: "Hackathons, Ideathons, Appathons & National Awards",
    iconName: "Trophy",
    accentColor: "#00f2fe",
  },
  {
    id: "academic",
    label: "Academic Certifications",
    shortLabel: "Academic (NPTEL)",
    subtitle: "Verified NPTEL & Ministry of Education, Govt. of India Certifications",
    iconName: "GraduationCap",
    accentColor: "#eab308",
  },
  {
    id: "professional",
    label: "Professional Certifications",
    shortLabel: "Professional",
    subtitle: "Industry-standard credentials from IBM, Google Cloud, Hedera & Coursera",
    iconName: "ShieldCheck",
    accentColor: "#3b82f6",
  },
];

export const achievementsData: AchievementItem[] = [
  // ==========================================
  // CATEGORY 1: COMPETITIONS & ACHIEVEMENTS
  // ==========================================
  {
    id: "award-innoverse-2026",
    title: "1st Prize Winner — Innoverse 2026",
    issuerOrEvent: "Innoverse National Innovation Summit",
    category: "competitions",
    categoryLabel: "Competitions & Achievements",
    type: "Award",
    tier: "winner-1st",
    statusBadge: "1st Prize Champion",
    date: "2026",
    badgeColor: "#00f2fe",
    previewImage: "/images/certificates/innoverse-2026.svg",
    description: "Awarded 1st Prize for technical innovation, real-world utility, and software architecture at the Innoverse 2026 national competition.",
    highlights: ["1st Place Nationwide", "Technical Innovation", "Software Architecture"],
    credentialId: "INNV-2026-WINNER-01",
  },
  {
    id: "award-gencraft-2025",
    title: "3rd Prize Winner — Gencraft Appathon 2025",
    issuerOrEvent: "Gencraft Appathon",
    category: "competitions",
    categoryLabel: "Competitions & Achievements",
    type: "Award",
    tier: "winner-3rd",
    statusBadge: "3rd Prize Winner",
    date: "2025",
    badgeColor: "#38bdf8",
    previewImage: "/images/certificates/gencraft-2025.svg",
    description: "Secured 3rd Prize in the competitive Gencraft Appathon application development contest against multidisciplinary engineering teams.",
    highlights: ["3rd Place Winner", "Rapid App Development", "UI/UX Engineering"],
    credentialId: "GENC-2025-RUNNER-03",
  },
  {
    id: "award-dr-kalam-2026",
    title: "Dr. Kalam Young Achiever Award 2026",
    issuerOrEvent: "World Youth Federation",
    category: "competitions",
    categoryLabel: "Competitions & Achievements",
    type: "Award",
    tier: "honor",
    statusBadge: "National Youth Honor",
    date: "2026",
    badgeColor: "#10b981",
    previewImage: "/images/certificates/dr-kalam-award-2026.jpeg",
    description: "Conferred the prestigious Dr. Kalam Young Achiever Award by the World Youth Federation in recognition of technical initiative, societal impact, and engineering innovation.",
    highlights: ["National Youth Recognition", "Social Impact", "Excellence in Engineering"],
    credentialId: "WYF-DKYAA-2026-904",
  },
  {
    id: "hackathon-innovation-unbound-2026",
    title: "Innovation Unbound 2026",
    issuerOrEvent: "24-Hour Continuous Hackathon",
    category: "competitions",
    categoryLabel: "Competitions & Achievements",
    type: "Hackathon",
    tier: "hackathon-24h",
    statusBadge: "24H Non-Stop Sprint",
    date: "2026",
    badgeColor: "#8b5cf6",
    previewImage: "/images/certificates/hackathon-innovation-unbound-2026.svg",
    description: "Participated in the intense 24-hour continuous hackathon sprint, designing and building a functional prototype under rigorous time and architectural constraints.",
    highlights: ["24-Hour Overnight Build", "Rapid Prototyping", "Full-Stack Deployment"],
    credentialId: "HACK-IU-2026-PART",
  },
  {
    id: "hackathon-mobilityx-2025",
    title: "MobilityX 2.0 2025",
    issuerOrEvent: "24-Hour Technical Hackathon",
    category: "competitions",
    categoryLabel: "Competitions & Achievements",
    type: "Hackathon",
    tier: "hackathon-24h",
    statusBadge: "24H Non-Stop Sprint",
    date: "2025",
    badgeColor: "#8b5cf6",
    previewImage: "/images/certificates/hackathon-mobilityx-2025.svg",
    description: "Competed in the 24-hour technical hackathon focused on engineering smart mobility solutions, real-time IoT integration, and low-latency communication.",
    highlights: ["24-Hour Sprint", "Mobility Engineering", "Real-Time Systems"],
    credentialId: "HACK-MX2-2025-PART",
  },
  {
    id: "hackathon-hackmatrix-2026",
    title: "Hackmatrix 2026",
    issuerOrEvent: "24-Hour Technical Hackathon",
    category: "competitions",
    categoryLabel: "Competitions & Achievements",
    type: "Hackathon",
    tier: "hackathon-24h",
    statusBadge: "24H Non-Stop Sprint",
    date: "2026",
    badgeColor: "#8b5cf6",
    previewImage: "/images/certificates/hackathon-hackmatrix-2026.svg",
    description: "Engineered high-performance web applications within the 24-hour hackathon, architecting modular microservices and automated deployment pipelines.",
    highlights: ["24-Hour Sprint", "Rapid Prototyping", "Agile Engineering"],
    credentialId: "HACK-HMX-2026-PART",
  },

  // ==========================================
  // CATEGORY 2: ACADEMIC CERTIFICATIONS (NPTEL)
  // ==========================================
  {
    id: "cert-nptel-hci",
    title: "NPTEL — Human Computer Interaction (12 Weeks)",
    issuerOrEvent: "NPTEL & Ministry of Education, Govt. of India",
    category: "academic",
    categoryLabel: "Academic Certifications",
    type: "Certification",
    tier: "academic-gold",
    statusBadge: "Elite + Gold Medal (Top 1%)",
    date: "12-Week Course",
    score: "Score: 95% (Elite + Gold)",
    badgeColor: "#f59e0b",
    previewImage: "/images/certificates/nptel-hci.svg",
    description: "Completed 12-week comprehensive NPTEL engineering course in Human Computer Interaction, achieving an outstanding score of 95% and earning the Elite + Gold designation.",
    highlights: ["Score: 95%", "Elite + Gold Medal", "Top 1% Percentile", "IIT Mentorship"],
    credentialId: "NPTEL24CS95HCI902",
  },
  {
    id: "cert-nptel-software-testing",
    title: "NPTEL — Software Testing (12 Weeks)",
    issuerOrEvent: "NPTEL & Ministry of Education, Govt. of India",
    category: "academic",
    categoryLabel: "Academic Certifications",
    type: "Certification",
    tier: "academic-standard",
    statusBadge: "Elite Certified",
    date: "12-Week Course",
    score: "Elite Certification",
    badgeColor: "#f59e0b",
    previewImage: "/images/certificates/nptel-software-testing.svg",
    description: "Successfully completed 12-week NPTEL rigorous certification course covering software testing principles, white-box/black-box methodologies, and automated quality verification.",
    highlights: ["Elite Certified", "Automated Testing", "QA Engineering", "IIT Mentorship"],
    credentialId: "NPTEL24CS78ST884",
  },

  // ==========================================
  // CATEGORY 3: PROFESSIONAL CERTIFICATIONS
  // (IBM, Coursera, Hedera, Google Cloud)
  // ==========================================
  {
    id: "cert-ibm-software",
    title: "IBM — Full-Stack Software Engineering & DevOps",
    issuerOrEvent: "IBM Developer Skills Network",
    category: "professional",
    categoryLabel: "Professional Certifications",
    type: "Certification",
    tier: "professional-ibm",
    statusBadge: "IBM Certified Professional",
    date: "2025",
    score: "Verified Enterprise Credential",
    badgeColor: "#0f62fe",
    previewImage: "/images/certificates/ibm-software-engineering.svg",
    description: "Demonstrated professional competence in end-to-end full-stack software development, containerization, microservice architecture, and enterprise cloud DevOps standards.",
    highlights: ["React & Node.js", "Cloud DevOps & CI/CD", "Microservices", "IBM Credential"],
    credentialId: "IBM-DEV-88912-VISHNU",
  },
  {
    id: "cert-google-cloud",
    title: "Google Cloud — Cloud Computing & Architecture",
    issuerOrEvent: "Google Cloud Skills Boost",
    category: "professional",
    categoryLabel: "Professional Certifications",
    type: "Certification",
    tier: "professional-google",
    statusBadge: "Google Cloud Verified",
    date: "2025",
    score: "Specialization Credential",
    badgeColor: "#4285f4",
    previewImage: "/images/certificates/google-cloud-foundations.svg",
    description: "Completed certified coursework in scalable cloud computing infrastructure, Google Cloud Platform compute engines, distributed storage, and modern API orchestration.",
    highlights: ["GCP Infrastructure", "Kubernetes & Containers", "Cloud Security", "Google Cloud"],
    credentialId: "GCP-SKILLS-9014-VISHNU",
  },
  {
    id: "cert-hedera",
    title: "Hedera — Distributed Ledger & Smart Contracts",
    issuerOrEvent: "Hedera Developer Network & Hashgraph Association",
    category: "professional",
    categoryLabel: "Professional Certifications",
    type: "Certification",
    tier: "professional-hedera",
    statusBadge: "Hedera Certified Developer",
    date: "2025",
    score: "Web3 DLT Certification",
    badgeColor: "#00ebd8",
    previewImage: "/images/certificates/hedera-developer.svg",
    description: "Recognized for demonstrated mastery of the Hedera Hashgraph consensus service, decentralized smart contract architecture, and enterprise Web3 token integration.",
    highlights: ["Hashgraph Consensus", "Smart Contracts", "Web3 Architecture", "Hedera DLT"],
    credentialId: "HBAR-DEV-77341-VISHNU",
  },
  {
    id: "cert-coursera-web",
    title: "Coursera — Advanced Full-Stack Web Development",
    issuerOrEvent: "Coursera & Industry Partners",
    category: "professional",
    categoryLabel: "Professional Certifications",
    type: "Certification",
    tier: "professional-coursera",
    statusBadge: "Coursera Verified Specialization",
    date: "2025",
    score: "Professional Specialization",
    badgeColor: "#0056d2",
    previewImage: "/images/certificates/coursera-fullstack.svg",
    description: "Successfully completed comprehensive specialization covering modern frontend engineering, asynchronous backend APIs, database optimization, and software design patterns.",
    highlights: ["Frontend Architecture", "RESTful APIs", "Database Optimization", "DSA Foundations"],
    credentialId: "COURSERA-VISHNU-8921",
  },
];
