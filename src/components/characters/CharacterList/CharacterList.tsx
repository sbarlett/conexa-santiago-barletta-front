import VirtualizedCharacterGrid from "@/components/characters/CharacterList/VirtualizedCharacterGrid";
import SearchInput from "@/components/ui/SearchInput";
import { useCharactersInfiniteScroll } from "@/hooks/characters/useCharactersInfiniteScroll";
import { useDebounce } from "@/hooks/useDebounce";
import { CharacterType } from "@/types/characters";
import { useMemo, useState } from "react";

interface CharacterSelectorProps {
  listKey: string;
  selectedCharacter: CharacterType | null;
  onCharacterSelect: (character: CharacterType) => void;
}

export default function CharacterList({ selectedCharacter, onCharacterSelect, listKey }: CharacterSelectorProps) {
  const [sarch, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(sarch, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCharactersInfiniteScroll(listKey, debouncedSearch);

  const characters = useMemo(() => data?.pages.flatMap((page) => page.results) || [], [data]);

  return (
    <div className="w-full">
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
