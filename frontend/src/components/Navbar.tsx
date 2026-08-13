"use client";

import { useState } from "react";
import { Eye, Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/lib/constants";

export function Navbar({
  activeSection,
  spiderSense,
  onToggleSpiderSense,
}: {
  activeSection: string;
  spiderSense: boolean;
  onToggleSpiderSense: () => void;
}) {
  const [open, setOpen] = useState(false);

  const links = (
    <div className="flex flex-col gap-1 lg:flex-row lg:items-center">
      {NAV_LINKS.map((link) => {
        const active = activeSection === link.id;
        return (
          <a
            key={link.id}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`relative rounded px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
              active
                ? "text-white shadow-[inset_0_-1px_0_rgba(225,29,46,0.85)]"
                : "text-mist hover:text-white"
            }`}
          >
            {active ? (
              <span className="absolute left-1 top-1/2 h-px w-2 bg-spider-red-bright" />
            ) : null}
            {link.label}
          </a>
        );
      })}
    </div>
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded border border-white/15 bg-black/50 px-3 py-3 shadow-glass backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-3" aria-label="Go to home">
          <span className="grid h-9 w-9 place-items-center rounded border border-spider-red/60 bg-spider-red/15 text-sm font-black text-white shadow-glow">
            NR
          </span>
          <span className="hidden text-xs font-bold uppercase tracking-[0.28em] text-white sm:block">
            Nimesh Rai
          </span>
        </a>

        <div className="hidden lg:block">{links}</div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSpiderSense}
            aria-pressed={spiderSense}
            className={`inline-flex h-10 items-center gap-2 rounded border px-3 text-xs font-bold uppercase tracking-[0.18em] transition ${
              spiderSense
                ? "border-electric-blue/80 bg-electric-blue/20 text-white shadow-hud-blue"
                : "border-white/15 bg-white/5 text-mist hover:border-spider-red/60 hover:text-white"
            }`}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Spider-Sense</span>
          </button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded border border-white/15 bg-white/5 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 w-full max-w-7xl rounded border border-white/15 bg-black/75 p-3 shadow-glass backdrop-blur-xl lg:hidden">
          {links}
        </div>
      ) : null}
    </header>
  );
}
