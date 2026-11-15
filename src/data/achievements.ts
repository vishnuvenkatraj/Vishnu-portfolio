export type AchievementType =
  | "Certification"
  | "Hackathon"
  | "Award"
  | "Competition"
  | "Workshop";

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrEvent: string;
  type: AchievementType;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  previewImage?: string;
  badgeColor?: string;
  description: string;
  keyTakeaways: string[];
}

export const achievementsData: AchievementItem[] = [
  {
    id: "ach-aws-solutions-architect",
    title: "AWS Certified Solutions Architect – Associate",
    issuerOrEvent: "Amazon Web Services [Placeholder Certification]",
    type: "Certification",
    date: "2024",
    credentialId: "AWS-SAA-PLACEHOLDER-78901",
    verificationUrl: "https://aws.amazon.com/verification-placeholder",
    previewImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    badgeColor: "#ff9900",
    description:
      "Validated comprehensive knowledge in architecting secure, resilient, high-performing, and cost-optimized cloud architectures using AWS foundational services.",
    keyTakeaways: [
      "VPC networking, multi-AZ deployment strategies, and fault-tolerant failovers",
      "IAM access policies, KMS encryption at rest and in transit",
      "Cost optimization with spot instances, auto-scaling groups, and S3 lifecycle rules",
    ],
  },
  {
    id: "ach-global-hackathon-1st",
    title: "1st Place Winner – Global DevFest Hackathon",
    issuerOrEvent: "DevFest Annual Hackathon [Placeholder Event]",
    type: "Hackathon",
    date: "2023",
    verificationUrl: "https://example.com/hackathon-winner-placeholder",
    previewImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    badgeColor: "#00f2fe",
    description:
      "Awarded 1st place among 140+ competing international teams for developing an accessible real-time collaboration tool powered by WebSockets and local-first SQLite sync.",
    keyTakeaways: [
      "Architected real-time conflict-free replicated data types (CRDTs) under a 36-hour deadline",
      "Pitched architecture live to a panel of senior engineering directors",
      "Delivered a fully functional prototype deployed on edge servers",
    ],
  },
  {
    id: "ach-meta-frontend-cert",
    title: "Meta Professional Frontend Developer Certificate",
    issuerOrEvent: "Meta / Coursera [Placeholder Certification]",
    type: "Certification",
    date: "2023",
    credentialId: "META-FRONTEND-PLACEHOLDER-456",
    verificationUrl: "https://coursera.org/verification-placeholder",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    badgeColor: "#0668e1",
    description:
      "Comprehensive certification covering advanced React concepts, design systems, test-driven development, and web application performance profiling.",
    keyTakeaways: [
      "Deep dive into React render lifecycle and DOM reconciliation algorithms",
      "Rigorous unit testing with Jest and React Testing Library",
      "UI accessibility compliance (WCAG 2.1) and semantic HTML practices",
    ],
  },
  {
    id: "ach-icpc-regional",
    title: "Regional Finalist – Collegiate Programming Competition",
    issuerOrEvent: "ACM ICPC Regional Contest [Placeholder Competition]",
    type: "Competition",
    date: "2022",
    badgeColor: "#8b5cf6",
    description:
      "Qualified for and competed in the regional finals, solving complex algorithmic challenges under strict time and memory limits.",
    keyTakeaways: [
      "Advanced graph theory algorithms (Dijkstra, Tarjan SCC, Maximum Flow)",
      "Dynamic programming optimizations and combinatorial mathematics",
      "High-pressure teamwork and real-time algorithmic debugging",
    ],
  },
  {
    id: "ach-engineering-excellence",
    title: "Dean's Engineering Capstone Excellence Award",
    issuerOrEvent: "School of Engineering [Placeholder Institution]",
    type: "Award",
    date: "2022",
    badgeColor: "#10b981",
    description:
      "Recognized by faculty committee for outstanding technical implementation, architectural rigor, and comprehensive documentation in senior engineering capstone.",
    keyTakeaways: [
      "Built distributed file system with Paxos consensus algorithm simulation",
      "Authored 45-page formal system specification and fault tolerance proof",
    ],
  },
];
