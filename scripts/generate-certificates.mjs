import fs from 'fs';
import path from 'path';

const CERT_DIR = path.resolve('public', 'images', 'certificates');
fs.mkdirSync(CERT_DIR, { recursive: true });

function createSvgCertificate({
  tierColor = '#00f2fe',
  tierAccent = '#0284c7',
  badgeText = 'CERTIFICATE OF ACHIEVEMENT',
  title = 'Achievement Title',
  subtitle = 'Organization / Event',
  recipient = 'VISHNU V',
  date = '2026',
  scoreBadge = null,
  description = '',
  stampText = 'VERIFIED',
  isHackathon = false,
}) {
  const bgGradient = isHackathon
    ? 'linear-gradient(135deg, #090d16 0%, #150f28 50%, #0d1322 100%)'
    : 'linear-gradient(135deg, #0a0f1d 0%, #0d1829 50%, #080d1a 100%)';

  const borderColor = isHackathon ? '#a855f7' : tierColor;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${isHackathon ? '#0c1020' : '#080d1c'}" />
      <stop offset="50%" stop-color="${isHackathon ? '#1a0f2e' : '#0e1a33'}" />
      <stop offset="100%" stop-color="${isHackathon ? '#090c18' : '#060914'}" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="50%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${tierColor}" />
      <stop offset="100%" stop-color="${tierAccent}" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="800" fill="url(#bg)" />

  <!-- Outer Certificate Border -->
  <rect x="30" y="30" width="1140" height="740" rx="16" fill="none" stroke="${borderColor}" stroke-width="2" stroke-opacity="0.4" />
  <rect x="42" y="42" width="1116" height="716" rx="12" fill="none" stroke="${borderColor}" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="8 6" />

  <!-- Corner Geometric Ornaments -->
  <path d="M42 90 L42 42 L90 42" fill="none" stroke="${borderColor}" stroke-width="3" />
  <path d="M1158 90 L1158 42 L1110 42" fill="none" stroke="${borderColor}" stroke-width="3" />
  <path d="M42 710 L42 758 L90 758" fill="none" stroke="${borderColor}" stroke-width="3" />
  <path d="M1158 710 L1158 758 L1110 758" fill="none" stroke="${borderColor}" stroke-width="3" />

  <!-- Decorative Guilloche Wave Accent -->
  <path d="M100 120 Q 300 80, 600 120 T 1100 120" fill="none" stroke="${borderColor}" stroke-width="1" stroke-opacity="0.15" />
  <path d="M100 680 Q 300 720, 600 680 T 1100 680" fill="none" stroke="${borderColor}" stroke-width="1" stroke-opacity="0.15" />

  <!-- Certificate Category Badge -->
  <rect x="450" y="70" width="300" height="34" rx="17" fill="${borderColor}" fill-opacity="0.12" stroke="${borderColor}" stroke-width="1" stroke-opacity="0.5" />
  <text x="600" y="92" text-anchor="middle" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="${tierColor}" letter-spacing="3">${badgeText}</text>

  <!-- Issuer / Organization -->
  <text x="600" y="170" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#94a3b8" letter-spacing="4">${subtitle.toUpperCase()}</text>

  <!-- Main Award / Competition Title -->
  <text x="600" y="240" text-anchor="middle" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#ffffff" letter-spacing="1">${title}</text>

  <!-- Presentation Formula -->
  <text x="600" y="300" text-anchor="middle" font-family="'Georgia', serif" font-style="italic" font-size="18" fill="#64748b">This credential is proudly conferred upon</text>

  <!-- Recipient Name -->
  <text x="600" y="380" text-anchor="middle" font-family="system-ui, sans-serif" font-size="52" font-weight="900" fill="url(#primaryGrad)" filter="url(#glow)" letter-spacing="4">${recipient}</text>
  <line x1="350" y1="405" x2="850" y2="405" stroke="${borderColor}" stroke-width="2" stroke-opacity="0.4" />

  <!-- Description -->
  <foreignObject x="220" y="430" width="760" height="120">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: system-ui, sans-serif; font-size: 16px; color: #cbd5e1; text-align: center; line-height: 1.6; font-weight: 300;">
      ${description}
    </div>
  </foreignObject>

  ${scoreBadge ? `
  <!-- Score Badge -->
  <rect x="500" y="550" width="200" height="42" rx="21" fill="url(#goldGrad)" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.5" />
  <text x="600" y="577" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#fbbf24">${scoreBadge}</text>
  ` : ''}

  <!-- Footer Elements: Date, Seal Stamp, Verified Badge -->
  <!-- Left: Date -->
  <text x="180" y="670" font-family="'Courier New', monospace" font-size="13" fill="#64748b" letter-spacing="1">ISSUED DATE</text>
  <text x="180" y="695" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#e2e8f0">${date}</text>
  <line x1="180" y1="710" x2="320" y2="710" stroke="#334155" stroke-width="1" />

  <!-- Center: Golden Seal Stamp -->
  <g transform="translate(600, 680)">
    <circle r="42" fill="${borderColor}" fill-opacity="0.1" stroke="${borderColor}" stroke-width="2" />
    <circle r="36" fill="none" stroke="${borderColor}" stroke-width="1" stroke-dasharray="4 3" />
    <polygon points="0,-22 7,-7 22,-7 11,3 15,18 0,9 -15,18 -11,3 -22,-7 -7,-7" fill="${tierColor}" fill-opacity="0.8" />
    <text y="24" text-anchor="middle" font-family="'Courier New', monospace" font-size="9" font-weight="bold" fill="${tierColor}" letter-spacing="2">${stampText}</text>
  </g>

  <!-- Right: Verification Status -->
  <text x="1020" y="670" text-anchor="end" font-family="'Courier New', monospace" font-size="13" fill="#64748b" letter-spacing="1">AUTHENTICITY</text>
  <text x="1020" y="695" text-anchor="end" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#38bdf8">OFFICIALLY RECORDED</text>
  <line x1="880" y1="710" x2="1020" y2="710" stroke="#334155" stroke-width="1" />
</svg>`;
}

const CERTS = [
  {
    filename: 'innoverse-2026.svg',
    title: '1st Prize Winner — Innoverse 2026',
    subtitle: 'Innoverse Innovation Challenge',
    badgeText: '1ST PRIZE WINNER',
    tierColor: '#00f2fe',
    tierAccent: '#38bdf8',
    date: '2026',
    description: 'Awarded 1st Prize for technical innovation, problem-solving, and practical solution architecture at the Innoverse 2026 competition.',
    stampText: '1ST PLACE',
  },
  {
    filename: 'gencraft-2025.svg',
    title: '3rd Prize Winner — Gencraft Appathon 2025',
    subtitle: 'Gencraft Appathon Contest',
    badgeText: '3RD PRIZE WINNER',
    tierColor: '#f59e0b',
    tierAccent: '#fbbf24',
    date: '2025',
    description: 'Secured 3rd Prize in the competitive application development contest for building scalable and intuitive web applications.',
    stampText: '3RD PLACE',
  },
  {
    filename: 'dr-kalam-award-2026.svg',
    title: 'Dr. Kalam Young Achiever Award 2026',
    subtitle: 'World Youth Federation',
    badgeText: 'HONORARY RECOGNITION',
    tierColor: '#10b981',
    tierAccent: '#34d399',
    date: '2026',
    description: 'Conferred in recognition of engineering innovation, distinguished technical initiatives, and contributions to student engineering concepts.',
    stampText: 'HONOR',
  },
  {
    filename: 'hackathon-innovation-unbound-2026.svg',
    title: 'Innovation Unbound 2026',
    subtitle: '24-Hour Continuous Hackathon',
    badgeText: '24-HOUR HACKATHON',
    tierColor: '#c084fc',
    tierAccent: '#a855f7',
    date: '2026',
    isHackathon: true,
    description: 'Completed 24 hours of non-stop collaborative engineering, rapid prototype development, and real-time software deployment under strict time constraints.',
    stampText: '24H SPRINT',
  },
  {
    filename: 'hackathon-mobilityx-2025.svg',
    title: 'MobilityX 2.0 2025',
    subtitle: '24-Hour Technical Hackathon',
    badgeText: '24-HOUR HACKATHON',
    tierColor: '#c084fc',
    tierAccent: '#a855f7',
    date: '2025',
    isHackathon: true,
    description: 'Participated in the 24-hour technical hackathon focused on engineering innovation, practical problem-solving, and application development.',
    stampText: '24H SPRINT',
  },
  {
    filename: 'hackathon-hackmatrix-2026.svg',
    title: 'Hackmatrix 2026',
    subtitle: '24-Hour Technical Hackathon',
    badgeText: '24-HOUR HACKATHON',
    tierColor: '#c084fc',
    tierAccent: '#a855f7',
    date: '2026',
    isHackathon: true,
    description: 'Built technology-driven software solutions under strict 24-hour hackathon conditions, delivering functional prototypes and presenting architecture.',
    stampText: '24H SPRINT',
  },
  {
    filename: 'nptel-hci.svg',
    title: 'NPTEL — Human Computer Interaction (12 Weeks)',
    subtitle: 'NPTEL & IIT Certification',
    badgeText: 'ELITE + GOLD CERTIFICATION',
    tierColor: '#eab308',
    tierAccent: '#f59e0b',
    date: '12-Week Comprehensive Course',
    scoreBadge: 'FINAL SCORE: 95%',
    description: 'Successfully completed the 12-week advanced course in Human Computer Interaction, demonstrating mastery of user interface ergonomics, interaction models, and usability engineering.',
    stampText: 'ELITE GOLD',
  },
  {
    filename: 'nptel-software-testing.svg',
    title: 'NPTEL — Software Testing (12 Weeks)',
    subtitle: 'NPTEL & IIT Certification',
    badgeText: 'PROFESSIONAL CERTIFICATION',
    tierColor: '#38bdf8',
    tierAccent: '#0ea5e9',
    date: '12-Week Comprehensive Course',
    description: 'Successfully completed the 12-week certification course covering software testing principles, test case design, black/white-box methodologies, and automated verification.',
    stampText: 'CERTIFIED',
  },
];

for (const cert of CERTS) {
  const filePath = path.join(CERT_DIR, cert.filename);
  const svg = createSvgCertificate(cert);
  fs.writeFileSync(filePath, svg, 'utf-8');
  console.log(`✅ Generated ${cert.filename}`);
}

console.log('🎉 All 8 certificate graphics successfully generated.');
