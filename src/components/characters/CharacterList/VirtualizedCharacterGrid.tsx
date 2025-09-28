import { useCallback, useEffect, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import CharacterCard from "@/components/characters/CharacterCard";
import EmptyCard from "@/components/ui/EmptyCard";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { getEstimatedRowHeight, getGridColumnsClass, getItemsPerRow } from "@/utils";
import { CharacterType } from "@/types/characters";

interface VirtualizedCharacterGridProps {
  characters: CharacterType[];
  selectedCharacter: CharacterType | null;
  onCharacterSelect: (character: CharacterType) => void;
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
  const breakpoint = useBreakpoint();

  const { itemsPerRow, gridColumnsClass, totalRows } = useMemo(
    () => ({
      itemsPerRow: getItemsPerRow(breakpoint),
      gridColumnsClass: getGridColumnsClass(breakpoint),
      totalRows: Math.ceil(characters.length / getItemsPerRow(breakpoint)),
    }),
    [breakpoint, characters.length]
  );

  const parentRef = useRef<HTMLDivElement>(null);
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

  if (isLoading) return <EmptyCard loading />;
  if (characters.length === 0) return <EmptyCard text="No hay personajes que coincidan con tu búsqueda." />;
  return (
    <div ref={parentRef} className="w-full flex flex-col overflow-auto h-[450px] mt-4">
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
    </div>
  );
}
