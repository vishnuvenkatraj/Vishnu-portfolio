export interface ProjectChallenge {
  title: string;
  problem: string;
  resolution: string;
}

export interface ProjectArchitectureLayer {
  layer: string;
  technologies: string[];
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: "Full Stack" | "Systems & Cloud" | "Creative & Physics" | "Developer Tools";
  featured: boolean;
  coverImage: string;
  videoPreviewUrl?: string;
  demoUrl: string;
  githubUrl: string;
  techStack: string[];
  timeline: string;
  role: string;
  stats: Array<{ label: string; value: string }>;
  overview: string;
  problemStatement: string;
  proposedSolution: string;
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
  "Full Stack",
  "Systems & Cloud",
  "Creative & Physics",
  "Developer Tools",
] as const;

export const projectsData: Project[] = [
  {
    id: "project-pulse-sync",
    slug: "pulse-sync-distributed-event-platform",
    title: "PulseSync Distributed Event Mesh",
    subtitle: "High-throughput event streaming & analytics pipeline",
    tagline: "Ultra-low latency real-time telemetry streaming and live telemetry dashboard.",
    category: "Systems & Cloud",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://example.com/demo/pulse-sync",
    githubUrl: "https://github.com/placeholder-dev/pulse-sync-mesh",
    techStack: ["Go", "Next.js 15", "TypeScript", "Redis Pub/Sub", "PostgreSQL", "Tailwind CSS", "Docker"],
    timeline: "3 Months • Production Ready",
    role: "Lead Systems Architect & Full-Stack Developer",
    stats: [
      { label: "Throughput", value: "45k req/s" },
      { label: "p99 Latency", value: "< 14ms" },
      { label: "Memory Footprint", value: "~42MB" },
      { label: "Test Coverage", value: "94%" },
    ],
    overview:
      "PulseSync is a high-performance event aggregation and real-time visualization platform built to ingest, validate, and broadcast telemetry data streams across distributed microservices. It bridges lightweight Golang ingestion workers with a dynamic Next.js administrative dashboard.",
    problemStatement:
      "Legacy polling architectures incurred unacceptable latency, database write lock contentions, and significant server overhead during peak traffic spikes, preventing operational teams from diagnosing production incidents in real time.",
    proposedSolution:
      "Engineered an event-driven pub/sub backbone backed by Redis and Go goroutines that decouples payload ingestion from storage persistence. Client browsers receive push updates over selective WebSocket channels filtered by subscription topics.",
    keyFeatures: [
      {
        title: "Sub-millisecond Ingestion",
        description: "Concurrent HTTP/gRPC ingestion endpoints handling heavy batch payloads with zero-allocation JSON parsing.",
      },
      {
        title: "Dynamic Topic Filtering",
        description: "Allows client dashboards to subscribe to granular namespace events without receiving irrelevant channel noise.",
      },
      {
        title: "Dead Letter Queue & Auto-Retry",
        description: "Resilient error boundaries that automatically stash failed packets to persistent disk for audit replay.",
      },
      {
        title: "Interactive Live Charting",
        description: "Zero-lag SVG/Canvas telemetry charts that dynamically stream metrics without blocking DOM paint threads.",
      },
    ],
    architecture: [
      {
        layer: "Ingestion & Edge Gateway",
        technologies: ["Go", "Gin Engine", "gRPC", "Docker"],
        description: "Receives external payloads, handles JWT authorization, and checks rate limits in under 2ms.",
      },
      {
        layer: "Messaging & State Buffer",
        technologies: ["Redis Cluster", "Pub/Sub Queues"],
        description: "Buffers inbound events and fans out stream chunks to active worker channels.",
      },
      {
        layer: "Persistence & Analytics",
        technologies: ["PostgreSQL", "TimescaleDB", "Prisma"],
        description: "Batched asynchronous writes for aggregated audit trails and long-term analytical queries.",
      },
      {
        layer: "Presentation & Monitoring",
        technologies: ["Next.js", "React 19", "WebSockets", "Tailwind CSS"],
        description: "Interactive real-time monitoring console with responsive layout and dark mode.",
      },
    ],
    challenges: [
      {
        title: "Mitigating Memory Leaks under Peak Ingestion",
        problem: "Early builds accumulated unused buffer slices during sustained 50,000 req/sec stress tests.",
        resolution: "Adopted sync.Pool memory recycling for temporary byte buffers and tuned the Go garbage collector target percentage.",
      },
      {
        title: "Browser Frame Drops during Rapid State Updates",
        problem: "Pushing 100+ events per second over WebSockets degraded frontend rendering to under 25 FPS.",
        resolution: "Implemented client-side requestAnimationFrame micro-batching and decoupled incoming websocket queues from React component rerenders.",
      },
    ],
    gallery: [
      {
        title: "Real-time Telemetry Dashboard",
        caption: "Dark-themed administrative panel displaying live throughput graphs and active node nodes.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Cluster Topology Visualizer",
        caption: "Node health monitoring, latency distribution histogram, and socket connection counters.",
        imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "project-nexus-canvas",
    slug: "nexus-interactive-creative-engine",
    title: "Nexus Interactive Simulation Engine",
    subtitle: "2D physics-driven collaborative node workspace",
    tagline: "Physics-based fluid canvas for visual thinking, draggable component trees, and reactive constraints.",
    category: "Creative & Physics",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://example.com/demo/nexus-canvas",
    githubUrl: "https://github.com/placeholder-dev/nexus-physics-engine",
    techStack: ["TypeScript", "Matter.js", "Canvas API", "Framer Motion", "Next.js", "Tailwind CSS"],
    timeline: "2 Months • Open Source",
    role: "Creative Developer & Interaction Designer",
    stats: [
      { label: "Frame Rate", value: "60 FPS locked" },
      { label: "Max Bodies", value: "500+ items" },
      { label: "Bundle Size", value: "28 kB gzipped" },
      { label: "Touch Latency", value: "< 8ms" },
    ],
    overview:
      "Nexus is an experimental visual design sandbox that applies real-world rigid body dynamics to user interface components. Users can toss, connect, drag, and interact with live UI cards with realistic mass, friction, and elastic bounce.",
    problemStatement:
      "Traditional web interfaces are static and rigid. Complex hierarchical data diagrams often feel lifeless and difficult to mentally organize without tactile spatial feedback.",
    proposedSolution:
      "Built a custom physics canvas wrapper on top of Matter.js that maps DOM nodes into physical 2D collision geometry with spring constraints, enabling responsive tactile interaction on both mouse and touch displays.",
    keyFeatures: [
      {
        title: "Kinematic Drag & Throw",
        description: "Mouse and touch pointer velocity tracking with momentum preservation on release.",
      },
      {
        title: "Spring Elastic Constraints",
        description: "Connect multiple data nodes with flexible tension cables that pull and repel dynamically.",
      },
      {
        title: "Adaptive Viewport Boundaries",
        description: "Physics world boundaries adjust instantaneously to viewport resizes and orientation flips.",
      },
      {
        title: "Spatial Audio Cues",
        description: "Subtle dynamic audio synthesized via Web Audio API on physical body collisions.",
      },
    ],
    architecture: [
      {
        layer: "Simulation Core",
        technologies: ["Matter.js", "Custom Collision Solvers"],
        description: "Computes Verlet integration, velocity verlets, and bounding box sweeps.",
      },
      {
        layer: "Render Bridge",
        technologies: ["HTML5 Canvas", "WebGL Fallback"],
        description: "High-frequency render loop synchronized to screen refresh intervals using requestAnimationFrame.",
      },
      {
        layer: "Interaction & Gestures",
        technologies: ["Pointer Events API", "Framer Motion"],
        description: "Multi-touch gesture unification for drag, pinch-zoom, and boundary repulsion.",
      },
    ],
    challenges: [
      {
        title: "High DPI Canvas Blurriness",
        problem: "Canvas elements appeared blurry on retina screens when drawing at standard pixel densities.",
        resolution: "Calculated devicePixelRatio scaling factors for canvas buffers while retaining CSS layout dimensions.",
      },
      {
        title: "Mobile Touch Interception",
        problem: "Browser default swipe gestures interfered with dragging simulation nodes.",
        resolution: "Applied touch-action: none styling and implemented explicit pointer capture handlers.",
      },
    ],
    gallery: [
      {
        title: "Gravity Well & Elastic Links",
        caption: "Physics nodes linked by elastic spring constraints responding to user cursor gravitational pull.",
        imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "project-orbit-cms",
    slug: "orbit-headless-developer-cms",
    title: "Orbit Headless Content Platform",
    subtitle: "Modular API-first CMS for modern static site generators",
    tagline: "Developer-centric content pipeline featuring strict TypeScript schema compilation and instant webhooks.",
    category: "Full Stack",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://example.com/demo/orbit-cms",
    githubUrl: "https://github.com/placeholder-dev/orbit-headless-cms",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "GraphQL", "Tailwind CSS", "Zod"],
    timeline: "4 Months • Full Lifecycle",
    role: "Full-Stack Software Engineer",
    stats: [
      { label: "Build Time", value: "3.2s avg" },
      { label: "API Response", value: "38ms" },
      { label: "Schema Validation", value: "100% Type-safe" },
      { label: "Webhook Success", value: "99.98%" },
    ],
    overview:
      "Orbit CMS is a next-generation content management framework tailored for software engineering teams who want clean markdown authoring, versioned draft workflows, and automatic TypeScript typings generated for every content model.",
    problemStatement:
      "Existing enterprise CMS systems are bloated, slow, expensive, and decouple developer codebases from content schemas, forcing tedious manual typing and runtime breakage.",
    proposedSolution:
      "Designed an extensible headless architecture where schema definitions are authored in code or visual builders, producing end-to-end type declarations, validated GraphQL queries, and immediate edge caching.",
    keyFeatures: [
      {
        title: "Instant Type Generation",
        description: "Automatically emits TypeScript interface files whenever schema definitions are modified.",
      },
      {
        title: "Edge-Cached GraphQL Endpoints",
        description: "Global surrogate-key caching ensures content queries resolve in under 50ms worldwide.",
      },
      {
        title: "Git-Backed Version Control",
        description: "Every revision is tracked with cryptographic diffs, rollback triggers, and branch previews.",
      },
      {
        title: "Role-Based Access Control",
        description: "Granular permissions for authors, reviewers, and administrative engineers.",
      },
    ],
    architecture: [
      {
        layer: "Schema Engine & API",
        technologies: ["Node.js", "GraphQL", "Zod", "Prisma"],
        description: "Compiles content models, validates payloads, and executes nested relation queries.",
      },
      {
        layer: "Database Tier",
        technologies: ["PostgreSQL", "Supabase", "Redis"],
        description: "Stores JSON documents, audit histories, and cached query response trees.",
      },
      {
        layer: "Editorial Studio",
        technologies: ["Next.js 15", "TipTap Editor", "Tailwind CSS"],
        description: "Rich text markdown workspace with split-screen live preview and asset management.",
      },
    ],
    challenges: [
      {
        title: "Concurrent Edit Conflict Resolution",
        problem: "Simultaneous edits by two team members resulted in overwritten content blocks.",
        resolution: "Implemented operational transformation semantics and optimistic locking tokens on document saves.",
      },
      {
        title: "Complex Nested Relation Query Performance",
        problem: "Deeply nested GraphQL field resolvers generated N+1 SQL queries against PostgreSQL.",
        resolution: "Integrated DataLoader batch caching across relation queries, slashing query volume by 85%.",
      },
    ],
    gallery: [
      {
        title: "Editorial Workspace",
        caption: "Markdown editor featuring split-pane preview, asset dropzone, and SEO metadata inspector.",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "project-cli-craft",
    slug: "craft-cli-scaffolding-automation",
    title: "Craft Developer CLI Tooling",
    subtitle: "Command-line toolkit for modern web scaffold generation",
    tagline: "Blazing-fast terminal CLI for scaffolding microservices, linting pipelines, and docker compose stacks.",
    category: "Developer Tools",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://example.com/demo/craft-cli",
    githubUrl: "https://github.com/placeholder-dev/craft-developer-cli",
    techStack: ["TypeScript", "Node.js", "Commander.js", "Inquirer", "Chalk", "Docker"],
    timeline: "1 Month • Tooling",
    role: "Open Source Creator",
    stats: [
      { label: "Exec Time", value: "< 250ms" },
      { label: "Templates", value: "12 presets" },
      { label: "Install Base", value: "5k+ runs" },
      { label: "Exit Errors", value: "0 reported" },
    ],
    overview:
      "Craft CLI is a lightweight, interactive developer utility designed to eliminate boilerplate configuration when setting up new microservices, API routes, and containerized local environments.",
    problemStatement:
      "Setting up standard engineering projects with TypeScript, Docker, ESLint, Prettier, and CI/CD pipelines typically wastes 2-4 hours of developer time per repository.",
    proposedSolution:
      "Constructed an interactive terminal CLI with step-by-step prompts, template injection engines, and automatic dependency installation that spins up production-ready repos in under 60 seconds.",
    keyFeatures: [
      {
        title: "Interactive Terminal Wizard",
        description: "Intuitive multi-select menus with keyboard navigation and instant input validation.",
      },
      {
        title: "AST-Based Code Modification",
        description: "Safely injects configuration entries into existing project files without regex syntax errors.",
      },
      {
        title: "Modular Template Registry",
        description: "Pull updated boilerplate templates from GitHub repositories with offline fallback caching.",
      },
    ],
    architecture: [
      {
        layer: "CLI Runtime",
        technologies: ["Node.js", "Commander.js", "Execa"],
        description: "Parses CLI flags, executes shell pipelines, and provides colorized status output.",
      },
      {
        layer: "Templating Core",
        technologies: ["EJS", "Prettier API", "Babel AST"],
        description: "Dynamically renders boilerplate code and formats generated source files to standard style guides.",
      },
    ],
    challenges: [
      {
        title: "Cross-Platform Path Inconsistencies",
        problem: "Backslash vs slash path separators caused file creation failures on Windows machines.",
        resolution: "Standardized all internal path manipulations with path.posix and normalized file URL resolution.",
      },
    ],
    gallery: [
      {
        title: "Terminal Wizard Experience",
        caption: "Command line user interface showing colored prompt choices and progress indicators.",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];
