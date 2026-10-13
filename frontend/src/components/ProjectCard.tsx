"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

import { asList, statusLabel } from "@/lib/format";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  index,
  onWebShoot,
}: {
  project: Project;
  index: number;
  onWebShoot: () => void;
}) {
  const tech = asList(project.tech_stack);

  return (
    <article className="mission-card sense-target relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-spider-red/60 hover:shadow-hud">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-fog">
        <span>Project {String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-6 bg-spider-red/70" />
        <span>{project.category}</span>
        <span className="h-px w-6 bg-spider-red/70" />
        <span>{statusLabel(project.status)}</span>
        <button
          type="button"
          className="ml-auto rounded border border-white/15 bg-black/40 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-mist transition hover:border-spider-red/60 hover:text-white"
          onClick={onWebShoot}
        >
          Web target
        </button>
      </div>

      <h3 className="font-display text-2xl uppercase tracking-wide text-white">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-mist">{project.short_description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tech.slice(0, 5).map((item) => (
          <span
            key={item}
            className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-mist"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 rounded border border-spider-red/50 bg-spider-red/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-spider-red/25"
        >
          Open file
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        {project.github_url ? (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded border border-white/15 text-mist transition hover:border-white/30 hover:text-white"
            aria-label={`${project.title} GitHub`}
          >
            <Github className="h-4 w-4" />
          </a>
        ) : null}
        {project.live_url ? (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded border border-white/15 text-mist transition hover:border-white/30 hover:text-white"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
