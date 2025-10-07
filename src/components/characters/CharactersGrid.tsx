"use client"
import CharacterList from "@/components/characters/CharacterList/CharacterList";
import { useCharacterSelectionContext } from "@/hooks/useCharacterSelectionContext";
import { CharacterListEnum } from "@/types/characters";

export default function CharactersGrid() {
  const { character1, character2, selectCharacter1, selectCharacter2 } = useCharacterSelectionContext();

  const characterLists = [
    { 
      key: CharacterListEnum.FIRST, 
      character: character1, 
      onSelect: selectCharacter1,
      title: "Listado de Personajes 1"
    },
    { 
      key: CharacterListEnum.SECOND, 
      character: character2, 
      onSelect: selectCharacter2,
      title: "Listado de Personajes 2"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {characterLists.map(({ key, character, onSelect, title }) => (
        <div key={key} className="space-y-4">
          <h2 className="text-lg text-center text-gray-300">
            {title}
          </h2>
          <CharacterList 
            listKey={key} 
            selectedCharacter={character} 
            onCharacterSelect={onSelect} 
          />
        </div>
      ))}
    </div>
  );
}
