import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCharacters } from "@/lib/api";

export const useCharacters = (selectorId = "default", search?: string) => {
  return useInfiniteQuery({
    queryKey: ["characters", selectorId, search],
    queryFn: ({ pageParam = 1 }) => fetchCharacters(pageParam, search),
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
    gcTime: 10 * 60 * 1000,
  });
};
