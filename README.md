# Premium Interactive Developer Portfolio

A production-ready, futuristic personal developer portfolio combining professional minimalist design, selective glassmorphism, advanced physics interactions (Matter.js), and comprehensive project case studies. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scrolling, and Lucide React.

---

## ✨ Features & Architecture

- **Clean Placeholder Configuration**: All personal information, biography, skills, projects, experience, education, and achievements are organized in centralized TypeScript data files under `src/data/`. Zero hardcoded personal information.
- **Interactive Matter.js Physics Sandbox**: Draggable technology pills with real 2D rigid-body dynamics, bounce, collision geometry, gravity toggles (normal, zero-g, inverted), and scatter controls.
- **Categorized Skills Matrix**: Full technology breakdown across Languages, Frontend, Backend, Databases, DevTools, and CS Fundamentals with instant live search and domain filtering (no fake skill percentages).
- **Comprehensive Project Presentation**:
  - Asymmetric interactive grid with 3D tilt tracking and image zoom.
  - Quick-view Case Study modal popup without leaving the page.
  - Dedicated `/projects/[slug]` case study route featuring full 10-point architectural deep dives (overview, problem statement, solution, key features, layered architecture, challenges, gallery, live demo, and source repository).
- **Interactive Command Palette**: Press <kbd>Ctrl</kbd>+<kbd>K</kbd> or <kbd>Cmd</kbd>+<kbd>K</kbd> to search sections, jump to projects, access the resume, or copy contacts with full keyboard navigation and escape-to-close.
- **Continuous Activity GitHub Heatmap**: Interactive 52-week contribution calendar visualization with streak metrics and commit counts.
- **Functional Contact Form API Route**: Production Next.js server route (`/api/contact`) with request validation, realistic response delay, clipboard email copy feedback, and error/success handling.
- **Futuristic Visual Identity**: Deep midnight navy palette, electric cyan/indigo accents, ambient glowing gradients, liquid glass card panels, and smooth Lenis scrolling with reduced-motion support.
- **Dark / Light Theme Toggle**: Persistent theme switching with zero flash of unstyled content (FOUC).

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # Production contact submission endpoint
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Dedicated project case study pages
│   │   ├── layout.tsx                # Root layout with SEO, CommandPalette, Lenis
│   │   ├── not-found.tsx             # Futuristic 404 handler
│   │   └── page.tsx                  # Interactive portfolio homepage
│   ├── components/
│   │   ├── about/                    # Editorial about & philosophy components
│   │   ├── achievements/             # Certification & award cards with previews
│   │   ├── animations/               # Preloader & Lenis smooth scroll provider
│   │   ├── contact/                  # Contact form & social channels
│   │   ├── education/                # Academic history & honors timeline
│   │   ├── experience/               # Professional career timeline
│   │   ├── footer/                   # Monogram, navigation, and copyright footer
│   │   ├── github/                   # GitHub contribution calendar heatmap
│   │   ├── hero/                     # Hero, liquid glass card, particles, marquee
│   │   ├── navigation/               # Sticky Navbar & Command Palette (Ctrl+K)
│   │   ├── projects/                 # ProjectCard, ProjectModal, ProjectsSection
│   │   ├── skills/                   # Matter.js physics sandbox & categorized grid
│   │   └── ui/                       # ThemeToggle, ScrollProgress, MagneticButton
│   ├── data/
│   │   ├── profile.ts                # Name, bio, metrics, socials, resume config
│   │   ├── skills.ts                 # Categorized skills & sandbox items
│   │   ├── projects.ts               # Case studies, architecture layers, challenges
│   │   ├── experience.ts             # Roles, organizations, responsibilities, wins
│   │   ├── education.ts              # Degrees, coursework, GPA, institutions
│   │   └── achievements.ts           # Hackathons, certifications, verification URLs
│   ├── lib/
│   │   └── utils.ts                  # Classname merging and scroll utilities
│   └── styles/
│       └── globals.css               # Midnight navy theme tokens and glass styles
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🛠️ Personal Data Configuration

To personalize the website with your own information, edit the data files in `src/data/`:

1. **`src/data/profile.ts`**: Edit your name, initials, role, headline, availability status, resume path, and social media handles.
2. **`src/data/skills.ts`**: Add or remove technologies, adjust categories, and choose which items appear in the interactive Matter.js sandbox.
3. **`src/data/projects.ts`**: Configure your project case studies, metrics, problem statements, solutions, architecture layers, and gallery images.
4. **`src/data/experience.ts`**: Update your career history, organizations, contributions, and skills gained.
5. **`src/data/education.ts`**: Update your university, degrees, relevant coursework, and honors.
6. **`src/data/achievements.ts`**: Add your certifications, hackathon awards, dates, and credential links.

---

## 🚀 Getting Started

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build

```bash
npm run build
npm run start
```
