"use client";
import CharacterPreview from "@/components/characters/CharacterPreview/CharacterPreview";
import CharactersGrid from "@/components/characters/CharactersGrid";
import EpisodeComparison from "@/components/episodes/EpisodeComparison";
import EpisodeStats from "@/components/episodes/EpisodeStats/EpisodeStats";
import { CharacterSelectionProvider } from "@/providers/CharacterSelectionProvider";

export default function Page() {
  return (
    <CharacterSelectionProvider>
      <div className="container mx-auto px-4 max-w-7xl">
        <CharacterPreview />
        <CharactersGrid />
        <EpisodeStats />
        <EpisodeComparison />
      </div>
    </CharacterSelectionProvider>
  );
}
