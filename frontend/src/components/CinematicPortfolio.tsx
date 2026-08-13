"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CharacterScene, type CharacterSection } from "@/components/CharacterScene";
import { ContactForm } from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DEFAULT_INTRO, DEFAULT_TITLE, DJANGO_ADMIN_URL, PROJECT_CATEGORIES, mediaUrl } from "@/lib/constants";
import { asList, yearLabel } from "@/lib/format";
import type { PortfolioData, ProjectCategory } from "@/lib/types";

const characterSections = new Set<CharacterSection>([
  "home",
  "about",
  "skills",
  "coding",
  "projects",
  "experience",
  "education",
  "achievements",
  "resume",
  "contact",
]);

function toCharacterSection(value: string): CharacterSection {
  return characterSections.has(value as CharacterSection)
    ? (value as CharacterSection)
    : "home";
}

function SectionBackdrop({
  density = "normal",
}: {
  density?: "normal" | "quiet" | "dense";
}) {
  const buildings = density === "dense" ? 18 : density === "quiet" ? 10 : 14;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-city-gradient" />
      <div className="city-grid absolute inset-0 opacity-40" />
      <div className="web-grid" />
      <div className="rain-layer" />
      <div className="absolute inset-x-0 bottom-0 flex h-[44vh] items-end gap-2 px-2 opacity-60">
        {Array.from({ length: buildings }).map((_, index) => (
          <div
            key={index}
            className="relative flex-1 border border-white/[0.04] bg-black/60"
            style={{ height: `${34 + ((index * 17) % 46)}%` }}
          >
            <div className="absolute inset-2 grid grid-cols-3 gap-2 opacity-70">
              {Array.from({ length: 18 }).map((__, lightIndex) => (
                <span
                  key={lightIndex}
                  className={`h-2 rounded-sm ${
                    (lightIndex + index) % 4 === 0
                      ? "bg-electric-blue/70"
                      : (lightIndex + index) % 5 === 0
                        ? "bg-spider-red/60"
                        : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(225,29,46,0.25),transparent_24rem),radial-gradient(circle_at_85%_12%,rgba(96,165,250,0.24),transparent_28rem),linear-gradient(to_bottom,rgba(5,5,7,0.2),rgba(5,5,7,0.92))]" />
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-electric-blue-bright">
        {kicker}
      </p>
      <h2 className="font-display text-4xl uppercase leading-none tracking-wide text-white md:text-6xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base leading-7 text-mist md:text-lg">{body}</p> : null}
    </div>
  );
}

function CodeWindow() {
  return (
    <div className="glass-panel sense-target rounded p-5 font-mono text-sm text-mist">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-spider-red" />
          <span className="h-3 w-3 rounded-full bg-electric-blue" />
          <span className="h-3 w-3 rounded-full bg-white/60" />
        </div>
        <span className="text-xs uppercase tracking-[0.22em] text-fog">
          developer.py
        </span>
      </div>
      <pre className="overflow-x-auto leading-7">
{`class Developer:
    def __init__(self):
        self.name = "Nimesh Rai"
        self.stack = ["Python", "Django", "PostgreSQL"]
        self.focus = ["AI", "Data Analysis", "REST APIs"]

    def build(self, idea):
        api = DjangoRESTFramework(idea)
        interface = CinematicPortfolio(api)
        return deploy(interface)`}
      </pre>
    </div>
  );
}

export function CinematicPortfolio({
  data,
  apiOffline,
}: {
  data: PortfolioData;
  apiOffline: boolean;
}) {
  const [activeSection, setActiveSection] = useState<CharacterSection>("home");
  const [spiderSense, setSpiderSense] = useState(Boolean(data.settings?.enable_spider_sense));
  const [category, setCategory] = useState<ProjectCategory>("ALL");
  const [webShot, setWebShot] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();

  const profile = data.profile;
  const resumeUrl = mediaUrl(data.resume?.file);
  const filteredProjects = useMemo(() => {
    if (category === "ALL") return data.projects;
    return data.projects.filter((project) => project.category === category);
  }, [category, data.projects]);

  const featuredProjects = data.projects.filter((project) => project.is_featured).length;
  const totalSkills = data.skills.reduce((sum, group) => sum + group.skills.length, 0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section-id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute("data-section-id");
        if (id) setActiveSection(toCharacterSection(id));
      },
      { threshold: [0.26, 0.42, 0.62] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-cinematic-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
      });
    });

    return () => context.revert();
  }, [prefersReducedMotion]);

  function shootWeb() {
    setWebShot(Date.now());
    window.setTimeout(() => setWebShot(0), 740);
  }

  return (
    <main
      className={spiderSense ? "spider-sense min-h-screen bg-spider-black" : "min-h-screen bg-spider-black"}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
    >
      <Navbar
        activeSection={activeSection}
        spiderSense={spiderSense}
        onToggleSpiderSense={() => setSpiderSense((value) => !value)}
      />
      <CharacterScene activeSection={activeSection} spiderSense={spiderSense} />

      {isDesktop ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[80] h-6 w-6 rounded-full border border-electric-blue/80 shadow-[0_0_18px_rgba(96,165,250,0.7)]"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
            animation: spiderSense ? "cursor-pulse 1.6s ease-in-out infinite" : undefined,
          }}
        />
      ) : null}

      <AnimatePresence>
        {webShot ? (
          <motion.div
            key={webShot}
            aria-hidden="true"
            className="pointer-events-none fixed right-[24vw] top-[46vh] z-[70] h-px w-[44vw] origin-right bg-gradient-to-l from-white via-white/80 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        ) : null}
      </AnimatePresence>

      <section id="home" data-section-id="home" className="section-shell flex items-center">
        <SectionBackdrop density="dense" />
        <div className="content-wrap grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-3xl pt-16 lg:pt-0"
          >
            {apiOffline ? (
              <div className="mb-5 inline-flex rounded border border-electric-blue/40 bg-electric-blue/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-blue-100">
                API fallback mode
              </div>
            ) : null}
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-electric-blue-bright">
              New York night build
            </p>
            <h1 className="text-balance font-display text-6xl font-black uppercase leading-[0.86] tracking-wide text-white sm:text-7xl lg:text-8xl">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold uppercase tracking-[0.16em] text-spider-red-bright">
              {profile.title || DEFAULT_TITLE}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
              {profile.intro || DEFAULT_INTRO}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded border border-spider-red/70 bg-spider-red/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-spider-red/30"
              >
                Explore projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={resumeUrl || "#resume"}
                className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:border-electric-blue/70"
                target={resumeUrl ? "_blank" : undefined}
                rel={resumeUrl ? "noreferrer" : undefined}
              >
                View resume
                <Download className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded border border-white/15 bg-black/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:border-spider-red/70"
              >
                Contact me
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <div className="hidden lg:block" />
        </div>
        <div aria-hidden="true" className="absolute bottom-8 left-1/2 z-10 h-14 w-px bg-gradient-to-b from-white/70 to-transparent" />
      </section>

      <section id="about" data-section-id="about" className="section-shell">
        <SectionBackdrop />
        <div className="content-wrap lg:pr-[28vw]" data-cinematic-reveal>
          <SectionTitle
            kicker="Rooftop identity"
            title="About me"
            body={profile.bio}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Who I am", profile.who_i_am],
              ["What I build", profile.what_i_build],
              ["What I know", profile.what_i_know],
              ["What I'm learning", profile.what_im_learning],
              ["Where I'm going", profile.where_im_going],
            ].map(([title, body]) => (
              <article key={title} className="glass-panel sense-target hud-line rounded p-5">
                <h3 className="font-display text-2xl uppercase text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" data-section-id="skills" className="section-shell">
        <SectionBackdrop density="quiet" />
        <div className="content-wrap lg:pr-[24vw]" data-cinematic-reveal>
          <SectionTitle
            kicker="HUD modules"
            title="Skills"
            body="Core tools arranged like a scanning interface, powered by editable backend records."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.skills.map((group) => (
              <article key={group.id} className="glass-panel sense-target rounded p-5">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded border border-electric-blue/50 bg-electric-blue/10">
                    <Shield className="h-5 w-5 text-electric-blue-bright" />
                  </span>
                  <h3 className="font-display text-2xl uppercase text-white">{group.name}</h3>
                </div>
                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={shootWeb}
                      className="group/skill w-full text-left"
                    >
                      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                        <span className="font-semibold text-white">{skill.name}</span>
                        <span className="text-xs text-fog">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded bg-white/10">
                        <div
                          className={`h-full rounded bg-gradient-to-r ${
                            skill.spider_sense_highlight
                              ? "from-spider-red to-electric-blue"
                              : "from-white/60 to-electric-blue/60"
                          } transition group-hover/skill:shadow-hud-blue`}
                          style={{ width: `${Math.min(skill.proficiency, 100)}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="coding" data-section-id="coding" className="section-shell">
        <SectionBackdrop density="quiet" />
        <div className="content-wrap grid gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-center lg:pr-[22vw]" data-cinematic-reveal>
          <div>
            <SectionTitle
              kicker="Developer workstation"
              title="Code command"
              body="A functional portfolio still needs to feel like a developer built it. This scene uses real project data and authentic backend/API references."
            />
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1 w-full">
              {[
                ["API", "GET /api/projects/", Code2],
                ["Database", "SELECT * FROM projects;", Database],
                ["Git", "git commit -m", Github],
              ].map(([title, body, Icon]) => (
                <div key={title as string} className="mission-card sense-target p-5 md:p-5 min-h-auto">
                  <Icon className="mb-4 h-5 w-5 text-spider-red-bright" />
                  <p className="text-xs uppercase tracking-[0.24em] text-fog">{title as string}</p>
                  <p className="mt-2 font-mono text-xs md:text-sm text-mist break-words whitespace-normal">{body as string}</p>
                </div>
              ))}
            </div>
          </div>
          <CodeWindow />
        </div>
      </section>

      <section id="projects" data-section-id="projects" className="section-shell">
        <SectionBackdrop density="dense" />
        <div className="content-wrap" data-cinematic-reveal>
          <div className="lg:pr-[24vw]">
            <SectionTitle
              kicker="Mission files"
              title="Projects"
              body="Each project is retrieved from the backend and can be added, edited, featured, reordered, or removed from the admin dashboard."
            />
          </div>
          <div className="mb-7 flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setCategory(item.value)}
                className={`rounded border px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] transition ${
                  category === item.value
                    ? "border-spider-red/70 bg-spider-red/20 text-white"
                    : "border-white/15 bg-white/5 text-mist hover:border-electric-blue/60 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {filteredProjects.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  onWebShoot={shootWeb}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded p-8 font-display text-3xl uppercase text-white">
              No projects detected
            </div>
          )}
        </div>
      </section>

      <section id="experience" data-section-id="experience" className="section-shell">
        <SectionBackdrop />
        <div className="content-wrap lg:pr-[24vw]" data-cinematic-reveal>
          <SectionTitle
            kicker="Web timeline"
            title="Experience"
            body="Milestones are arranged as editable nodes in the backend."
          />
          <div className="relative space-y-5 pl-6 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-px before:bg-gradient-to-b before:from-spider-red before:via-electric-blue before:to-transparent">
            {data.experience.map((item) => (
              <article key={item.id} className="glass-panel sense-target relative rounded p-5">
                <span className="absolute -left-[1.7rem] top-6 h-4 w-4 rounded-full border border-white bg-spider-red shadow-glow" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-fog">
                      {yearLabel(item.start_date)} - {item.is_current ? "Present" : yearLabel(item.end_date)}
                    </p>
                    <h3 className="mt-2 font-display text-2xl uppercase text-white">
                      {item.role}
                    </h3>
                  </div>
                  <p className="text-sm text-mist">{item.company}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-mist">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {asList(item.technologies).map((tech) => (
                    <span key={tech} className="rounded border border-white/10 px-2 py-1 text-xs text-mist">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" data-section-id="education" className="section-shell">
        <SectionBackdrop density="quiet" />
        <div className="content-wrap lg:pr-[24vw]" data-cinematic-reveal>
          <SectionTitle
            kicker="Academic records"
            title="Education"
            body="A focused education console with coursework, projects, and editable achievement notes."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {data.education.map((item) => (
              <article key={item.id} className="glass-panel sense-target rounded p-6">
                <GraduationCap className="mb-5 h-8 w-8 text-electric-blue-bright" />
                <p className="text-xs uppercase tracking-[0.24em] text-fog">{item.field}</p>
                <h3 className="mt-2 font-display text-3xl uppercase text-white">
                  {item.degree}
                </h3>
                <p className="mt-2 text-mist">{item.institution}</p>
                <p className="mt-4 text-sm leading-7 text-mist">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {asList(item.relevant_coursework).slice(0, 8).map((course) => (
                    <span key={course} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-mist">
                      {course}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" data-section-id="achievements" className="section-shell">
        <SectionBackdrop />
        <div className="content-wrap lg:pr-[22vw]" data-cinematic-reveal>
          <SectionTitle
            kicker="Collectibles"
            title="Achievements"
            body="Achievement cards are stored in the database and can be replaced with real certificates, awards, hackathons, or milestones."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {data.achievements.map((achievement) => (
              <button
                key={achievement.id}
                type="button"
                onClick={shootWeb}
                className="mission-card sense-target p-5 text-left transition hover:-translate-y-1 hover:border-spider-red/60 hover:shadow-hud"
              >
                <Sparkles className="mb-5 h-7 w-7 text-spider-red-bright" />
                <p className="text-xs uppercase tracking-[0.24em] text-fog">
                  {achievement.category || achievement.year}
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase text-white">
                  {achievement.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mist">{achievement.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="resume" data-section-id="resume" className="section-shell">
        <SectionBackdrop density="quiet" />
        <div className="content-wrap grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:pr-[22vw]" data-cinematic-reveal>
          <div>
            <SectionTitle
              kicker="Recruiter console"
              title="Resume"
              body="The resume file is managed from Django admin, so it can be replaced without changing frontend source."
            />
            <div className="flex flex-wrap gap-3">
              {resumeUrl ? (
                <>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded border border-spider-red/60 bg-spider-red/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
                  >
                    View resume
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
                  >
                    Download resume
                    <Download className="h-4 w-4" />
                  </a>
                </>
              ) : (
                <a
                  href={`${DJANGO_ADMIN_URL}portfolio/resume/`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-electric-blue/60 bg-electric-blue/15 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white"
                >
                  Upload resume
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          <div className="glass-panel sense-target rounded p-5 font-mono text-sm text-mist">
            <div className="mb-4 flex items-center gap-3 text-white">
              <Terminal className="h-5 w-5 text-electric-blue-bright" />
              <span>resume_status.sh</span>
            </div>
            <p>&gt; python manage.py createsuperuser</p>
            <p>&gt; admin upload resumes/nimesh-rai.pdf</p>
            <p>&gt; GET /api/resume/</p>
            <p className="mt-3 text-electric-blue-bright">
              {resumeUrl ? "ACTIVE RESUME ONLINE" : "WAITING FOR PDF UPLOAD"}
            </p>
          </div>
        </div>
      </section>

      <section id="contact" data-section-id="contact" className="section-shell">
        <SectionBackdrop density="dense" />
        <div className="content-wrap grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:pr-[22vw]" data-cinematic-reveal>
          <div>
            <SectionTitle
              kicker="Final rooftop"
              title="Let's build something."
              body="For internships, collaborations, project feedback, or full-stack work, send a message through the database-backed contact system."
            />
            <div className="space-y-3 text-sm text-mist">
              {profile.location ? (
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-spider-red-bright" />
                  {profile.location}
                </p>
              ) : null}
              {profile.email ? (
                <a className="flex items-center gap-3 transition hover:text-white" href={`mailto:${profile.email}`}>
                  <Mail className="h-4 w-4 text-electric-blue-bright" />
                  {profile.email}
                </a>
              ) : null}
              <div className="flex flex-wrap gap-2 pt-3">
                {data.social.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="rounded border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-mist transition hover:border-spider-red/60 hover:text-white"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-10">
        <div className="web-grid" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl uppercase text-white">{profile.name}</p>
            <p className="mt-1 uppercase tracking-[0.18em] text-fog">{profile.title || DEFAULT_TITLE}</p>
          </div>
          <p>{data.settings?.footer_text || "Cinematic portfolio built with Django and Next.js."}</p>
        </div>
      </footer>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-4 left-4 z-50 hidden rounded border border-white/10 bg-black/40 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fog backdrop-blur md:block"
      >
        <span className="text-spider-red-bright">STATE</span> {activeSection}{" "}
        <span className="ml-3 text-electric-blue-bright">PROJECTS</span> {data.projects.length}{" "}
        <span className="ml-3 text-white">FEATURED</span> {featuredProjects}{" "}
        <span className="ml-3 text-white">SKILLS</span> {totalSkills}
      </div>
    </main>
  );
}
