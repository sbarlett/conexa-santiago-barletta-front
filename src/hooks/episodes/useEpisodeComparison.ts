import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { CharacterType } from "@/types/characters";
import { getEpisodes } from "@/services/api";

export const extractEpisodeId = (url: string) => +url.split("/").pop()!;

export const useEpisodeComparison = (character1: CharacterType | null, character2: CharacterType | null) => {
  const episodeQueries = useQueries({
    queries: [
      {
        queryKey: ["episodes", "character1", character1?.id],
        queryFn: () => getEpisodes(character1?.episode.map(extractEpisodeId) || []),
        enabled: !!character1?.episode.length,
      },
      {
        queryKey: ["episodes", "character2", character2?.id],
        queryFn: () => getEpisodes(character2?.episode.map(extractEpisodeId) || []),
        enabled: !!character2?.episode.length,
      },
    ],
  });

  const [character1Episodes, character2Episodes] = episodeQueries;

  const episodeComparison = useMemo(() => {
    const episodes1 = character1Episodes.data || [];
    const episodes2 = character2Episodes.data || [];
    const episodes1Ids = new Set(episodes1.map((ep) => ep.id));
    const episodes2Ids = new Set(episodes2.map((ep) => ep.id));

    return {
      character1Only: episodes1.filter((ep) => !episodes2Ids.has(ep.id)).sort((a, b) => a.id - b.id),
      character2Only: episodes2.filter((ep) => !episodes1Ids.has(ep.id)).sort((a, b) => a.id - b.id),
      shared: episodes1.filter((ep) => episodes2Ids.has(ep.id)).sort((a, b) => a.id - b.id),
    };
  }, [character1Episodes.data, character2Episodes.data]);

  return {
    ...episodeComparison,
    isLoading: character1Episodes.isLoading || character2Episodes.isLoading,
    error: character1Episodes.error || character2Episodes.error,
  };
};
