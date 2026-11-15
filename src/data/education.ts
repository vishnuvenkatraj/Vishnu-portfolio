export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  department?: string;
  duration: string;
  location: string;
  academicPerformance: string;
  isUndergraduate?: boolean;
}

export const educationData: EducationItem[] = [
  {
    id: "edu-btech-csbs",
    institution: "M. Kumarasamy College of Engineering, Karur",
    degree: "B.Tech — Computer Science and Business Systems",
    department: "Department of Computer Science and Business Systems",
    duration: "2024 – 2028",
    location: "Karur, Tamil Nadu",
    academicPerformance: "CGPA: 8.10 / 10 (up to 4th Semester)",
    isUndergraduate: true,
  },
  {
    id: "edu-hsc",
    institution: "SBK Higher Secondary School, Aruppukottai",
    degree: "Higher Secondary Certificate (HSC)",
    duration: "2024",
    location: "Aruppukottai, Tamil Nadu",
    academicPerformance: "Percentage: 81.83%",
    isUndergraduate: false,
  },
  {
    id: "edu-sslc",
    institution: "SBK Higher Secondary School, Aruppukottai",
    degree: "Secondary School Leaving Certificate (SSLC)",
    duration: "2022",
    location: "Aruppukottai, Tamil Nadu",
    academicPerformance: "Percentage: 78.2%",
    isUndergraduate: false,
  },
];
