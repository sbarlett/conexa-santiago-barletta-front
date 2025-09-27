"use client";
import Image from "next/image";
import type { Character } from "@/types/characters";
interface SelectionIndicatorProps {
  character: Character | null;
  label: string;
  onClear?: () => void;
}

export default function SelectionIndicator({ character, label, onClear }: SelectionIndicatorProps) {
  if (!character) {
    return (
      <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-600 rounded-lg">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-xs text-gray-500 mt-1">Seleccionar personaje</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center p-4 border-2 border-blue-400 rounded-lg bg-gray-800">
      <div className="flex items-center gap-3">
        <Image src={character.image} alt={character.name} width={40} height={40} className="rounded-full object-cover" />
        <div className="text-left">
          <p className="font-medium text-sm text-gray-100">{character.name}</p>
        </div>
        <button onClick={onClear} className="ml-2 text-red-400 hover:text-red-300 text-xs">
          ✕
        </button>
      </div>
    </div>
  );
}
