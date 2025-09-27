import CharacterList from "@/components/characters/CharacterList/CharacterList";
import { useCharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";
import { CharacterListEnum } from "@/types/characters";

export default function CharactersGrid() {
  const { character1, character2, selectCharacter1, selectCharacter2 } = useCharacterSelectionContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <CharacterList
        listKey={CharacterListEnum.FIRST}
        title="Selecciona tu primer personaje"
        selectedCharacter={character1}
        onCharacterSelect={selectCharacter1}
      />
      <CharacterList
        listKey={CharacterListEnum.SECOND}
        title="Selecciona tu segundo personaje"
        selectedCharacter={character2}
        onCharacterSelect={selectCharacter2}
      />
    </div>
  );
}
