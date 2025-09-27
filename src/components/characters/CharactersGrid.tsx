import CharacterList from "@/components/characters/CharacterList/CharacterList";
import { useCharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";

export default function CharactersGrid() {
  const { character1, character2, selectCharacter1, selectCharacter2 } = useCharacterSelectionContext();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <CharacterList title="Personaje #1" selectedCharacter={character1} onCharacterSelect={selectCharacter1} />
      <CharacterList title="Personaje #2" selectedCharacter={character2} onCharacterSelect={selectCharacter2} />
    </div>
  );
}
