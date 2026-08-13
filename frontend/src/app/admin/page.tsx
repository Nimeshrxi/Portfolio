import { ExternalLink, FileText, Inbox, Layers, Settings, Shield, Sparkles, UserRound } from "lucide-react";

import { getPortfolioBundle } from "@/lib/api";
import { DJANGO_ADMIN_URL } from "@/lib/constants";
import { fallbackData } from "@/lib/fallbackData";

function AdminLink({
  href,
  title,
  body,
  count,
  icon: Icon,
}: {
  href: string;
  title: string;
  body: string;
  count?: number | string;
  icon: typeof Layers;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mission-card group p-5 transition hover:-translate-y-1 hover:border-electric-blue/60 hover:shadow-hud-blue"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded border border-spider-red/50 bg-spider-red/15">
          <Icon className="h-5 w-5 text-spider-red-bright" />
        </span>
        <ExternalLink className="h-4 w-4 text-fog transition group-hover:text-white" />
      </div>
      <p className="text-xs uppercase tracking-[0.24em] text-fog">{count ?? "Manage"}</p>
      <h2 className="mt-2 font-display text-2xl uppercase text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-mist">{body}</p>
    </a>
  );
}

export default async function AdminPage() {
  const bundle = await getPortfolioBundle();
  const projects = bundle.projects.data?.length ? bundle.projects.data : fallbackData.projects;
  const skills = bundle.skills.data?.length ? bundle.skills.data : fallbackData.skills;
  const experience = bundle.experience.data?.length
    ? bundle.experience.data
    : fallbackData.experience;
  const education = bundle.education.data?.length ? bundle.education.data : fallbackData.education;
  const achievements = bundle.achievements.data?.length
    ? bundle.achievements.data
    : fallbackData.achievements;
  const totalSkills = skills.reduce((sum, group) => sum + group.skills.length, 0);

  const items = [
    {
      title: "Profile",
      body: "Name, hero copy, about cards, location, and contact identity.",
      href: `${DJANGO_ADMIN_URL}portfolio/profile/`,
      count: "Owner",
      icon: UserRound,
    },
    {
      title: "Projects",
      body: "Add, edit, delete, feature, reorder, upload images, and manage detail pages.",
      href: `${DJANGO_ADMIN_URL}portfolio/project/`,
      count: projects.length,
      icon: Layers,
    },
    {
      title: "Skills",
      body: "Group skills into HUD categories and tune proficiency or Spider-Sense highlights.",
      href: `${DJANGO_ADMIN_URL}portfolio/skillcategory/`,
      count: totalSkills,
      icon: Shield,
    },
    {
      title: "Experience",
      body: "Manage timeline milestones, technologies, ordering, and current status.",
      href: `${DJANGO_ADMIN_URL}portfolio/experience/`,
      count: experience.length,
      icon: Sparkles,
    },
    {
      title: "Education",
      body: "Maintain degree details, coursework, projects, and academic highlights.",
      href: `${DJANGO_ADMIN_URL}portfolio/education/`,
      count: education.length,
      icon: FileText,
    },
    {
      title: "Achievements",
      body: "Manage certification, award, hackathon, and milestone cards.",
      href: `${DJANGO_ADMIN_URL}portfolio/achievement/`,
      count: achievements.length,
      icon: Sparkles,
    },
    {
      title: "Resume",
      body: "Upload or replace the active PDF without touching source code.",
      href: `${DJANGO_ADMIN_URL}portfolio/resume/`,
      count: "PDF",
      icon: FileText,
    },
    {
      title: "Contact messages",
      body: "Read submitted contact messages and mark them handled.",
      href: `${DJANGO_ADMIN_URL}portfolio/contactmessage/`,
      count: "Inbox",
      icon: Inbox,
    },
    {
      title: "Site settings",
      body: "Control metadata, footer copy, social defaults, and cinematic toggles.",
      href: `${DJANGO_ADMIN_URL}portfolio/sitesettings/`,
      count: "Config",
      icon: Settings,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-spider-black px-4 py-10 text-white">
      <div className="absolute inset-0 bg-city-gradient" />
      <div className="city-grid absolute inset-0 opacity-40" />
      <div className="web-grid" />
      <div className="rain-layer" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <a
          href="/"
          className="inline-flex rounded border border-white/15 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-mist backdrop-blur transition hover:border-spider-red/60 hover:text-white"
        >
          Back to site
        </a>
        <section className="mt-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-electric-blue-bright">
            Content command center
          </p>
          <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-white md:text-7xl">
            Admin dashboard
          </h1>
          <p className="mt-5 text-lg leading-8 text-mist">
            The full CRUD system lives in Django admin. This dashboard gives you the sections and counts from the same API the public site uses.
          </p>
        </section>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <AdminLink key={item.title} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}
