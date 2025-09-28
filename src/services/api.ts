import axiosInstance from "@/utils/axiosInstance";
import { CharactersResponse } from "@/types/characters";
import { EpisodeType } from "@/types/episodes";

export const getCharacters = async (page: number = 1, search?: string): Promise<CharactersResponse> => {
  const response = await axiosInstance.get("/character", {
    params: {
      page,
      ...(search && { name: search }),
    },
  });
  return response.data;
};

export const getEpisodes = async (ids: number[]): Promise<EpisodeType[]> => {
  if (ids.length === 0) return [];
  const response = await axiosInstance.get(`/episode/${ids.join(",")}`);
  const data = response.data;
  return Array.isArray(data) ? data : [data];
};
