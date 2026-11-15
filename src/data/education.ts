export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  department: string;
  duration: string;
  period: {
    start: string;
    end: string;
  };
  location: string;
  academicPerformance: string;
  honors?: string[];
  relevantCoursework: string[];
  highlights: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "edu-bs-cs",
    institution: "State University of Technology [Placeholder University]",
    degree: "Bachelor of Science in Computer Science",
    department: "Department of Computer Science & Engineering",
    duration: "2018 — 2022",
    period: {
      start: "Aug 2018",
      end: "May 2022",
    },
    location: "California, USA",
    academicPerformance: "GPA: 3.85 / 4.0 (Magna Cum Laude)",
    honors: [
      "Dean's Honor List (All Semesters)",
      "Excellence in Senior Capstone Engineering Award",
      "ACM Collegiate Programming Chapter Officer",
    ],
    relevantCoursework: [
      "Data Structures & Algorithms",
      "Distributed Systems Architecture",
      "Operating Systems & Concurrency",
      "Database Management Systems",
      "Computer Networks & Protocols",
      "Compilers & Formal Languages",
      "Object-Oriented Software Design",
      "Computer Graphics & Shaders",
    ],
    highlights: [
      "Led a 4-person team in building a distributed file storage prototype for the senior capstone project.",
      "Served as an Undergraduate Teaching Assistant for CS 102: Data Structures and Algorithms.",
      "Organized annual university hackathons with 300+ student participants.",
    ],
  },
];
