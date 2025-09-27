"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect, useCallback } from "react";
import CharacterCard from "@/components/characters/CharacterCard";
import type { Character } from "@/types/characters";
import { getEstimatedRowHeight, getItemsPerRow } from "@/utils";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import SearchInput from "../ui/SearchInput";

interface VirtualizedCharacterGridProps {
  characters: Character[];
  selectedCharacter?: Character;
  onCharacterSelect: (character: Character) => void;
  title: string;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  selectorId?: string;
  onSearch: (query: string) => void;
  searchQuery: string;
  isSearching?: boolean;
}

export default function VirtualizedCharacterGrid({
  characters,
  selectedCharacter,
  onCharacterSelect,
  title,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  selectorId = "grid",
  onSearch,
  searchQuery,
  isSearching,
}: VirtualizedCharacterGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const breakpoint = useBreakpoint();
  const itemsPerRow = getItemsPerRow(breakpoint);

  const totalRows = Math.ceil(characters.length / itemsPerRow);
  const rowCount = hasNextPage ? totalRows + 1 : totalRows;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => getEstimatedRowHeight(breakpoint), [breakpoint]),
    overscan: 2,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) return;
    const isLoaderRow = lastItem.index === totalRows;
    if (isLoaderRow && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.();
    }
  }, [rowVirtualizer.getVirtualItems(), totalRows, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="mb-4">
        <SearchInput placeholder="Buscar personajes..." onSearch={onSearch} value={searchQuery} />
      </div>
      {isSearching ? (
        <div className="w-full">
          <div className="flex justify-center items-center h-96 border border-gray-700 bg-gray-900 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </div>
      ) : characters.length === 0 ? (
        <div className="w-full">
          <div className="flex justify-center items-center h-96 border border-gray-700 bg-gray-900 rounded-lg">
            <p className="text-center text-gray-500">No se encontraron personajes.</p>
          </div>
        </div>
      ) : (
        <div ref={parentRef} className="w-full flex flex-col overflow-auto h-[450px]">
          <div className="relative w-full" style={{ height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * itemsPerRow;
              const rowCharacters = characters.slice(startIndex, startIndex + itemsPerRow);
              return (
                <div
                  key={virtualRow.key}
                  ref={rowVirtualizer.measureElement}
                  className="absolute left-0 w-full"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  <div className={`grid grid-cols-3 gap-4 py-4`}>
                    {rowCharacters.map((character) => (
                      <CharacterCard
                        key={`${selectorId}-char-${character.id}`}
                        character={character}
                        selected={selectedCharacter?.id === character.id}
                        onSelect={() => onCharacterSelect(character)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
