import type { ProjectCategory } from "./types";

export const SITE_NAME = "Nimesh Rai";
export const DEFAULT_TITLE =
  "Python Developer | Django Developer | AI & Data Enthusiast";
export const DEFAULT_INTRO =
  "I build practical software, intelligent applications and data-driven solutions using Python, Django, databases, AI and modern web technologies.";

export const NAV_LINKS = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#coding", label: "Code", id: "coding" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#achievements", label: "Achievements", id: "achievements" },
  { href: "#resume", label: "Resume", id: "resume" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export const PROJECT_CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "PYTHON", label: "Python" },
  { value: "DJANGO", label: "Django" },
  { value: "AI", label: "AI" },
  { value: "DATA", label: "Data" },
  { value: "WEB", label: "Web" },
  { value: "DATABASE", label: "Database" },
  { value: "AUTOMATION", label: "Automation" },
  { value: "OTHER", label: "Other" },
];

export const DJANGO_ADMIN_URL =
  process.env.NEXT_PUBLIC_DJANGO_ADMIN_URL || "http://127.0.0.1:8000/admin/";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function parseTechStack(stack: string[] | string | undefined): string[] {
  if (!stack) return [];
  if (Array.isArray(stack)) return stack.filter(Boolean);
  try {
    const parsed = JSON.parse(stack);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    /* comma-separated fallback */
  }
  return stack
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
