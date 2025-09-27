"use client";

import { useState, useCallback } from "react";
import type { Character } from "@/types/characters";
import { toast } from "sonner";

export const useCharacterSelection = () => {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);

  const selectCharacter1 = useCallback(
    (character: Character) => {
      if (character2 && character2.id === character.id) {
        toast.error("Personaje ya seleccionado");
        return;
      }

      setCharacter1(character);
      // toast({
      //   title: "Personaje #1 seleccionado",
      //   description: `${character.name} ha sido agregado como Personaje #1`,
      //   variant: "success",
      // })
      toast.success(`Personaje #1 seleccionado: ${character.name}`);
    },
    [character2]
  );

  const selectCharacter2 = useCallback(
    (character: Character) => {
      if (character1 && character1.id === character.id) {
        // toast({
        //   title: "Personaje ya seleccionado",
        //   description: `${character.name} ya está seleccionado como Personaje #1`,
        //   variant: "destructive",
        // })
        toast.error("Personaje ya seleccionado");
        return;
      }

      setCharacter2(character);
      // toast({
      //   title: "Personaje #2 seleccionado",
      //   description: `${character.name} ha sido agregado como Personaje #2`,
      //   variant: "success",
      // })
      toast.success(`Personaje #2 seleccionado: ${character.name}`);
    },
    [character1]
  );

  const clearCharacter1 = useCallback(() => {
    const characterName = character1?.name;
    setCharacter1(null);
    if (characterName) {
      // toast({
      //   title: "Personaje #1 removido",
      //   description: `${characterName} ha sido removido de la selección`,
      // })
      toast.success(`Personaje #1 removido: ${characterName}`);
    }
  }, [character1]);

  const clearCharacter2 = useCallback(() => {
    const characterName = character2?.name;
    setCharacter2(null);
    if (characterName) {
      // toast({
      //   title: "Personaje #2 removido",
      //   description: `${characterName} ha sido removido de la selección`,
      // })
      toast.success(`Personaje #2 removido: ${characterName}`);
    }
  }, [character2]);

  const clearAll = useCallback(() => {
    const hasCharacters = character1 || character2;
    setCharacter1(null);
    setCharacter2(null);
    if (hasCharacters) {
      // toast({
      //   title: "Selección limpiada",
      //   description: "Todos los personajes han sido removidos de la selección",
      // })
      toast.success("Selección limpiada");
    }
  }, [character1, character2]);

  return {
    character1,
    character2,
    selectCharacter1,
    selectCharacter2,
    clearCharacter1,
    clearCharacter2,
    clearAll,
    hasSelection: character1 !== null || character2 !== null,
    hasBothSelections: character1 !== null && character2 !== null,
  };
};
