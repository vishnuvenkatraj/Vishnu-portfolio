import type { Metadata } from "next";
import "@/styles/globals.css";
import { profileData } from "@/data/profile";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { ToastNotification } from "@/components/ui/ToastNotification";
import { GlobalRecruiterModal } from "@/components/recruiter/GlobalRecruiterModal";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vishnu-portfolio.vercel.app"),
  title: `${profileData.name} • ${profileData.role}`,
  description: profileData.headline,
  keywords: [
    "Vishnu V",
    "Aspiring Software Developer",
    "Computer Science and Business Systems",
    "Java",
    "C",
    "React",
    "Node.js",
    "MySQL",
    "Generative AI",
    "Portfolio",
    "Developer Portfolio",
  ],
  authors: [{ name: profileData.name }],
  creator: profileData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profileData.socials.github,
    title: `${profileData.name} • ${profileData.role}`,
    description: profileData.shortBio,
    siteName: `${profileData.name} Developer Portfolio`,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${profileData.name} Developer Portfolio & Engineering Case Studies`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} • ${profileData.role}`,
    description: profileData.shortBio,
    creator: profileData.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Pre-script to avoid theme flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (_) {}
            `,
          }}
        />

        {/* JSON-LD Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://vishnuvenkatraj.dev/#person",
                  name: profileData.name,
                  jobTitle: profileData.role,
                  description: profileData.headline,
                  email: `mailto:${profileData.socials.email}`,
                  telephone: profileData.socials.phone,
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "M. Kumarasamy College of Engineering, Karur",
                  },
                  knowsAbout: [
                    "Software Engineering",
                    "React 19",
                    "Next.js 15",
                    "TypeScript",
                    "Node.js",
                    "Generative AI",
                    "MongoDB",
                    "Computer Science and Business Systems",
                  ],
                  sameAs: [
                    profileData.socials.github,
                    profileData.socials.linkedin,
                    profileData.socials.hackerrank,
                  ],
                  hasOccupation: {
                    "@type": "Occupation",
                    name: "Software Developer",
                    occupationLocation: {
                      "@type": "Country",
                      name: "India",
                    },
                  },
                  award: [
                    "Innoverse 2026 — 1st Place Winner",
                    "Gencraft Hackathon — 3rd Place Winner",
                    "Dr. Kalam Young Achiever Award",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://vishnuvenkatraj.dev/#website",
                  url: "https://vishnuvenkatraj.dev",
                  name: `${profileData.name} • Engineering Portfolio`,
                  description: profileData.shortBio,
                  publisher: {
                    "@id": "https://vishnuvenkatraj.dev/#person",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300"
      >
        <LenisProvider>
          {/* Top Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Navigation Bar */}
          <Navbar />

          {/* Global Interactive Command Palette (Ctrl+K) */}
          <CommandPalette />

          {/* Page Body Content */}
          <div className="flex-1">{children}</div>

          {/* Global Recruiter Fast-Track Modal */}
          <GlobalRecruiterModal />

          {/* Global Toast Notification System */}
          <ToastNotification />

          {/* Footer */}
          <Footer />

          {/* Floating Back-To-Top Button */}
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
