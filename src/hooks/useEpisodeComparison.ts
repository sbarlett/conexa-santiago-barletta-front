"use client"

import { useMemo } from "react"
import { useQueries } from "@tanstack/react-query"
import type { Character } from "@/types/characters"
import { fetchMultipleEpisodes, extractEpisodeId } from "@/lib/api"

export const useEpisodeComparison = (character1: Character | null, character2: Character | null) => {
  // Extract episode IDs from character URLs
  const character1EpisodeIds = useMemo(() => {
    return character1?.episode.map(extractEpisodeId) || []
  }, [character1])

  const character2EpisodeIds = useMemo(() => {
    return character2?.episode.map(extractEpisodeId) || []
  }, [character2])

  // Fetch episodes for both characters
  const episodeQueries = useQueries({
    queries: [
      {
        queryKey: ["episodes", "character1", character1?.id],
        queryFn: () => fetchMultipleEpisodes(character1EpisodeIds),
        enabled: character1EpisodeIds.length > 0,
      },
      {
        queryKey: ["episodes", "character2", character2?.id],
        queryFn: () => fetchMultipleEpisodes(character2EpisodeIds),
        enabled: character2EpisodeIds.length > 0,
      },
    ],
  })

  const [character1Episodes, character2Episodes] = episodeQueries

  // Calculate episode comparisons
  const episodeComparison = useMemo(() => {
    const episodes1 = character1Episodes.data || []
    const episodes2 = character2Episodes.data || []

    const episodes1Ids = new Set(episodes1.map((ep) => ep.id))
    const episodes2Ids = new Set(episodes2.map((ep) => ep.id))

    // Episodes only in character 1
    const character1Only = episodes1.filter((ep) => !episodes2Ids.has(ep.id))

    // Episodes only in character 2
    const character2Only = episodes2.filter((ep) => !episodes1Ids.has(ep.id))

    // Shared episodes
    const shared = episodes1.filter((ep) => episodes2Ids.has(ep.id))

    return {
      character1Only: character1Only.sort((a, b) => a.id - b.id),
      character2Only: character2Only.sort((a, b) => a.id - b.id),
      shared: shared.sort((a, b) => a.id - b.id),
    }
  }, [character1Episodes.data, character2Episodes.data])

  return {
    ...episodeComparison,
    isLoading: character1Episodes.isLoading || character2Episodes.isLoading,
    error: character1Episodes.error || character2Episodes.error,
  }
}
