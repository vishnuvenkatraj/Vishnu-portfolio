import fs from 'fs';
import path from 'path';

const CERT_DIR = path.resolve('public', 'images', 'certificates');

function createProfessionalSvg({
  primaryColor,
  accentColor,
  secondaryAccent = '#38bdf8',
  orgName,
  title,
  subtext,
  badgeText,
  credentialId,
  date = '2025',
  recipient = 'VISHNU V',
  skills = [],
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c1a" />
      <stop offset="50%" stop-color="#0d1428" />
      <stop offset="100%" stop-color="#050813" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="100%" stop-color="${accentColor}" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="800" fill="url(#bgGrad)" />

  <!-- High-Tech Tech Grid Pattern Background -->
  <g opacity="0.06">
    <path d="M 0,100 L 1200,100 M 0,200 L 1200,200 M 0,300 L 1200,300 M 0,400 L 1200,400 M 0,500 L 1200,500 M 0,600 L 1200,600 M 0,700 L 1200,700" stroke="${primaryColor}" stroke-width="1" />
    <path d="M 100,0 L 100,800 M 200,0 L 200,800 M 300,0 L 300,800 M 400,0 L 400,800 M 500,0 L 500,800 M 600,0 L 600,800 M 700,0 L 700,800 M 800,0 L 800,800 M 900,0 L 900,800 M 1000,0 L 1000,800 M 1100,0 L 1100,800" stroke="${primaryColor}" stroke-width="1" />
  </g>

  <!-- Outer Certificate Border -->
  <rect x="32" y="32" width="1136" height="736" rx="16" fill="none" stroke="${primaryColor}" stroke-width="2" stroke-opacity="0.5" />
  <rect x="44" y="44" width="1112" height="712" rx="12" fill="none" stroke="${accentColor}" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="8 6" />

  <!-- Corner Geometric Ornaments -->
  <path d="M44 88 L44 44 L88 44" fill="none" stroke="${primaryColor}" stroke-width="3" />
  <path d="M1156 88 L1156 44 L1112 44" fill="none" stroke="${primaryColor}" stroke-width="3" />
  <path d="M44 712 L44 756 L88 756" fill="none" stroke="${primaryColor}" stroke-width="3" />
  <path d="M1156 712 L1156 756 L1112 756" fill="none" stroke="${primaryColor}" stroke-width="3" />

  <!-- Top Category Pill -->
  <rect x="420" y="68" width="360" height="34" rx="17" fill="${primaryColor}" fill-opacity="0.12" stroke="${primaryColor}" stroke-width="1.2" stroke-opacity="0.6" />
  <text x="600" y="90" text-anchor="middle" font-family="'Courier New', monospace" font-size="11.5" font-weight="bold" fill="${primaryColor}" letter-spacing="3">${badgeText.toUpperCase()}</text>

  <!-- Issuer / Organization -->
  <text x="600" y="165" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#94a3b8" letter-spacing="3">${orgName.toUpperCase()}</text>

  <!-- Title -->
  <text x="600" y="235" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" letter-spacing="0.5">${title}</text>

  <!-- Presentation Formula -->
  <text x="600" y="295" text-anchor="middle" font-family="'Georgia', serif" font-style="italic" font-size="17" fill="#64748b">This professional certification is formally awarded to</text>

  <!-- Recipient Name -->
  <text x="600" y="375" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" fill="url(#primaryGrad)" filter="url(#glow)" letter-spacing="4">${recipient}</text>
  <line x1="360" y1="400" x2="840" y2="400" stroke="${primaryColor}" stroke-width="2" stroke-opacity="0.4" />

  <!-- Description / Subtext -->
  <foreignObject x="200" y="425" width="800" height="110">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: system-ui, sans-serif; font-size: 15px; color: #cbd5e1; text-align: center; line-height: 1.6; font-weight: 300;">
      ${subtext}
    </div>
  </foreignObject>

  <!-- Skills Ribbon -->
  <g transform="translate(600, 560)">
    <rect x="-300" y="-18" width="600" height="36" rx="8" fill="#ffffff" fill-opacity="0.03" stroke="${primaryColor}" stroke-width="1" stroke-opacity="0.3" />
    <text x="0" y="5" text-anchor="middle" font-family="'Courier New', monospace" font-size="12" fill="${secondaryAccent}" letter-spacing="1.5">
      CORE COMPETENCIES: ${skills.join('  •  ')}
    </text>
  </g>

  <!-- Footer Information -->
  <!-- Left: Issued Date -->
  <text x="180" y="670" font-family="'Courier New', monospace" font-size="12" fill="#64748b" letter-spacing="1">ISSUED DATE</text>
  <text x="180" y="695" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#e2e8f0">${date}</text>
  <line x1="180" y1="710" x2="320" y2="710" stroke="#334155" stroke-width="1" />

  <!-- Center: Verified Crest Seal -->
  <g transform="translate(600, 680)">
    <circle r="42" fill="${primaryColor}" fill-opacity="0.1" stroke="${primaryColor}" stroke-width="2" />
    <circle r="36" fill="none" stroke="${primaryColor}" stroke-width="1" stroke-dasharray="4 3" />
    <polygon points="0,-20 6,-6 20,-6 9,3 13,17 0,8 -13,17 -9,3 -20,-6 -6,-6" fill="${accentColor}" fill-opacity="0.85" />
    <text y="24" text-anchor="middle" font-family="'Courier New', monospace" font-size="8.5" font-weight="bold" fill="${primaryColor}" letter-spacing="1.5">VERIFIED</text>
  </g>

  <!-- Right: Credential ID -->
  <text x="1020" y="670" text-anchor="end" font-family="'Courier New', monospace" font-size="12" fill="#64748b" letter-spacing="1">CREDENTIAL ID</text>
  <text x="1020" y="695" text-anchor="end" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="${primaryColor}">${credentialId}</text>
  <line x1="860" y1="710" x2="1020" y2="710" stroke="#334155" stroke-width="1" />
</svg>`;
}

const CERTS = [
  {
    filename: 'ibm-software-engineering.svg',
    primaryColor: '#0f62fe', // IBM Classic Blue
    accentColor: '#4589ff',
    secondaryAccent: '#78a9ff',
    orgName: 'IBM Developer Skills Network',
    title: 'IBM — Full-Stack Software Engineering & DevOps',
    badgeText: 'IBM Professional Certification',
    credentialId: 'IBM-DEV-88912-VISHNU',
    date: '2025',
    subtext: 'Demonstrating professional competence in end-to-end full-stack software development, containerization, microservice architecture, and enterprise cloud DevOps standards.',
    skills: ['React', 'Node.js', 'Cloud DevOps', 'Microservices'],
  },
  {
    filename: 'google-cloud-foundations.svg',
    primaryColor: '#4285f4', // Google Blue
    accentColor: '#34a853', // Google Green
    secondaryAccent: '#fbbc05', // Google Amber
    orgName: 'Google Cloud Skills Boost',
    title: 'Google Cloud — Cloud Computing & Architecture',
    badgeText: 'Google Cloud Credential',
    credentialId: 'GCP-SKILLS-9014-VISHNU',
    date: '2025',
    subtext: 'Completed certified coursework in scalable cloud computing infrastructure, Google Cloud Platform compute engines, distributed storage, and modern API orchestration.',
    skills: ['GCP Infrastructure', 'Kubernetes', 'Cloud Security', 'APIs'],
  },
  {
    filename: 'hedera-developer.svg',
    primaryColor: '#00ebd8', // Hedera Electric Cyan
    accentColor: '#00b4d8',
    secondaryAccent: '#38bdf8',
    orgName: 'Hedera Developer Network & The Hashgraph Association',
    title: 'Hedera — Distributed Ledger & Smart Contracts',
    badgeText: 'Hedera Certified Developer',
    credentialId: 'HBAR-DEV-77341-VISHNU',
    date: '2025',
    subtext: 'Recognized for demonstrated mastery of the Hedera Hashgraph consensus service, decentralized smart contract architecture, and enterprise Web3 token integration.',
    skills: ['Hashgraph Consensus', 'Smart Contracts', 'Web3 Architecture', 'DLT'],
  },
  {
    filename: 'coursera-fullstack.svg',
    primaryColor: '#0056d2', // Coursera Royal Blue
    accentColor: '#00c0f0',
    secondaryAccent: '#60a5fa',
    orgName: 'Coursera & Industry Partners',
    title: 'Coursera — Advanced Full-Stack Web Development',
    badgeText: 'Coursera Verified Specialization',
    credentialId: 'COURSERA-VISHNU-8921',
    date: '2025',
    subtext: 'Successfully completed comprehensive specialization covering modern frontend engineering, asynchronous backend APIs, database optimization, and software design patterns.',
    skills: ['Frontend Architecture', 'RESTful APIs', 'Database Optimization', 'DSA'],
  },
];

for (const c of CERTS) {
  const filePath = path.join(CERT_DIR, c.filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, createProfessionalSvg(c), 'utf-8');
    console.log(`✅ Generated: ${c.filename}`);
  } else {
    console.log(`⚠️ Exists (preserved): ${c.filename}`);
  }
}
