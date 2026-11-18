export interface ProjectChallenge {
  title: string;
  problem: string;
  resolution: string;
}

import {
  mediConnectImages,
  civicConnectImages,
  flowVaultImages,
  resqTrakImages,
} from "./project-images";

export interface ProjectArchitectureLayer {
  layer: string;
  technologies: string[];
  description: string;
}

export interface ProjectChangelogEntry {
  date: string;
  title: string;
  description: string;
}

export interface ProjectPatentDetails {
  applicationNumber: string;
  authority: string;
  portalUrl: string;
  publicationStatus: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: "Featured Software" | "Engineering & Innovation";
  status: "Completed and demonstrable" | "Published Patent" | "Concept / Design Stage";
  featured: boolean;
  coverImage: string;
  demoUrl?: string;
  githubUrl?: string;
  techStack: string[];
  timeline: string;
  role: string;
  stats: Array<{ label: string; value: string }>;
  overview: string;
  problemStatement: string;
  proposedSolution: string;
  myContributions?: string[];
  learnings?: string[];
  changelog?: ProjectChangelogEntry[];
  patentDetails?: ProjectPatentDetails;
  keyFeatures: Array<{
    title: string;
    description: string;
    iconName?: string;
  }>;
  architecture: ProjectArchitectureLayer[];
  challenges: ProjectChallenge[];
  gallery: Array<{
    title: string;
    caption: string;
    imageUrl: string;
  }>;
}

export const PROJECT_CATEGORIES = [
  "All",
  "Featured Software",
  "Engineering & Innovation",
] as const;

