import type { Metadata } from "next";
import "@/styles/globals.css";
import { profileData } from "@/data/profile";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { LenisProvider } from "@/components/animations/LenisProvider";

export const metadata: Metadata = {
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
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${profileData.name} Developer Portfolio`,
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
    <html lang="en" className="dark">
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
      </head>
      <body className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        <LenisProvider>
          {/* Top Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Navigation Bar */}
          <Navbar />

          {/* Global Interactive Command Palette (Ctrl+K) */}
          <CommandPalette />

          {/* Page Body Content */}
          <div className="flex-1">{children}</div>

          {/* Footer */}
          <Footer />

          {/* Floating Back-To-Top Button */}
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
