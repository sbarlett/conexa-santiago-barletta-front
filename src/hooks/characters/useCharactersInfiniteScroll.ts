import { AxiosError } from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "@/services/api";
import { isNotFoundError } from "@/utils/axiosInstance";
import { CharactersResponse } from "@/types/characters";

const EMPTY_RESPONSE: CharactersResponse = {
  info: { pages: 0, next: null, prev: null, count: 0 },
  results: [],
};

export const useCharactersInfiniteScroll = (queryKey: string, search: string) => {
  return useInfiniteQuery({
    queryKey: ["characters", queryKey, search],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await getCharacters(pageParam, search);
      } catch (err) {
        return isNotFoundError(err as AxiosError) ? EMPTY_RESPONSE : Promise.reject(err);
      }
    },
    retry: (failureCount, err) => (isNotFoundError(err as AxiosError) ? false : failureCount < 1),
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.info?.next;
      return nextUrl ? parseInt(new URL(nextUrl).searchParams.get("page") || "1") : undefined;
    },
    staleTime: 5 * 60 * 1000,
    throwOnError: true,
  });
};
