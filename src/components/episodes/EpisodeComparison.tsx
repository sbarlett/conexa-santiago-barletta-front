import EpisodeList from "@/components/episodes/EpisodeList";
import { useCharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";
import { useEpisodeComparison } from "@/hooks/episodes/useEpisodeComparison";

export default function EpisodeComparison() {
  const { character1, character2 } = useCharacterSelectionContext();
  const { character1Only, character2Only, shared, isLoading } = useEpisodeComparison(character1, character2);

  if (!character1 || !character2) return null;
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Análisis de episodios</h2>
      <p className="text-center text-muted-foreground mb-8">
        Descubre los episodios compartidos entre {character1.name} y {character2.name}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EpisodeList
          episodes={character1Only}
          title={`Solo ${character1.name}`}
          emptyMessage="Este personaje no tiene episodios únicos"
          isLoading={isLoading}
        />
        <EpisodeList episodes={shared} title="Episodios compartidos" emptyMessage="Estos personajes nunca aparecieron juntos" isLoading={isLoading} />
        <EpisodeList
          episodes={character2Only}
          title={`Solo ${character2.name}`}
          emptyMessage="Este personaje no tiene episodios únicos"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
