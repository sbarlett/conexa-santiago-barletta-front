import CharacterSelector from "@/components/characters/CharacterPreview/CharacterSelector";
import { useCharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";

export default function CharacterPreview() {
  const { character1, character2, clearCharacter1, clearCharacter2, clearAll } = useCharacterSelectionContext();
  const hasCharacters = character1 || character2;
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
      <CharacterSelector character={character1} label="Personaje #1" onClear={clearCharacter1} />
      <CharacterSelector character={character2} label="Personaje #2" onClear={clearCharacter2} />
      {hasCharacters && (
      <button
          onClick={clearAll}
          className="px-4 py-2 text-sm text-destructive hover:text-destructive/80 border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors sm:self-stretch w-full sm:w-auto"
        >
          Restablecer
        </button>
      )}
    </div>
  );
}
