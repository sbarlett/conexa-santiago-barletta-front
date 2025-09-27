import { useCallback, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import CharacterCard from "@/components/characters/CharacterCard";
import EmptyCard from "@/components/ui/EmptyCard";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { getEstimatedRowHeight, getGridColumnsClass, getItemsPerRow } from "@/utils";
import { Character } from "@/types/characters";

interface VirtualizedCharacterGridProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  selectorId?: string;
  isLoading?: boolean;
}

export default function VirtualizedCharacterGrid({
  characters,
  selectedCharacter,
  onCharacterSelect,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  selectorId,
  isLoading,
}: VirtualizedCharacterGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const breakpoint = useBreakpoint();
  const itemsPerRow = getItemsPerRow(breakpoint);
  const gridColumnsClass = getGridColumnsClass(breakpoint);

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
    <div ref={parentRef} className="w-full flex flex-col overflow-auto h-[450px] mt-4">
      {isLoading ? (
        <EmptyCard loading />
      ) : characters.length === 0 ? (
        <EmptyCard text="Parece que no hay personajes que coincidan con tu búsqueda." />
      ) : (
        <div className="relative w-full" style={{ height: rowVirtualizer.getTotalSize() }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * itemsPerRow;
            const rowCharacters = characters.slice(startIndex, startIndex + itemsPerRow);
            return (
              <div
                key={virtualRow.key}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                className="absolute left-0 w-full"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                <div className={`grid ${gridColumnsClass} gap-4 py-4 pr-1`}>
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
      )}
    </div>
  );
}
