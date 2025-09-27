"use client";
import { useCharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";
import { useEpisodeComparison } from "@/hooks/episodes/useEpisodeComparison";
import EpisodeStatsEmptyState from "./EpisodeStatsEmptyState";

export default function EpisodeStats() {
  const { character1, character2 } = useCharacterSelectionContext();
  const { character1Only, character2Only, shared, isLoading } = useEpisodeComparison(character1, character2);

  const totalEpisodes1 = character1Only.length + shared.length;
  const totalEpisodes2 = character2Only.length + shared.length;
  const sharedPercentage = character1 && character2 ? Math.round((shared.length / Math.max(totalEpisodes1, totalEpisodes2)) * 100) : 0;

  if (!character1 || !character2) {
    return <EpisodeStatsEmptyState />;
  }
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="font-semibold text-center mb-3 text-gray-100">Estadísticas de Episodios</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center text-sm">
        {character1 && (
          <div>
            <p className="font-medium text-blue-400">{totalEpisodes1}</p>
            <p className="text-gray-300">Total de {character1.name}</p>
          </div>
        )}
        {character2 && (
          <div>
            <p className="font-medium text-green-400">{totalEpisodes2}</p>
            <p className="text-gray-300">Total de {character2.name}</p>
          </div>
        )}
        {character1 && character2 && (
          <>
            <div>
              <p className="font-medium text-purple-400">{shared.length}</p>
              <p className="text-gray-300">Episodios Compartidos</p>
            </div>
            <div>
              <p className="font-medium text-orange-400">{sharedPercentage}%</p>
              <p className="text-gray-300">Coincidencia</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
