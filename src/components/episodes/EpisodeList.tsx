import Image from "next/image";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import { EpisodeType } from "@/types/episodes";
interface EpisodeListProps {
  episodes: EpisodeType[];
  title: string;
  emptyMessage: string;
  isLoading?: boolean;
}

export default function EpisodeList({ episodes, title, emptyMessage, isLoading = false }: EpisodeListProps) {
  const episodeCount = episodes.length;
  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold mb-4 text-center px-2 text-gray-100">{title}</h3>
      <div className="h-80 overflow-y-auto border border-gray-700 rounded-lg bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400" />
          </div>
        ) : episodeCount === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-gray-400 text-sm space-y-3">
            <Image src="/ghost.png" alt="Not Found" width={100} height={64} />
            <p className="text-center px-4">{emptyMessage}</p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {episodes.map(episode => <EpisodeCard key={episode.id} episode={episode} />)}
          </div>
        )}
      </div>
      {episodeCount > 0 && (
        <p className="text-xs text-gray-400 text-center mt-2">
          {episodeCount} {episodeCount === 1 ? "episodio" : "episodios"}
        </p>
      )}
    </div>
  );
}
