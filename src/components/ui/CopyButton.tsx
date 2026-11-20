"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { showToast } from "./ToastNotification";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast(`Copied ${label || text} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono transition-colors cursor-pointer ${className}`}
      title={`Copy ${label || text}`}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-slate-400 light:text-[#702B40]" />
      )}
      {label && <span>{copied ? "Copied!" : label}</span>}
    </button>
  );
}
