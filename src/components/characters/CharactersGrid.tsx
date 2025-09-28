import CharacterList from "@/components/characters/CharacterList/CharacterList";
import { useCharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";
import { CharacterListEnum } from "@/types/characters";

export default function CharactersGrid() {
  const { character1, character2, selectCharacter1, selectCharacter2 } = useCharacterSelectionContext();

  const characterLists = [
    { key: CharacterListEnum.FIRST, character: character1, onSelect: selectCharacter1 },
    { key: CharacterListEnum.SECOND, character: character2, onSelect: selectCharacter2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {characterLists.map(({ key, character, onSelect }) => (
        <CharacterList key={key} listKey={key} selectedCharacter={character} onCharacterSelect={onSelect} />
      ))}
    </div>
  );
}
