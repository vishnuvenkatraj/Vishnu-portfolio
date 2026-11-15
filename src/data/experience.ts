export interface ExperienceItem {
  id: string;
  type: "Internship" | "Full-time" | "Contract";
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
  toolsUsed: string[];
  responsibilities: string[];
  certificatePlaceholder?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-crapersoft-embedded",
    type: "Internship",
    role: "Embedded Systems Intern",
    organization: "Crapersoft",
    location: "Coimbatore",
    duration: "May – June 2026",
    period: {
      start: "May 2026",
      end: "Jun 2026",
    },
    summary:
      "Gained hands-on practical experience in embedded systems development, microcontroller programming, circuit simulation, and hardware debugging workflows.",
    toolsUsed: ["MPLAB IDE", "PICkit3 Debugger", "Proteus"],
    responsibilities: [
      "Worked with embedded systems development tools.",
      "Gained practical experience in microcontroller programming.",
      "Assisted with embedded-system debugging.",
      "Performed circuit simulation using Proteus.",
      "Assisted in testing and validating embedded circuit designs.",
    ],
    certificatePlaceholder: "Internship Certificate (To be provided)",
  },
];
