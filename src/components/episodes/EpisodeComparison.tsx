import EpisodeList from "@/components/episodes/EpisodeList";
import { useCharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";
import { useEpisodeComparison } from "@/hooks/episodes/useEpisodeComparison";

export default function EpisodeComparison() {
  const { character1, character2 } = useCharacterSelectionContext();
  const { character1Only, character2Only, shared, isLoading } = useEpisodeComparison(character1, character2);

  if (!character1 || !character2) {
    return null;
  }
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Comparación de Episodios</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EpisodeList
          episodes={character1Only}
          title={`Aparece solo ${character1?.name}`}
          emptyMessage="Este personaje no tiene episodios solo"
          isLoading={isLoading && !!character1}
        />
        <EpisodeList
          episodes={shared}
          title="Aparecen ambos personajes"
          emptyMessage="Estos personajes nunca se encontraron"
          isLoading={isLoading && !!character1 && !!character2}
        />
        <EpisodeList
          episodes={character2Only}
          title={`Aparece solo ${character2?.name}`}
          emptyMessage="Este personaje no tiene episodios solo"
          isLoading={isLoading && !!character2}
        />
      </div>
    </div>
  );
}
