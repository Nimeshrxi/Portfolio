import { CinematicPortfolio } from "@/components/CinematicPortfolio";
import { getPortfolioBundle } from "@/lib/api";
import { fallbackData } from "@/lib/fallbackData";
import type { PortfolioData } from "@/lib/types";

function resolveData(bundle: Awaited<ReturnType<typeof getPortfolioBundle>>): {
  data: PortfolioData;
  apiOffline: boolean;
} {
  const data: PortfolioData = {
    profile: bundle.profile.data || fallbackData.profile,
    projects: bundle.projects.data?.length ? bundle.projects.data : fallbackData.projects,
    skills: bundle.skills.data?.length ? bundle.skills.data : fallbackData.skills,
    experience: bundle.experience.data?.length
      ? bundle.experience.data
      : fallbackData.experience,
    education: bundle.education.data?.length ? bundle.education.data : fallbackData.education,
    achievements: bundle.achievements.data?.length
      ? bundle.achievements.data
      : fallbackData.achievements,
    social: bundle.social.data?.length ? bundle.social.data : fallbackData.social,
    resume: bundle.resume.data || fallbackData.resume,
    settings: bundle.settings.data || fallbackData.settings,
  };

  const apiOffline = [
    bundle.profile,
    bundle.projects,
    bundle.skills,
    bundle.experience,
    bundle.education,
    bundle.achievements,
    bundle.social,
  ].some((result) => Boolean(result.error));

  return { data, apiOffline };
}

export default async function Home() {
  const bundle = await getPortfolioBundle();
  const { data, apiOffline } = resolveData(bundle);

  return <CinematicPortfolio data={data} apiOffline={apiOffline} />;
}
