"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type CharacterSection =
  | "home"
  | "about"
  | "skills"
  | "coding"
  | "projects"
  | "experience"
  | "education"
  | "achievements"
  | "resume"
  | "contact";

type CharacterState = {
  image: string;
  alt: string;
  label: string;
  className: string;
  webAnchor?: string;
};

export const CHARACTER_STATES: Record<CharacterSection, CharacterState> = {
  home: {
    image: "/character/spiderman4k.png",
    alt: "Realistic Spider-Man landing on a cinematic welcome",
    label: "WELCOME",
    className: "right-[3vw] bottom-[2vh] h-[71vh] w-[40vw]",
    webAnchor: "rotate-[3deg] right-[28vw] top-[28vh] w-[34vw]",
  },
  about: {
    image: "/character/spiderman-wallcrawl.png",
    alt: "Spider-Man wall crawling near the about section",
    label: "WALL CRAWL",
    className: "right-[-1vw] bottom-[13vh] h-[56vh] w-[34vw] rotate-[-7deg]",
    webAnchor: "rotate-[-24deg] right-[22vw] top-[32vh] w-[28vw]",
  },
  skills: {
    image: "/character/spiderman-sticky.png",
    alt: "Spider-Man lit by a developer workstation interface",
    label: "HUD SCAN",
    className: "right-[0vw] bottom-[7vh] h-[58vh] w-[30vw]",
    webAnchor: "rotate-[14deg] right-[30vw] top-[44vh] w-[26vw]",
  },
  coding: {
    image: "/character/spider-tracker.png",
    alt: "Spider-Man beside a futuristic code editor",
    label: "CODING",
    className: "left-[70vw] bottom-[6vh] h-[55vh] w-[34vw]",
    webAnchor: "rotate-[-8deg] right-[30vw] top-[41vh] w-[30vw]",
  },
  projects: {
    image: "",
    alt: "",
    label: "SWINGING",
    className: "hidden",
    webAnchor: undefined,
  },
  experience: {
    image: "",
    alt: "",
    label: "CITY WALK",
    className: "hidden",
    webAnchor: undefined,
  },
  education: {
    image: "/character/Venom.png",
    alt: "Spider-Man scanning education records",
    label: "SCAN",
    className: "right-[2vw] bottom-[8vh] h-[44vh] w-[34vw]",
    webAnchor: "rotate-[4deg] right-[28vw] top-[40vh] w-[24vw]",
  },
  achievements: {
    image: "",
    alt: "",
    label: "INTERACTING",
    className: "hidden",
    webAnchor: undefined,
  },
  resume: {
    image: "",
    alt: "",
    label: "RESUME",
    className: "hidden",
    webAnchor: undefined,
  },
  contact: {
    image: "/character/spideyhang.png",
    alt: "Spider-Man hanging upside down above the contact section",
    label: "",
    className: "right-[3vw] top-[8vh] h-[80vh] w-[32vw]",
    webAnchor: "rotate-[90deg] right-[18vw] top-[0vh] w-[18vh]",
  },
};

export function CharacterScene({
  activeSection,
  spiderSense,
}: {
  activeSection: CharacterSection;
  spiderSense: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const state = CHARACTER_STATES[activeSection] ?? CHARACTER_STATES.home;

  // Skip rendering if no image
  if (!state.image || state.className.includes("hidden")) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 hidden overflow-hidden lg:block"
    >
      {state.webAnchor ? (
        <motion.div
          key={`web-${activeSection}`}
          className={`absolute h-px origin-right bg-gradient-to-l from-white/80 via-white/40 to-transparent ${state.webAnchor}`}
          initial={{ opacity: 0, scaleX: 0.45 }}
          animate={{ opacity: spiderSense ? 0.82 : 0.4, scaleX: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.65 }}
        />
      ) : null}
      <motion.div
        key={activeSection}
        className={`absolute ${state.className}`}
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, y: activeSection === "contact" ? -40 : 48, scale: 0.95 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.72, ease: "easeOut" }}
      >
        <div className="absolute inset-x-[18%] bottom-[6%] h-[8%] rounded-full bg-black/50 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_42%,rgba(225,29,46,0.34),transparent_26%),radial-gradient(circle_at_72%_36%,rgba(96,165,250,0.24),transparent_28%)] blur-2xl" />
        <Image
          src={state.image}
          alt={state.alt}
          fill
          priority={activeSection === "home"}
          sizes="42vw"
          className="object-contain drop-shadow-[0_28px_46px_rgba(0,0,0,0.72)]"
        />
        <div className="absolute bottom-[8%] left-[12%] rounded border border-white/15 bg-black/40 px-3 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-mist backdrop-blur">
          {state.label}
        </div>
      </motion.div>
    </div>
  );
}
