import { createContext, useContext } from "react";
import { CharacterType } from "@/types/characters";

interface CharacterSelectionContextType {
  character1: CharacterType | null;
  character2: CharacterType | null;
  selectCharacter1: (character: CharacterType) => void;
  selectCharacter2: (character: CharacterType) => void;
  clearCharacter1: () => void;
  clearCharacter2: () => void;
  clearAll: () => void;
}

export const CharacterSelectionContext = createContext<CharacterSelectionContextType | undefined>(undefined);

export const useCharacterSelectionContext = () => {
  const context = useContext(CharacterSelectionContext);
  if (context === undefined) {
    throw new Error('useCharacterSelectionContext must be used within a CharacterSelectionProvider');
  }
  return context;
};