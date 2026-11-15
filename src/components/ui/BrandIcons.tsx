import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// HackerRank Logo
export function HackerRankIcon({ className = "w-4 h-4", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16.5H8v-9h2v3.3h4V7.5h2v9h-2v-3.7h-4v3.7z" />
    </svg>
  );
}

// Java Coffee Cup Logo
export function JavaIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M8.8 3.5s-.8 1.4.8 2.5c1.9 1.4 1.3 2.5 1.3 2.5s1.2-1.2-.5-2.5C8.8 4.7 8.8 3.5 8.8 3.5zm3.6-.5s-.9 1.8.8 3c2.1 1.5 1.2 2.7 1.2 2.7s1.3-1.4-.4-2.8c-1.8-1.5-1.6-2.9-1.6-2.9zm-7 6.4s.8 2.3 3.6 2.4c3.3.1 3.9-1.2 3.9-1.2s-1.4 1-3.6.9c-2.6-.1-3.9-2.1-3.9-2.1zm14.1 3.5h-1.6c.4-1.2-.5-2-.5-2s1.4.7 1.1 2zm-2.8 0H4.2c-.7 0-1.2.6-1.2 1.3 0 3 2.5 5.5 5.6 5.5h3.6c2.6 0 4.8-1.8 5.4-4.2h.8c1.3 0 2.4-1 2.4-2.3s-1-2.3-2.4-2.3zm-.6 3.2h-.6c.1-.4.2-.8.2-1.3 0-.6-.1-1.2-.3-1.8h.7c.6 0 1.2.5 1.2 1.2s-.5 1.9-1.2 1.9zm-11.8 5s2 1.1 5.8 1.1 5.8-1.1 5.8-1.1-1.6 1.8-5.8 1.8-5.8-1.8-5.8-1.8z" />
    </svg>
  );
}

// C Language Hexagonal Badge
export function CIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 2L2.5 7.5v11L12 24l9.5-5.5v-11L12 2zm0 2.5l7.5 4.3v8.8L12 21.9 4.5 17.6V8.8L12 4.5zm2.8 5.5c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3c1.3 0 2.5-.6 3.2-1.5l-1.5-1.1c-.4.5-1 .8-1.7.8-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c.7 0 1.3.3 1.7.8l1.5-1.1c-.7-.9-1.9-1.5-3.2-1.5z" />
    </svg>
  );
}

// React Atom Logo
export function ReactIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    </svg>
  );
}

// Node.js Hexagon Logo
export function NodeIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 2.2L3.5 7.1v9.8L12 21.8l8.5-4.9V7.1L12 2.2zm6.7 13.9L12 20l-6.7-3.9V8L12 4l6.7 4.1v8.1zM12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z" />
    </svg>
  );
}

// HTML5 Shield Logo
export function Html5Icon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M3 2l1.7 19.1L12 23.3l7.3-2.2L21 2H3zm14.6 6.1H9.8l.2 2.1h7.4l-.6 6.8-4.8 1.4-4.8-1.4-.3-3.7h2.2l.2 1.9 2.7.7 2.7-.7.3-3.1H7.1L6.5 4.7h11.4l-.3 3.4z" />
    </svg>
  );
}

// CSS3 Shield Logo
export function Css3Icon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M3 2l1.7 19.1L12 23.3l7.3-2.2L21 2H3zm14.5 4.5l-.2 2.2H9.6l.2 2.3h7.2l-.7 7.5-4.3 1.3-4.3-1.3-.3-3.4h2.2l.2 1.7 2.2.6 2.2-.6.3-3.2H6.9L6.3 4.5h11.2l-.1 2z" />
    </svg>
  );
}

// MySQL / Relational Database Logo
export function MySqlIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

// Git Branching Logo
export function GitIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M21.7 10.8L13.2 2.3c-.6-.6-1.5-.6-2.1 0L8.9 4.5l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.6 1.3.3 1.9l2.7 2.7c.6-.3 1.4-.2 1.9.3.8.8.8 2 0 2.8s-2 .8-2.8 0c-.5-.5-.6-1.3-.3-1.9l-2.6-2.6v5.2c.2.2.4.4.5.7.5 1 .2 2.2-.7 2.8-1 .6-2.2.3-2.8-.7-.6-1-.3-2.2.7-2.8.3-.2.7-.3 1-.3v-5.2c-.3 0-.7-.2-1-.4-.6-.6-.7-1.5-.3-2.2L7.3 6.1 2.3 11.1c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.8-8.8c.6-.6.6-1.5 0-2.1z" />
    </svg>
  );
}

// Generative AI / Gemini Sparkle Logo
export function GenAiIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
    </svg>
  );
}

// DSA Binary Tree Icon
export function DsaIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="4" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <line x1="10.5" y1="6" x2="7.5" y2="16" />
      <line x1="13.5" y1="6" x2="16.5" y2="16" />
    </svg>
  );
}

// OOP Class / Object Hierarchy Icon
export function OopIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="7" y="2" width="10" height="6" rx="1.5" />
      <rect x="2" y="16" width="8" height="6" rx="1.5" />
      <rect x="14" y="16" width="8" height="6" rx="1.5" />
      <path d="M12 8v4M6 16v-4h12v4" />
    </svg>
  );
}

// Business Analytics Chart Icon
export function BusinessAnalyticsIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
      <path d="M3 13l6-6 4 4 8-8" />
    </svg>
  );
}

// Business Systems Architecture Icon
export function BusinessSystemsIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="4" y="4" width="6" height="5" rx="1" />
      <rect x="14" y="4" width="6" height="5" rx="1" />
      <rect x="9" y="15" width="6" height="5" rx="1" />
      <path d="M7 9v3h10V9M12 12v3" />
    </svg>
  );
}

// Technology Solutions Workflow Icon
export function TechSolutionsIcon({ className = "w-5 h-5", size, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
