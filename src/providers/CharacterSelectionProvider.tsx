import { useState, useCallback } from "react";

import { toast } from "sonner";
import { Character } from "@/types/characters";
import { CharacterSelectionContext } from "@/hooks/characters/useCharacterSelectionContext";

export function CharacterSelectionProvider({ children }: { children: React.ReactNode }) {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);

  const selectCharacter1 = useCallback(
    (character: Character) => {
      if (character2 && character2.id === character.id) {
        toast.error("Personaje ya seleccionado");
        return;
      }

      setCharacter1(character);
      toast.success(`Personaje #1 seleccionado: ${character.name}`);
    },
    [character2]
  );

  const selectCharacter2 = useCallback(
    (character: Character) => {
      if (character1 && character1.id === character.id) {
        toast.error("Personaje ya seleccionado");
        return;
      }
      setCharacter2(character);
      toast.success(`Personaje #2 seleccionado: ${character.name}`);
    },
    [character1]
  );

  const clearCharacter1 = useCallback(() => {
    const characterName = character1?.name;
    setCharacter1(null);
    if (characterName) {
      toast.success(`Personaje #1 removido: ${characterName}`);
    }
  }, [character1]);

  const clearCharacter2 = useCallback(() => {
    const characterName = character2?.name;
    setCharacter2(null);
    if (characterName) {
      toast.success(`Personaje #2 removido: ${characterName}`);
    }
  }, [character2]);

  const clearAll = useCallback(() => {
    const hasCharacters = character1 || character2;
    setCharacter1(null);
    setCharacter2(null);
    if (hasCharacters) {
      toast.success("Selección limpiada");
    }
  }, [character1, character2]);

  const value = { character1, character2, selectCharacter1, selectCharacter2, clearCharacter1, clearCharacter2, clearAll };
  return <CharacterSelectionContext.Provider value={value}>{children}</CharacterSelectionContext.Provider>;
}
