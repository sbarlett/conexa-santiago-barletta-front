import { useQuery } from "@tanstack/react-query"
import type { Character } from "@/types/characters"
import { fetchMultipleEpisodes, extractEpisodeId } from "@/lib/api"

export const useCharacterEpisodes = (character: Character | null) => {
  const episodeIds = character?.episode.map(extractEpisodeId) || []
  return useQuery({
    queryKey: ["character-episodes", character?.id],
    queryFn: () => fetchMultipleEpisodes(episodeIds),
    enabled: episodeIds.length > 0,
  })
}
