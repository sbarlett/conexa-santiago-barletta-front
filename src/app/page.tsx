"use client";
import CharacterPreview from "@/components/characters/CharacterPreview/CharacterPreview";
import CharactersGrid from "@/components/characters/CharactersGrid";
import EpisodeComparison from "@/components/episodes/EpisodeComparison";
import EpisodeStats from "@/components/episodes/EpisodeStats/EpisodeStats";
import { CharacterSelectionProvider } from "@/providers/CharacterSelectionProvider";

export default function Page() {
  return (
    <section className="container mx-auto px-8 md:px-4 max-w-7xl">
      <h1 className="text-lg max-w-2xl mx-auto text-center mb-8 text-gray-300">
        Selecciona dos personajes para descubrir en qué episodios aparecen juntos y ver estadísticas detalladas de sus aventuras.
      </h1>
      <CharacterSelectionProvider>
        <CharacterPreview />
        <CharactersGrid />
        <EpisodeStats />
        <EpisodeComparison />
      </CharacterSelectionProvider>
    </section>
  );
}
