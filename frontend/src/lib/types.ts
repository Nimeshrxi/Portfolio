export type ProjectCategory =
  | "ALL"
  | "PYTHON"
  | "DJANGO"
  | "AI"
  | "DATA"
  | "WEB"
  | "DATABASE"
  | "AUTOMATION"
  | "OTHER";

export type ProjectStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "ACTIVE"
  | "MAINTAINED"
  | "ARCHIVED"
  | string;

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  intro: string;
  who_i_am: string;
  what_i_build: string;
  what_i_know: string;
  what_im_learning: string;
  where_im_going: string;
  avatar: string | null;
  location: string;
  email: string;
  phone: string;
  is_active: boolean;
}

export interface ProjectImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: ProjectCategory | string;
  short_description: string;
  description: string;
  problem?: string;
  solution?: string;
  features?: string | string[];
  architecture?: string;
  database?: string;
  challenges?: string;
  learning?: string;
  tech_stack: string[] | string;
  github_url: string | null;
  live_url: string | null;
  featured_image: string | null;
  images?: ProjectImage[];
  is_featured: boolean;
  order: number;
  status: ProjectStatus;
  completion_date?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: number;
  name: string;
  proficiency: number;
  icon: string | null;
  order: number;
  spider_sense_highlight: boolean;
  category?: number | string;
}

export interface SkillCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
  skills: Skill[];
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  technologies: string[] | string;
  order: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string | null;
  description: string;
  relevant_coursework?: string[] | string;
  projects?: string[] | string;
  achievements?: string[] | string;
  order: number;
}

export interface Achievement {
  id: number;
  category?: string;
  title: string;
  description: string;
  year: number | string | null;
  icon: string | null;
  image?: string | null;
  order: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string | null;
  order: number;
  is_active: boolean;
}

export interface Resume {
  id: number;
  title: string;
  file: string | null;
  is_active: boolean;
  uploaded_at: string;
}

export interface SiteSettings {
  id?: number;
  site_name: string;
  tagline: string;
  meta_description: string;
  og_image: string | null;
  enable_spider_sense: boolean;
  enable_easter_eggs: boolean;
  contact_email: string;
  footer_text?: string;
  github_username?: string;
  linkedin_url?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success?: boolean;
  detail?: string;
  message?: string;
  id?: number;
}

export interface ApiResult<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
  social: SocialLink[];
  resume: Resume | null;
  settings: SiteSettings | null;
}
