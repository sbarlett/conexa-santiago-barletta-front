import type { Episode } from "@/types/characters";

export const formatEpisodeCode = (episode: string): string => {
  // Convert "S01E01" format to more readable format
  const match = episode.match(/S(\d+)E(\d+)/);
  if (match) {
    const season = Number.parseInt(match[1]);
    const episodeNum = Number.parseInt(match[2]);
    return `Season ${season}, Episode ${episodeNum}`;
  }
  return episode;
};

export const sortEpisodesByCode = (episodes: Episode[]): Episode[] => {
  return episodes.sort((a, b) => {
    const aMatch = a.episode.match(/S(\d+)E(\d+)/);
    const bMatch = b.episode.match(/S(\d+)E(\d+)/);

    if (!aMatch || !bMatch) return 0;

    const aSeason = Number.parseInt(aMatch[1]);
    const aEpisode = Number.parseInt(aMatch[2]);
    const bSeason = Number.parseInt(bMatch[1]);
    const bEpisode = Number.parseInt(bMatch[2]);

    if (aSeason !== bSeason) {
      return aSeason - bSeason;
    }

    return aEpisode - bEpisode;
  });
};

export const groupEpisodesBySeason = (episodes: Episode[]): Record<number, Episode[]> => {
  return episodes.reduce((acc, episode) => {
    const match = episode.episode.match(/S(\d+)E(\d+)/);
    if (match) {
      const season = Number.parseInt(match[1]);
      if (!acc[season]) {
        acc[season] = [];
      }
      acc[season].push(episode);
    }
    return acc;
  }, {} as Record<number, Episode[]>);
};

type Breakpoint = "mobile" | "tablet" | "desktop";

export const getEstimatedRowHeight = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case "mobile":
      return 240;
    case "tablet":
      return 230;
    case "desktop":
    default:
      return 220;
  }
};

export const getItemsPerRow = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case "mobile":
      return 1;
    case "tablet":
      return 2;
    case "desktop":
    default:
      return 3;
  }
};
