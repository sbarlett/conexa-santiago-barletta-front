"use client";

import { useCharacterSelection } from "@/hooks/useCharacterSelection";

import EpisodeStats from "@/components/organisms/EpisodeStats/EpisodeStats";
import Logo from "@/components/atoms/Logo";
import SelectionIndicator from "@/components/molecules/SelectionIndicator";
import CharacterList from "@/components/organisms/CharacterList";
import EpisodeComparison from "@/components/organisms/EpisodeComparison";

export default function HomePage() {
  const { character1, character2, selectCharacter1, selectCharacter2, clearCharacter1, clearCharacter2, clearAll } = useCharacterSelection();
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <Logo />
        <div className="flex justify-center gap-4 mb-8">
          <SelectionIndicator character={character1} label="Personaje #1" onClear={clearCharacter1} />
          <SelectionIndicator character={character2} label="Personaje #2" onClear={clearCharacter2} />
          {(character1 || character2) && (
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm text-destructive hover:text-destructive/80 border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors"
            >
              Limpiar Todo
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CharacterList title="Personaje #1" selectedCharacter={character1 || undefined} onCharacterSelect={selectCharacter1} />
          <CharacterList title="Personaje #2" selectedCharacter={character2 || undefined} onCharacterSelect={selectCharacter2} />
        </div>
        <EpisodeStats character1={character1} character2={character2} />
        <EpisodeComparison character1={character1} character2={character2} />
      </div>
    </main>
  );
}
