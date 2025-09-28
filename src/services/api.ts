import axiosInstance from "@/utils/axiosInstance";
import { CharactersResponse } from "@/types/characters";
import { EpisodeType } from "@/types/episodes";

export const getCharacters = async (page: number = 1, search?: string): Promise<CharactersResponse> => {
  const { data } = await axiosInstance.get("/character", {
    params: {
      page,
      ...(search && { name: search }),
    },
  });
  return data;
};

export const getEpisodes = async (ids: number[]): Promise<EpisodeType[]> => {
  if (!ids.length) return [];
  const { data } = await axiosInstance.get(`/episode/${ids.join(",")}`);
  return Array.isArray(data) ? data : [data];
};
