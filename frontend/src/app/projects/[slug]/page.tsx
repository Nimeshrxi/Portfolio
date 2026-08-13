import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/ProjectDetail";
import { getProject } from "@/lib/api";
import { fallbackData } from "@/lib/fallbackData";

type Props = {
  params: Promise<{ slug: string }>;
};

async function loadProject(slug: string) {
  const result = await getProject(slug);
  return result.data || fallbackData.projects.find((project) => project.slug === slug) || null;
}

export async function generateStaticParams() {
  return fallbackData.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.short_description,
    openGraph: {
      title: `${project.title} | Nimesh Rai`,
      description: project.short_description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await loadProject(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
