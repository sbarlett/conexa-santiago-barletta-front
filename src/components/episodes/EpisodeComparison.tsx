"use client";
import EpisodeList from "@/components/episodes/EpisodeList";
import { useEpisodeComparison } from "@/hooks/episodes/useEpisodeComparison";
import type { Character } from "@/types/characters";
import EpisodeStatsEmptyState from "./EpisodeStats/EpisodeStatsEmptyState";

interface EpisodeComparisonProps {
  character1: Character | null;
  character2: Character | null;
}

export default function EpisodeComparison({ character1, character2 }: EpisodeComparisonProps) {
  const { character1Only, character2Only, shared, isLoading } = useEpisodeComparison(character1, character2);

  if (!character1 || !character2) {
    return <EpisodeStatsEmptyState />;
  }
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Comparación de Episodios</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EpisodeList
          episodes={character1Only}
          title={`Episodios de ${character1?.name || "Personaje #1"}`}
          emptyMessage="Este personaje no tiene episodios solo"
          isLoading={isLoading && !!character1}
        />
        <EpisodeList
          episodes={shared}
          title="Episodios Compartidos"
          emptyMessage="Estos personajes nunca se encontraron"
          isLoading={isLoading && !!character1 && !!character2}
        />
        <EpisodeList
          episodes={character2Only}
          title={`Episodios de ${character2?.name || "Personaje #2"}`}
          emptyMessage="Este personaje no tiene episodios solo"
          isLoading={isLoading && !!character2}
        />
      </div>
    </div>
  );
}
