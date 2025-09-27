import type { Episode } from "@/types/characters";
import { GhostIcon } from "@/components/atoms/EmptyStateIcons";
import EpisodeCard from "@/components/molecules/EpisodeCard";

interface EpisodeListProps {
  episodes: Episode[];
  title: string;
  emptyMessage: string;
  isLoading: boolean;
}

export default function EpisodeList({ episodes, title, emptyMessage, isLoading = false }: EpisodeListProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold mb-4 text-center px-2 text-gray-100">{title}</h3>
      <div className="h-80 overflow-y-auto border border-gray-700 rounded-lg bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        ) : episodes.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-gray-400 text-sm space-y-3">
            <GhostIcon className="w-20 h-20" />
            <div className="text-center px-4">{emptyMessage || "No se encontraron episodios"}</div>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </div>
      {episodes.length > 0 && (
        <p className="text-xs text-gray-400 text-center mt-2">
          {episodes.length} {episodes.length !== 1 ? "episodios" : "episodio"}
        </p>
      )}
    </div>
  );
}
