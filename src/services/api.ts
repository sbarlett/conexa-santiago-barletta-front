const BASE_URL = "https://rickandmortyapi.com/api"

interface CharacterResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: any[]
}

interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export const getCharacters = async (page = 1, search?: string): Promise<CharacterResponse> => {
  const response = await fetch(`${BASE_URL}/character?page=${page}${search ? `&name=${search}` : ""}`)
  if (!response.ok) {
    throw new Error("Failed to fetch characters")
  }
  const data = await response.json()
  return data
}

export const fetchEpisode = async (id: number): Promise<Episode> => {
  const response = await fetch(`${BASE_URL}/episode/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch episode")
  }
  return response.json()
}

export const fetchMultipleEpisodes = async (ids: number[]): Promise<Episode[]> => {
  if (ids.length === 0) return []

  const response = await fetch(`${BASE_URL}/episode/${ids.join(",")}`)
  if (!response.ok) {
    throw new Error("Failed to fetch episodes")
  }

  const data = await response.json()
  return Array.isArray(data) ? data : [data]
}

export const extractEpisodeId = (url: string): number => {
  const parts = url.split("/")
  return Number.parseInt(parts[parts.length - 1])
}
