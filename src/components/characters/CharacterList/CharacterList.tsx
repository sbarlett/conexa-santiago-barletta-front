import VirtualizedCharacterGrid from "@/components/characters/CharacterList/VirtualizedCharacterGrid";
import { useCharacters } from "@/hooks/characters/useCharacters";
import { useDebounce } from "@/hooks/useDebounce";
import { Character } from "@/types/characters";
import { useState } from "react";
import SearchInput from "../../ui/SearchInput";

interface CharacterSelectorProps {
  title: string;
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
}

export default function CharacterList({ title, selectedCharacter, onCharacterSelect }: CharacterSelectorProps) {
  const selectorId = title.toLowerCase().replace(/[^a-z0-9]/g, "-");

  const [sarch, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(sarch, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCharacters(selectorId, debouncedSearch);

  const characters = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <SearchInput value={sarch} onSearch={setSearch} placeholder="Buscar personajes..." />
      <VirtualizedCharacterGrid
        characters={characters}
        selectedCharacter={selectedCharacter}
        onCharacterSelect={onCharacterSelect}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        selectorId={selectorId}
        isSearching={isLoading}
      />
    </div>
  );
}
