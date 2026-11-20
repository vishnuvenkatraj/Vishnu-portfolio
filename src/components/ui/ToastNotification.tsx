"use client";

import { useState, useEffect } from "react";
import { Check, Info } from "lucide-react";

export interface ToastMessage {
  id: string;
  text: string;
  type?: "success" | "info";
}

export function showToast(text: string, type: "success" | "info" = "success") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("portfolio-toast", {
        detail: { text, type, id: Math.random().toString(36).substring(2, 9) },
      })
    );
  }
}

export function ToastNotification() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>;
      const newToast = customEvent.detail;

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3200);
    };

    window.addEventListener("portfolio-toast", handleToastEvent);
    return () => window.removeEventListener("portfolio-toast", handleToastEvent);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#090e1a]/95 dark:bg-[#090e1a]/95 light:bg-[#FAF7F2] border border-cyan-500/40 dark:border-cyan-500/40 light:border-[#702B40]/40 text-white dark:text-white light:text-[#252B29] text-xs font-medium shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === "info" ? (
            <Info className="w-4 h-4 text-cyan-400 light:text-[#702B40] shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400 light:text-emerald-600 shrink-0" />
          )}
          <span className="leading-snug">{toast.text}</span>
        </div>
      ))}
    </div>
  );
}
