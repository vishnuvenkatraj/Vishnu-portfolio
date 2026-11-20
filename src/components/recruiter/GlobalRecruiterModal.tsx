"use client";

import { useState, useEffect } from "react";
import { RecruiterModal } from "./RecruiterModal";

export function GlobalRecruiterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-recruiter-modal", handleOpen);
    return () => window.removeEventListener("open-recruiter-modal", handleOpen);
  }, []);

  return <RecruiterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
