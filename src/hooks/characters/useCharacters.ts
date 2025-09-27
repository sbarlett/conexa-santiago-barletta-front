import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCharacters } from "@/lib/api";

export const useCharactersInfiniteScroll = (queryKey: string, search: string) => {
  return useInfiniteQuery({
    queryKey: ["characters", queryKey, search],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await fetchCharacters(pageParam, search);
      } catch (err: any) {
        if (err.status === 404) {
          return { info: { pages: 0, next: null }, results: [] };
        }
        throw err;
      }
    },
    retry: (failureCount, error: any) => {
      if (error?.status === 404) return false;
      return failureCount < 1;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.info.next) {
        const url = new URL(lastPage.info.next);
        const nextPage = Number.parseInt(url.searchParams.get("page") || "1");
        return nextPage;
      }
      return undefined;
    },

    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};
