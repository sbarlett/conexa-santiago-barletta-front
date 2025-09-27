import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "@/services/api";
import { CharactersResponse } from "@/types/characters";
import { AxiosError } from "axios";

const DEFAULT_RESPONSE: CharactersResponse = {
  info: { pages: 0, next: null, prev: null, count: 0 },
  results: [],
};

export const useCharactersInfiniteScroll = (queryKey: string, search: string) => {
  return useInfiniteQuery<CharactersResponse, AxiosError>({
    queryKey: ["characters", queryKey, search],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await getCharacters(pageParam as number, search);
      } catch (err: AxiosError | any) {
        const hasSearchError = err?.response?.status === 404;
        return hasSearchError ? DEFAULT_RESPONSE : Promise.reject(err);
      }
    },
    retry: (failureCount, err: AxiosError) => {
      const hasSearchError = err?.response?.status === 404;
      return !hasSearchError && failureCount < 3;
    },
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.info?.next;
      return nextUrl ? Number.parseInt(new URL(nextUrl).searchParams.get("page") || "1") : undefined;
    },
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
  });
};
