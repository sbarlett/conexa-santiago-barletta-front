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

const initialValues = {
  character1: null,
  character2: null,
  selectCharacter1: (_: CharacterType) => {},
  selectCharacter2: (_: CharacterType) => {},
  clearCharacter1: () => {},
  clearCharacter2: () => {},
  clearAll: () => {},
};

export const CharacterSelectionContext = createContext<CharacterSelectionContextType>(initialValues);

export const useCharacterSelectionContext = () => useContext(CharacterSelectionContext);
