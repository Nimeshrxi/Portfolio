import { API_BASE } from "./constants";
import type {
  Achievement,
  ApiResult,
  ContactPayload,
  ContactResponse,
  Education,
  Experience,
  Profile,
  Project,
  ProjectCategory,
  Resume,
  SiteSettings,
  SkillCategory,
  SocialLink,
} from "./types";

type FetchOptions = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
  cache?: RequestCache;
};

async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<ApiResult<T>> {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
      next: options.next ?? { revalidate: 60 },
    });

    if (!res.ok) {
      let detail = `Request failed (${res.status})`;
      try {
        const body = await res.json();
        detail =
          body.detail ||
          body.message ||
          (typeof body === "string" ? body : detail);
      } catch {
        /* ignore parse errors */
      }
      return { data: null, error: detail, status: res.status };
    }

    if (res.status === 204) {
      return { data: null as T, error: null, status: 204 };
    }

    const data = (await res.json()) as T;
    return { data, error: null, status: res.status };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to reach portfolio API";
    return { data: null, error: message, status: 0 };
  }
}

function unwrapList<T>(payload: T[] | { results: T[] } | null): T[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  return [];
}

export async function getProfile(): Promise<ApiResult<Profile>> {
  const result = await apiFetch<Profile | Profile[]>("/api/profile/");
  if (!result.data) return result as ApiResult<Profile>;
  const profile = Array.isArray(result.data) ? result.data[0] : result.data;
  return { ...result, data: profile ?? null };
}

export async function getProjects(
  category?: ProjectCategory | string,
): Promise<ApiResult<Project[]>> {
  const qs =
    category && category !== "ALL"
      ? `?category=${encodeURIComponent(category)}`
      : "";
  const result = await apiFetch<Project[] | { results: Project[] }>(
    `/api/projects/${qs}`,
  );
  return {
    ...result,
    data: unwrapList(result.data),
  };
}

export async function getProject(
  slug: string,
): Promise<ApiResult<Project>> {
  return apiFetch<Project>(`/api/projects/${encodeURIComponent(slug)}/`);
}

export async function getSkills(): Promise<ApiResult<SkillCategory[]>> {
  const result = await apiFetch<SkillCategory[] | { results: SkillCategory[] }>(
    "/api/skills/",
  );
  return { ...result, data: unwrapList(result.data) };
}

export async function getExperience(): Promise<ApiResult<Experience[]>> {
  const result = await apiFetch<Experience[] | { results: Experience[] }>(
    "/api/experience/",
  );
  return { ...result, data: unwrapList(result.data) };
}

export async function getEducation(): Promise<ApiResult<Education[]>> {
  const result = await apiFetch<Education[] | { results: Education[] }>(
    "/api/education/",
  );
  return { ...result, data: unwrapList(result.data) };
}

export async function getAchievements(): Promise<ApiResult<Achievement[]>> {
  const result = await apiFetch<Achievement[] | { results: Achievement[] }>(
    "/api/achievements/",
  );
  return { ...result, data: unwrapList(result.data) };
}

export async function getSocialLinks(): Promise<ApiResult<SocialLink[]>> {
  const result = await apiFetch<SocialLink[] | { results: SocialLink[] }>(
    "/api/social-links/",
  );
  return { ...result, data: unwrapList(result.data) };
}

export async function getResume(): Promise<ApiResult<Resume | null>> {
  const result = await apiFetch<Resume | Resume[]>("/api/resume/");
  if (!result.data) return { ...result, data: null };
  const resume = Array.isArray(result.data)
    ? result.data.find((r) => r.is_active) || result.data[0]
    : result.data;
  return { ...result, data: resume ?? null };
}

export async function getSiteSettings(): Promise<ApiResult<SiteSettings | null>> {
  // settings endpoint is optional — try common paths, soft-fail if missing
  let raw = await apiFetch<SiteSettings | SiteSettings[]>("/api/settings/");
  if (!raw.data) {
    raw = await apiFetch<SiteSettings | SiteSettings[]>("/api/site-settings/");
  }
  if (!raw.data) {
    return { data: null, error: null, status: raw.status || 404 };
  }
  const settings = Array.isArray(raw.data) ? raw.data[0] : raw.data;
  return { ...raw, data: settings ?? null, error: null };
}

export async function postContact(
  payload: ContactPayload,
): Promise<ApiResult<ContactResponse>> {
  return apiFetch<ContactResponse>("/api/contact/", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
    next: { revalidate: 0 },
  });
}

export async function getPortfolioBundle() {
  const [
    profile,
    projects,
    skills,
    experience,
    education,
    achievements,
    social,
    resume,
    settings,
  ] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getExperience(),
    getEducation(),
    getAchievements(),
    getSocialLinks(),
    getResume(),
    getSiteSettings(),
  ]);

  return {
    profile,
    projects,
    skills,
    experience,
    education,
    achievements,
    social,
    resume,
    settings,
  };
}
