import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "@/services/api";

export const useCharactersInfiniteScroll = (queryKey: string, search: string) => {
  return useInfiniteQuery({
    queryKey: ["characters", queryKey, search],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await getCharacters(pageParam, search);
      } catch (err: any) {
        return err.status === 404 ? { info: { pages: 0, next: null }, results: [] } : Promise.reject(err);
      }
    },
    retry: (failureCount, error: any) => error?.status !== 404 && failureCount < 1,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.info?.next;
      return nextUrl ? Number.parseInt(new URL(nextUrl).searchParams.get("page") || "1") : undefined;
    },
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
  });
};
