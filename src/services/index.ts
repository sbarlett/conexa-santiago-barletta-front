import { CharactersResponse } from "@/types/characters";
import { EpisodeType } from "@/types/episodes";

export class FetchError extends Error {
  constructor(message: string, public status: number, public statusText: string) {
    super(message);
    this.name = "FetchError";
  }
}

export const fetchInstance = async <T>(url: string): Promise<T> => {
  const baseURL = "/api";
  const fullURL = `${baseURL}${url}`;
  const response = await fetch(fullURL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new FetchError(`HTTP Error: ${response.statusText}`, response.status, response.statusText);
  }
  return response.json();
};

export const isNotFoundError = (error: unknown): boolean => {
  return error instanceof FetchError && error.status === 404;
};

export const isServerError = (error: unknown): boolean => {
  return error instanceof FetchError && error.status >= 500;
};

export const getCharacters = async (page: number = 1, search?: string): Promise<CharactersResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(search && { name: search }),
  });
  return fetchInstance<CharactersResponse>(`/character?${params}`);
};

export const getEpisodes = async (ids: number[]): Promise<EpisodeType[]> => {
  if (!ids.length) return [];
  const data = await fetchInstance<EpisodeType | EpisodeType[]>(`/episode/${ids.join(",")}`);
  return Array.isArray(data) ? data : [data];
};