export const projectsData: Project[] = [
  {
    id: "project-mediconnect",
    slug: "mediconnect-healthcare-management-system",
    title: "MediConnect",
    subtitle: "AI-Powered Healthcare Management System",
    tagline: "An integrated healthcare platform designed to digitize clinical workflows with role-based access for doctors, staff, and patients.",
    category: "Featured Software",
    status: "Completed and demonstrable",
    featured: true,
    coverImage: mediConnectImages.coverImage,
    demoUrl: "",
    githubUrl: "",
    techStack: ["React", "Node.js", "Generative AI", "Role-Based Authentication"],
    timeline: "Completed and Demonstrable",
    role: "Frontend Engineer & AI Integration Lead",
    stats: [
      { label: "Role Portals", value: "3 Portals" },
      { label: "Core AI", value: "Generative AI" },
      { label: "Access Security", value: "Role-Based" },
      { label: "Status", value: "Demonstrable" },
    ],
    overview:
      "MediConnect is an integrated healthcare platform designed to digitize clinical workflows with role-based access for doctors, staff, and patients. It streamlines patient data, scheduling, and assistive medical diagnostics.",
    problemStatement:
      "Traditional healthcare administration often experiences disjointed patient communication, manual record management bottlenecks, and high administrative overhead across different clinic departments.",
    proposedSolution:
      "Engineered an integrated web application with dedicated, secure portals for doctors, staff, and patients, incorporating Generative AI to assist with preliminary symptom analysis and medical guidance.",
    myContributions: [
      "Designed and implemented role-based access control (RBAC) portals for Patients, Doctors, and Hospital Staff.",
      "Integrated Google Gemini Generative AI API for automated preliminary symptom triage and medical report parsing.",
      "Engineered responsive appointment booking workflows, doctor availability scheduling, and clinical record management.",
      "Implemented client-side session authentication, defense-in-depth route protections, and reactive state management.",
    ],
    learnings: [
      "Deepened expertise in designing decoupled, secure role-based state and guarded navigation flows in React.",
      "Mastered structured prompt engineering and JSON output validation when integrating LLMs into medical triage workflows.",
      "Learned essential data privacy and input sanitization standards necessary for health information systems.",
    ],
    changelog: [
      {
        date: "Feb 2026",
        title: "Clinical Workflow Modeling & Role Specs",
        description: "Defined tripartite access policies and authorization workflows for patients, clinical doctors, and administrative staff.",
      },
      {
        date: "Apr 2026",
        title: "Core Portal & RBAC Implementation",
        description: "Built authentication flows, consultation scheduling, and medical document management interfaces.",
      },
      {
        date: "Jun 2026",
        title: "Generative AI Clinical Assistant Integration",
        description: "Integrated Gemini API for symptom triage and automated health summary generation.",
      },
      {
        date: "Aug 2026",
        title: "Testing, Demonstration & UI Optimization",
        description: "Completed end-to-end user testing and responsive optimization across desktop and mobile devices.",
      },
    ],
    keyFeatures: [
      {
        title: "Role-Based Portals",
        description: "Distinct, secure interfaces tailored specifically for doctors, administrative staff, and patients.",
      },
      {
        title: "Patient & Appointment Management",
        description: "Structured scheduling, consultation logging, and patient history tracking.",
      },
      {
        title: "AI-Assisted Symptom Analysis",
        description: "Generative AI integration to evaluate user-described symptoms and suggest preliminary guidance.",
      },
      {
        title: "Medical Assistance",
        description: "Interactive assistance features to support clinical decision-making and patient queries.",
      },
      {
        title: "Administrative Insights",
        description: "Data-driven overviews of appointments, workflow bottlenecks, and clinical activity.",
      },
    ],
    architecture: [
      {
        layer: "Frontend Interface",
        technologies: ["React", "HTML/CSS"],
        description: "Role-based responsive user portals designed for intuitive appointment booking and clinical navigation.",
      },
      {
        layer: "Backend Runtime",
        technologies: ["Node.js"],
        description: "Server architecture managing authentication, scheduling logic, and role verification.",
      },
      {
        layer: "AI & Clinical Intelligence",
        technologies: ["Generative AI"],
        description: "AI-assisted symptom analysis engine delivering contextual preliminary assistance.",
      },
    ],
    challenges: [
      {
        title: "Role-Based Access Segregation",
        problem: "Ensuring patient confidentiality and ensuring staff and doctor data boundaries remain strictly compartmentalized.",
        resolution: "Designed robust role-based authentication rules verifying user permissions on every route.",
      },
      {
        title: "Symptom Analysis Prompt Guidance",
        problem: "Formatting unstructured patient symptom inputs into coherent prompts for the Generative AI integration.",
        resolution: "Structured structured intake questionnaires to provide clear, grounded context to the AI assistant.",
      },
    ],
    gallery: [
      {
        title: "Clinical Portal & Patient Dashboard",
        caption: "Multi-role scheduling and consultation interface for doctors, administrative staff, and patients.",
        imageUrl: mediConnectImages.gallery1,
      },
      {
        title: "AI-Assisted Symptom Analysis Module",
        caption: "Generative AI diagnostic assistance interface guiding preliminary clinical categorization.",
        imageUrl: mediConnectImages.gallery2,
      },
      {
        title: "Administrative Insights & Clinical Throughput",
        caption: "Administrative analytics console monitoring appointment queues, patient throughput, and department efficiency.",
        imageUrl: mediConnectImages.gallery3,
      },
    ],
  },
  {
    id: "project-civicconnect",
    slug: "civicconnect-e-governance-platform",
    title: "CivicConnect",
    subtitle: "AI-Powered E-Governance Platform",
    tagline: "An AI-powered e-governance platform designed to manage public grievances across multiple districts.",
    category: "Featured Software",
    status: "Completed and demonstrable",
    featured: true,
    coverImage: civicConnectImages.coverImage,
    demoUrl: "",
    githubUrl: "",
    techStack: ["React", "Generative AI", "Analytics/ML for Issue Classification"],
    timeline: "Completed and Demonstrable",
    role: "AI Integration Engineer",
    stats: [
      { label: "Core Module", value: "IssueDNA" },
      { label: "Workflow", value: "ResolveChain" },
      { label: "SLA Guard", value: "SLA Guardian" },
      { label: "Status", value: "Demonstrable" },
    ],
    overview:
      "CivicConnect is an AI-powered e-governance platform designed to manage public grievances across multiple districts, detecting duplicate reports, tracking resolution workflows, and predicting SLA violations.",
    problemStatement:
      "Municipal administrations receive large volumes of redundant grievance reports across districts without unified automated prioritization or transparent resolution timelines.",
    proposedSolution:
      "Built an AI-driven grievance platform featuring IssueDNA duplicate-issue detection, ResolveChain grievance tracking, and SLA Guardian risk monitoring to systematically escalate and resolve public complaints.",
    myContributions: [
      "Architected the citizen grievance submission portal with automated geo-tagging and department routing.",
      "Formulated the IssueDNA algorithmic deduplication concept to identify and merge duplicate citizen complaints within local geographic clusters.",
      "Built administrative SLA tracking dashboards enabling municipal officers to monitor and escalate resolution timelines.",
      "Designed responsive mobile-first UI components for quick photo uploads and grievance status tracking.",
    ],
    learnings: [
      "Gained practical experience in municipal governance data flows and multi-departmental escalation matrices.",
      "Learned spatial clustering techniques for grievance deduplication to reduce municipal administrative overhead.",
      "Refined accessible UI patterns for citizens of diverse technical proficiencies.",
    ],
    changelog: [
      {
        date: "Mar 2026",
        title: "Civic Problem Analysis & E-Governance Scope",
        description: "Researched municipal complaint bottlenecks and citizen response turnaround times across district zones.",
      },
      {
        date: "May 2026",
        title: "IssueDNA Deduplication Logic & Portal UI",
        description: "Prototyped similarity detection algorithm for clustered local municipal issues and citizen reporting flows.",
      },
      {
        date: "Jul 2026",
        title: "SLA Guardian & Officer Escalation Engine",
        description: "Engineered automated alerts and grievance resolution timeline tracking across administrative tiers.",
      },
      {
        date: "Sep 2026",
        title: "End-to-End Validation & Case Study Demonstration",
        description: "Validated cross-district triage accuracy and finalized demonstrator platform.",
      },
    ],
    keyFeatures: [
      {
        title: "IssueDNA Duplicate Detection",
        description: "AI-powered detection to identify and merge duplicate citizen complaints submitted across districts.",
      },
      {
        title: "ResolveChain Workflow",
        description: "End-to-end transparent grievance routing, department assignment, and lifecycle resolution.",
      },
      {
        title: "SLA Guardian",
        description: "Predictive monitoring and alerting for municipal SLA risks before deadlines expire.",
      },
      {
        title: "Complaint Submission & Tracking",
        description: "User-friendly submission flow allowing citizens to log issues and trace real-time status.",
      },
      {
        title: "Analytics for Prioritization",
        description: "Data-driven ranking and issue classification to surface urgent community issues first.",
      },
    ],
    architecture: [
      {
        layer: "Presentation Layer",
        technologies: ["React", "HTML/CSS"],
        description: "Citizen grievance submission portal and municipal administrative dashboard.",
      },
      {
        layer: "AI & Classification Core",
        technologies: ["Generative AI", "Analytics/ML"],
        description: "Deduplication algorithms (IssueDNA) and SLA breach risk predictors (SLA Guardian).",
      },
      {
        layer: "Workflow Engine",
        technologies: ["ResolveChain Logic"],
        description: "Multi-district grievance state management and status updating pipeline.",
      },
    ],
    challenges: [
      {
        title: "Duplicate Grievance Clustering",
        problem: "Citizens describe the same municipal problem (e.g. pothole or water leak) with completely different wording and photos.",
        resolution: "Employed Generative AI semantic analysis to detect duplicate complaints based on contextual location and issue description.",
      },
      {
        title: "SLA Risk Tracking",
        problem: "Preventing high-priority public grievances from sitting unresolved in administrative backlogs.",
        resolution: "Developed the SLA Guardian module to actively monitor resolution speed and notify supervisory staff.",
      },
    ],
    gallery: [
      {
        title: "Citizen Grievance Submission Interface",
        caption: "Intuitive mobile-responsive citizen reporting interface for lodging municipal complaints across districts.",
        imageUrl: civicConnectImages.gallery1,
      },
      {
        title: "District Grievance Command Console",
        caption: "Municipal dashboard prioritizing complaints with ResolveChain lifecycle and status tracking.",
        imageUrl: civicConnectImages.gallery2,
      },
      {
        title: "Smart Issue Categorization",
        caption: "Intelligent complaint classification and category-based issue management dashboard.",
        imageUrl: civicConnectImages.gallery3,
      },
    ],
  },
  {
    id: "project-flowvault",
    slug: "flowvault-self-reconfiguring-storm-drain",
    title: "FlowVault",
    subtitle: "Self-Reconfiguring Storm Drain",
    tagline: "A passive hydraulic-mechanical storm-drain concept designed to automatically redirect drainage from a severely clogged section to the next available section.",
    category: "Engineering & Innovation",
    status: "Concept / Design Stage",
    featured: false,
    coverImage: flowVaultImages.coverImage,
    demoUrl: "",
    githubUrl: "",
    techStack: ["Hydraulic-Mechanical Design", "Passive Systems", "Fluid Dynamics Concept"],
    timeline: "Concept / Design Stage",
    role: "Engineering Concept Designer",
    stats: [
      { label: "Compartments", value: "4 Chambers" },
      { label: "Power Source", value: "Zero Power" },
      { label: "Mechanism", value: "Passive" },
      { label: "Status", value: "Concept Stage" },
    ],
    overview:
      "FlowVault is an engineering innovation concept for a passive hydraulic-mechanical storm drain. It automatically redirects drainage water from severely clogged sections to neighboring clear sections without requiring any sensors, electrical wiring, or external power sources.",
    problemStatement:
      "Urban storm drains frequently clog due to debris, leaves, and trash during severe rainfall. When single chambers clog, water overflows onto city streets because traditional drains cannot dynamically redirect runoff without expensive powered sensors.",
    proposedSolution:
      "Designed a four-compartment hydraulic persistence mechanism that mechanically actuates flow redirectors purely through the hydrostatic pressure differential created by rising water levels in a blocked chamber.",
    myContributions: [
      "Conceptualized self-reconfiguring storm-drain mechanics using passive hydraulic float switches.",
      "Developed schematic visualizations and calculated hydrodynamic redirect capacities across four chambers.",
      "Researched non-electrical debris clearing and failsafe water routing during peak cloudburst events.",
    ],
    learnings: [
      "Understood hydraulic pressure differentials and non-electric mechanical actuation under variable urban storm runoffs.",
      "Learned how to conduct intellectual property prior art searches and draft structured technical design specifications.",
    ],
    changelog: [
      {
        date: "Jan 2026",
        title: "Urban Drainage Vulnerability Study",
        description: "Analyzed recurring flash flood blockage points in high-density urban storm drains.",
      },
      {
        date: "Apr 2026",
        title: "Mechanical Flow Diversion Valve Modeling",
        description: "Simulated buoyant chamber mechanics for passive clapper redirection without electrical power.",
      },
      {
        date: "Jul 2026",
        title: "Multi-Chamber Persistence Validation",
        description: "Refined 4-chamber architectural specifications and debris tolerance thresholds.",
      },
    ],
    keyFeatures: [
      {
        title: "Four Drainage Compartments",
        description: "Multi-chamber partitioned drainage structure providing redundant overflow pathways.",
      },
      {
        title: "Automatic Drainage Redirection",
        description: "Directs water dynamically away from a clogged chamber toward the adjacent open compartment.",
      },
      {
        title: "Hydraulic Persistence Mechanism",
        description: "Maintains bypass flow stability using fluid head pressure without oscillations.",
      },
      {
        title: "Passive Mechanical Operation",
        description: "Operates 100% mechanically with zero electrical power, zero microcontrollers, and zero external wiring.",
      },
    ],
    architecture: [
      {
        layer: "Structural Partitioning",
        technologies: ["Multi-chamber Concrete/Composite Housing"],
        description: "Four interconnected hydraulic compartments with selective diversion valves.",
      },
      {
        layer: "Mechanical Actuation Core",
        technologies: ["Counterbalance Floats", "Mechanical Flap Gates"],
        description: "Pressure-actuated mechanical redirection levers responding directly to fluid buildup.",
      },
    ],
    challenges: [
      {
        title: "Zero-Electricity Actuation Reliability",
        problem: "Achieving reliable valve switching without motors, solenoids, or electrical power in harsh drainage environments.",
        resolution: "Engineered counterbalanced float mechanisms that utilize hydrostatic buoyancy and gravity for reliable actuation.",
      },
    ],
    gallery: [
      {
        title: "Storm Inflow & Surface Runoff Catchment",
        caption: "Municipal street runoff intake point capturing stormwater before entering hydraulic diversion chambers.",
        imageUrl: flowVaultImages.gallery1,
      },
      {
        title: "Hydraulic Redirection & Pressure Schematic",
        caption: "Mechanical bypass mechanism responding passively to fluid head pressure differentials without electrical power.",
        imageUrl: flowVaultImages.gallery2,
      },
      {
        title: "Four-Compartment Redirection Vault Assembly",
        caption: "Multi-chamber partitioned drainage structure providing automatic passive bypass into adjacent clear chambers.",
        imageUrl: flowVaultImages.gallery3,
      },
    ],
  },
  {
    id: "project-resqtrak",
    slug: "resqtrak-mechanical-auto-extraction-system",
    title: "RESQTRAK",
    subtitle: "Gas-Triggered Mechanical Auto-Extraction System",
    tagline: "A passive H₂S-triggered rescue system that converts hazardous gas exposure into mechanical actuation for automatic confined-space worker retrieval (Indian Patent Office Application: 202641130488).",
    category: "Engineering & Innovation",
    status: "Published Patent",
    featured: false,
    coverImage: resqTrakImages.coverImage,
    demoUrl: "https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus",
    githubUrl: "",
    techStack: ["Chemical-Mechanical Actuation", "Passive Safety Engineering", "Confined Space Rescue", "Patent Specification"],
    timeline: "Published Patent (Indian Patent Office)",
    role: "Inventor / Patent Applicant",
    stats: [
      { label: "Patent Status", value: "Published Patent" },
      { label: "Application No.", value: "202641130488" },
      { label: "Authority", value: "Indian Patent Office" },
      { label: "Target Gas", value: "H₂S Gas" },
    ],
    patentDetails: {
      applicationNumber: "202641130488",
      authority: "Indian Patent Office",
      portalUrl: "https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus",
      publicationStatus: "Published Patent",
    },
    overview:
      "RESQTRAK is an innovative, published patent engineering system (Indian Patent Office Application Number: 202641130488) designed to safeguard personnel exposed to lethal concentrations of hydrogen sulfide (H₂S) gas in confined subterranean spaces. It converts hazardous gas exposure directly into mechanical actuation for rapid, automatic worker retrieval without relying on manual rescuers or electrical equipment in explosive underground environments.",
    problemStatement:
      "In confined spaces such as sewer lines, chemical vaults, and manholes, sudden surges of toxic H₂S gas can cause unconsciousness within seconds. Rescuers who enter manually often succumb to the same gas, resulting in multiple casualties.",
    proposedSolution:
      "Engineered a gas-triggered auto-extraction mechanism that uses chemical-reactive mechanical actuation to engage retrieval winches the instant hazardous concentrations of H₂S gas are detected, functioning passively without electrical ignition sources.",
    myContributions: [
      "Invented the passive chemical-mechanical actuation mechanism utilizing an H₂S-reactive reactant matrix.",
      "Engineered the spark-proof mechanical retrieval harness and counterweighted hoist for hazardous explosive zones.",
      "Drafted technical patent specifications and claim architectures submitted to the Indian Patent Office (Application No: 202641130488).",
    ],
    learnings: [
      "Mastered chemical safety thresholds for confined-space personnel and hazardous gas exposure dynamics.",
      "Developed deep understanding of intellectual property drafting, patent search registries, and IPO documentation.",
    ],
    changelog: [
      {
        date: "Nov 2025",
        title: "Confined Space Rescue Hazard Analysis",
        description: "Researched toxic gas fatality statistics and secondary rescuer casualties in sewer line operations.",
      },
      {
        date: "Feb 2026",
        title: "Passive Chem-Mech Actuation Synthesis",
        description: "Formulated non-electrical explosive-safe trigger mechanism based on gas reactivity.",
      },
      {
        date: "2026",
        title: "Patent Publication — Indian Patent Office",
        description: "Officially published under Application Number 202641130488 in the Indian Patent Office publication search system.",
      },
    ],
    keyFeatures: [
      {
        title: "Gas-Triggered Mechanical Actuation",
        description: "Direct conversion of chemical gas exposure into mechanical releasing force.",
      },
      {
        title: "Automatic Worker Retrieval",
        description: "Initiates immediate extraction of unconscious workers to safe surface levels without delay.",
      },
      {
        title: "Passive Mechanical Approach",
        description: "Avoids spark hazards by functioning without electrical motors or electronic switches in explosive environments.",
      },
    ],
    architecture: [
      {
        layer: "Gas Detection & Reaction Core",
        technologies: ["H₂S Chemical Reactant Capsule"],
        description: "Reactive chemical matrix that triggers mechanical release upon contact with toxic threshold levels.",
      },
      {
        layer: "Extraction & Winch Mechanism",
        technologies: ["Pre-Tensioned Mechanical Retrieval Harness"],
        description: "Spring-loaded or counterweighted mechanical hoist for instantaneous worker elevation.",
      },
    ],
    challenges: [
      {
        title: "Explosion-Proof Confined Environments",
        problem: "Confined sewer spaces often contain volatile methane, meaning electrical rescue gear carries explosion risks.",
        resolution: "Formulated a 100% non-sparking, passive mechanical actuation concept independent of electrical circuits.",
      },
    ],
    gallery: [
      {
        title: "Confined Space Entry & Hazard Zone",
        caption: "Underground manhole and sewer vault setup where hazardous H2S gas surges incapacitate personnel.",
        imageUrl: resqTrakImages.gallery1,
      },
      {
        title: "Mechanical Auto-Extraction Layout",
        caption: "Non-electrical worker retrieval harness and rapid mechanical hoist mechanism for explosive environments.",
        imageUrl: resqTrakImages.gallery2,
      },
      {
        title: "Gas-Triggered Passive Extraction Hoist",
        caption: "Spark-proof chemical reactant trigger converting toxic threshold concentration into immediate mechanical worker ascent.",
        imageUrl: resqTrakImages.gallery3,
      },
    ],
  },
];
