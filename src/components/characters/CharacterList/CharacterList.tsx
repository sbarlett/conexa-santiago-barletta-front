import { useState } from "react";
import VirtualizedCharacterGrid from "@/components/characters/CharacterList/VirtualizedCharacterGrid";
import SearchInput from "@/components/ui/SearchInput";
import { useCharactersInfiniteScroll } from "@/hooks/characters/useCharacters";
import { useDebounce } from "@/hooks/useDebounce";
import { Character } from "@/types/characters";

interface CharacterSelectorProps {
  listKey: string;
  title: string;
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
}

export default function CharacterList({ title, selectedCharacter, onCharacterSelect, listKey }: CharacterSelectorProps) {
  const [sarch, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(sarch, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCharactersInfiniteScroll(listKey, debouncedSearch);

  const characters = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <SearchInput value={sarch} onSearch={setSearch} placeholder="Buscar personajes..." />
      <VirtualizedCharacterGrid
        selectorId={listKey}
        characters={characters}
        selectedCharacter={selectedCharacter}
        onCharacterSelect={onCharacterSelect}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
    </div>
  );
}
