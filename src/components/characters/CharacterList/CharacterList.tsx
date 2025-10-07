import { useMemo, useState } from "react";
import VirtualizedCharacterGrid from "@/components/characters/CharacterList/VirtualizedCharacterGrid";
import SearchInput from "@/components/ui/SearchInput";
import { useCharactersInfiniteScroll } from "@/hooks/characters/useCharactersInfiniteScroll";
import { useDebounce } from "@/hooks/useDebounce";
import { CharacterType } from "@/types/characters";

interface CharacterListProps {
  listKey: string;
  selectedCharacter: CharacterType | null;
  onCharacterSelect: (character: CharacterType) => void;
}

export default function CharacterList({ selectedCharacter, onCharacterSelect, listKey }: CharacterListProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCharactersInfiniteScroll(debouncedSearch);

  const characters = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data]);

  return (
    <div className="w-full">
      <SearchInput value={search} onSearch={setSearch} />
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
