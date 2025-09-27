"use client";

import type { Character } from "@/types/characters";
import VirtualizedCharacterGrid from "@/components/characters/VirtualizedCharacterGrid";
import { useCharacters } from "@/hooks/characters/useCharacters";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface CharacterSelectorProps {
  title: string;
  selectedCharacter?: Character;
  onCharacterSelect: (character: Character) => void;
}

export default function CharacterList({ title, selectedCharacter, onCharacterSelect }: CharacterSelectorProps) {
  const selectorId = title.toLowerCase().replace(/[^a-z0-9]/g, "-");

  const [sarch, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(sarch, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCharacters(selectorId, debouncedSearch);

  const characters = data?.pages.flatMap((page) => page.results) || [];
  
  return (
    <VirtualizedCharacterGrid
      characters={characters}
      selectedCharacter={selectedCharacter}
      onCharacterSelect={onCharacterSelect}
      title={title}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      selectorId={selectorId}
      onSearch={setSearch}
      searchQuery={sarch}
      isSearching={isLoading}
    />
  );
}
