"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface DevNoteProps {
  text: string;
  className?: string;
}

export function DevNote({ text, className = "" }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 transition-colors hover:bg-amber-500/30"
        aria-label="Developer note"
      >
        <Info className="h-2.5 w-2.5" />
      </button>
      {open && (
        <div className="absolute left-0 top-6 z-50 w-72 rounded-lg border border-amber-500/30 bg-surface-800 p-3 text-xs leading-relaxed text-gray-300 shadow-xl">
          <span className="mb-1 block font-semibold uppercase tracking-wide text-amber-400">
            Dev Note
          </span>
          {text}
        </div>
      )}
    </span>
  );
}
