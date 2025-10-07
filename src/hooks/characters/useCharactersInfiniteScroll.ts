import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters, isNotFoundError } from "@/services";

import { CharactersResponse } from "@/types/characters";

const EMPTY_RESPONSE: CharactersResponse = {
  info: { pages: 0, next: null, prev: null, count: 0 },
  results: [],
};

export const useCharactersInfiniteScroll = (search: string) => {
  return useInfiniteQuery({
    queryKey: ["characters", search],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await getCharacters(pageParam, search);
      } catch (err) {
        return isNotFoundError(err) ? EMPTY_RESPONSE : Promise.reject(err);
      }
    },
    retry: (failureCount, err) => (isNotFoundError(err) ? false : failureCount < 1),
    throwOnError: (error) => (isNotFoundError(error) ? false : true),
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.info?.next;
      return nextUrl ? parseInt(new URL(nextUrl).searchParams.get("page") || "1") : undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
