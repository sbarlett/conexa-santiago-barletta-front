"use client";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { CharacterType } from "@/types/characters";
import { CharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";

export function CharacterSelectionProvider({ children }: { children: React.ReactNode }) {
  const [character1, setCharacter1] = useState<CharacterType | null>(null);
  const [character2, setCharacter2] = useState<CharacterType | null>(null);

  const selectCharacter = useCallback(
    (character: CharacterType, position: 1 | 2) => {
      const currentCharacter = position === 1 ? character2 : character1;
      const updateCharacter = position === 1 ? setCharacter1 : setCharacter2;
      if (currentCharacter?.id === character.id) {
        toast.error("Ese personaje ya está elegido, prueba con otro");
        return;
      }
      updateCharacter(character);
      toast.success(`Personaje #${position} seleccionado: ${character.name}`);
    },
    [character1, character2]
  );

  const clearCharacter = useCallback(
    (position: 1 | 2) => {
      const currentCharacter = position === 1 ? character1 : character2;
      const clearSelectedCharacter = position === 1 ? setCharacter1 : setCharacter2;
      if (currentCharacter) {
        clearSelectedCharacter(null);
        toast.warning(`Personaje #${position} eliminado: ${currentCharacter.name}`);
      }
    },
    [character1, character2]
  );

  const clearAll = useCallback(() => {
    if (character1 || character2) {
      setCharacter1(null);
      setCharacter2(null);
      toast.warning("Selección restablecida, elige nuevos personajes");
    }
  }, [character1, character2]);

  const value = {
    character1,
    character2,
    selectCharacter1: (char: CharacterType) => selectCharacter(char, 1),
    selectCharacter2: (char: CharacterType) => selectCharacter(char, 2),
    clearCharacter1: () => clearCharacter(1),
    clearCharacter2: () => clearCharacter(2),
    clearAll,
  };

  return <CharacterSelectionContext.Provider value={value}>{children}</CharacterSelectionContext.Provider>;
}
