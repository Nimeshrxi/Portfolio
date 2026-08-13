"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

import { mediaUrl } from "@/lib/constants";
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
  const image = mediaUrl(project.featured_image);
  const tech = asList(project.tech_stack);

  return (
    <article className="mission-card sense-target group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-spider-red/60 hover:shadow-hud">
      <button
        type="button"
        className="absolute right-4 top-4 z-20 rounded border border-white/15 bg-black/40 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-mist opacity-0 backdrop-blur transition group-hover:opacity-100"
        onClick={onWebShoot}
      >
        Web target
      </button>

      <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded border border-white/10 bg-navy-deep">
        {image ? (
          <Image
            src={image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 p-4 font-mono text-[0.68rem] text-electric-blue-bright/85">
            <div className="mb-3 flex items-center gap-2 text-mist">
              <span className="h-2 w-2 rounded-full bg-spider-red" />
              <span className="h-2 w-2 rounded-full bg-electric-blue" />
              <span className="h-2 w-2 rounded-full bg-white/70" />
              <span className="ml-2">mission_{index + 1}.py</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">
{`class Project:
    title = "${project.title}"
    status = "${statusLabel(project.status)}"
    category = "${project.category}"`}
            </pre>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded border border-white/15 bg-black/40 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
          Project {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-fog">
        <span>{project.category}</span>
        <span className="h-px w-6 bg-spider-red/70" />
        <span>{statusLabel(project.status)}</span>
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
