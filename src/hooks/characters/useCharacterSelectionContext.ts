import { Character } from "@/types/characters";
import { createContext, useContext } from "react";

interface CharacterSelectionContextType {
  character1: Character | null;
  character2: Character | null;
  selectCharacter1: (character: Character) => void;
  selectCharacter2: (character: Character) => void;
  clearCharacter1: () => void;
  clearCharacter2: () => void;
  clearAll: () => void;
}

const initialValues = {
  character1: null,
  character2: null,
  selectCharacter1: (_: Character) => {},
  selectCharacter2: (_: Character) => {},
  clearCharacter1: () => {},
  clearCharacter2: () => {},
  clearAll: () => {},
};

export const CharacterSelectionContext = createContext<CharacterSelectionContextType>(initialValues);

export const useCharacterSelectionContext = () => useContext(CharacterSelectionContext);
