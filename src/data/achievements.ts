export type AchievementType =
  | "Award"
  | "Hackathon"
  | "Certification";

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrEvent: string;
  type: AchievementType;
  date: string;
  score?: string;
  credentialPlaceholder?: string;
  verificationUrl?: string;
  previewImage?: string;
  badgeColor?: string;
  description: string;
}

export const achievementsData: AchievementItem[] = [
  // Awards
  {
    id: "award-innoverse-2026",
    title: "1st Prize Winner — Innoverse 2026",
    issuerOrEvent: "Innoverse",
    type: "Award",
    date: "2026",
    badgeColor: "#00f2fe",
    description: "Awarded 1st Prize for technical innovation and solution design at the Innoverse 2026 competition.",
    credentialPlaceholder: "Award Certificate (To be provided)",
  },
  {
    id: "award-gencraft-2025",
    title: "3rd Prize Winner — Gencraft Appathon 2025",
    issuerOrEvent: "Gencraft Appathon",
    type: "Award",
    date: "2025",
    badgeColor: "#38bdf8",
    description: "Secured 3rd Prize in the competitive Gencraft Appathon application development contest.",
    credentialPlaceholder: "Appathon Award Certificate (To be provided)",
  },
  {
    id: "award-dr-kalam-2026",
    title: "Dr. Kalam Young Achiever Awards 2026",
    issuerOrEvent: "World Youth Federation",
    type: "Award",
    date: "2026",
    badgeColor: "#10b981",
    description: "Conferred the Dr. Kalam Young Achiever Award by the World Youth Federation in recognition of technical initiative and engineering innovation.",
    credentialPlaceholder: "Recognition Certificate (To be provided)",
  },

  // Hackathon Participation (24-hour hackathons)
  {
    id: "hackathon-innovation-unbound-2026",
    title: "Innovation Unbound 2026",
    issuerOrEvent: "24-Hour Hackathon",
    type: "Hackathon",
    date: "2026",
    badgeColor: "#8b5cf6",
    description: "Participated in the 24-hour continuous hackathon, collaborating on software problem-solving and rapid prototype development.",
    credentialPlaceholder: "Participation Certificate (To be provided)",
  },
  {
    id: "hackathon-mobilityx-2025",
    title: "MobilityX 2.0 2025",
    issuerOrEvent: "24-Hour Hackathon",
    type: "Hackathon",
    date: "2025",
    badgeColor: "#8b5cf6",
    description: "Participated in the 24-hour technical hackathon focused on engineering innovation and practical application development.",
    credentialPlaceholder: "Participation Certificate (To be provided)",
  },
  {
    id: "hackathon-hackmatrix-2026",
    title: "Hackmatrix 2026",
    issuerOrEvent: "24-Hour Hackathon",
    type: "Hackathon",
    date: "2026",
    badgeColor: "#8b5cf6",
    description: "Participated in the 24-hour hackathon, building tech-driven solutions under time constraints.",
    credentialPlaceholder: "Participation Certificate (To be provided)",
  },

  // Certifications
  {
    id: "cert-nptel-hci",
    title: "NPTEL — Human Computer Interaction (12 Weeks)",
    issuerOrEvent: "NPTEL",
    type: "Certification",
    date: "12-Week Course",
    score: "Score: 95%",
    badgeColor: "#f59e0b",
    description: "Completed 12-week comprehensive NPTEL course in Human Computer Interaction, achieving an outstanding score of 95%.",
    credentialPlaceholder: "NPTEL Certificate (To be provided)",
  },
  {
    id: "cert-nptel-software-testing",
    title: "NPTEL — Software Testing (12 Weeks)",
    issuerOrEvent: "NPTEL",
    type: "Certification",
    date: "12-Week Course",
    badgeColor: "#f59e0b",
    description: "Successfully completed 12-week NPTEL certification course covering software testing principles, methodologies, and quality verification.",
    credentialPlaceholder: "NPTEL Certificate (To be provided)",
  },
];
