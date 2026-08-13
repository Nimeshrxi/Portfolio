import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Database, ExternalLink, Github, Layers, Lightbulb, ShieldCheck } from "lucide-react";

import { DJANGO_ADMIN_URL, mediaUrl } from "@/lib/constants";
import { asList, statusLabel } from "@/lib/format";
import type { Project } from "@/lib/types";

function DetailBlock({
  title,
  body,
}: {
  title: string;
  body: string | undefined | null;
}) {
  if (!body) return null;
  return (
    <section className="glass-panel rounded p-5">
      <h2 className="font-display text-2xl uppercase text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-mist">{body}</p>
    </section>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const image = mediaUrl(project.featured_image);
  const features = asList(project.features);
  const tech = asList(project.tech_stack);

  return (
    <main className="min-h-screen bg-spider-black text-white">
      <div className="fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute inset-0 bg-city-gradient" />
        <div className="city-grid absolute inset-0 opacity-40" />
        <div className="web-grid" />
        <div className="rain-layer" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(225,29,46,0.24),transparent_24rem),radial-gradient(circle_at_82%_18%,rgba(96,165,250,0.22),transparent_28rem),linear-gradient(to_bottom,rgba(5,5,7,0.35),rgba(5,5,7,0.96))]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded border border-white/15 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-mist backdrop-blur transition hover:border-spider-red/60 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-electric-blue-bright">
              Project mission file
            </p>
            <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-white md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-mist">
              {project.description || project.short_description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em]">
              <span className="rounded border border-spider-red/50 bg-spider-red/15 px-3 py-2 text-white">
                {statusLabel(project.status)}
              </span>
              <span className="rounded border border-electric-blue/50 bg-electric-blue/10 px-3 py-2 text-blue-100">
                {project.category}
              </span>
              <a
                href={`${DJANGO_ADMIN_URL}portfolio/project/`}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-white/15 bg-white/5 px-3 py-2 text-mist transition hover:text-white"
              >
                Edit in admin
              </a>
            </div>
          </div>

          <div className="mission-card relative aspect-[16/10] overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={`${project.title} screenshot`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 44vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 p-5 font-mono text-sm text-electric-blue-bright">
                <div className="mb-5 flex items-center gap-2 text-mist">
                  <span className="h-3 w-3 rounded-full bg-spider-red" />
                  <span className="h-3 w-3 rounded-full bg-electric-blue" />
                  <span className="h-3 w-3 rounded-full bg-white/70" />
                  <span className="ml-2">architecture.sql</span>
                </div>
                <pre className="whitespace-pre-wrap leading-7">
{`SELECT title, status, category
FROM projects
WHERE slug = '${project.slug}';`}
                </pre>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        </section>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            ["Overview", project.short_description, ShieldCheck],
            ["Architecture", project.architecture, Layers],
            ["Database", project.database, Database],
            ["Learning", project.learning, Lightbulb],
          ].map(([title, body, Icon]) => (
            <div key={title as string} className="glass-panel rounded p-4">
              <Icon className="mb-4 h-5 w-5 text-spider-red-bright" />
              <p className="text-xs uppercase tracking-[0.22em] text-fog">{title as string}</p>
              <p className="mt-2 text-sm leading-6 text-mist">{body as string}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <DetailBlock title="Problem" body={project.problem} />
          <DetailBlock title="Solution" body={project.solution} />
          <DetailBlock title="Challenges" body={project.challenges} />
          <DetailBlock title="Learning" body={project.learning} />
        </div>

        <section className="glass-panel mt-8 rounded p-5">
          <h2 className="font-display text-2xl uppercase text-white">Features</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {features.length ? (
              features.map((feature) => (
                <div key={feature} className="rounded border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-mist">
                  {feature}
                </div>
              ))
            ) : (
              <div className="rounded border border-white/10 bg-white/[0.04] px-3 py-3 text-sm uppercase tracking-[0.18em] text-fog">
                No features detected
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-wrap gap-2">
            {tech.map((item) => (
              <span key={item} className="rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-mist">
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.github_url ? (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white"
              >
                GitHub
                <Github className="h-4 w-4" />
              </a>
            ) : null}
            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-spider-red/60 bg-spider-red/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white"
              >
                Live demo
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
