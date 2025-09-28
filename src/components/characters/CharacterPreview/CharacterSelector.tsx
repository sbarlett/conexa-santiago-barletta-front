import Image from "next/image";
import { CharacterType } from "@/types/characters";
import { X } from "lucide-react";

interface CharacterSelectorProps {
  character: CharacterType | null;
  label: string;
  onClear?: () => void;
}

export default function CharacterSelector({ character, label, onClear }: CharacterSelectorProps) {
  if (!character) {
    return (
      <div className="flex flex-col items-center p-3 border-2 border-dashed border-gray-600 rounded-lg">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-xs text-gray-500 mt-1">Seleccionar personaje</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center p-3 border-2 border-blue-400 rounded-lg bg-gray-800">
      <div className="flex items-center gap-3">
        <Image src={character.image} alt={character.name} width={35} height={35} className="rounded-full object-cover" />
        <div className="text-left">
          <p className="font-medium text-sm text-gray-100">{character.name}</p>
        </div>
        <button onClick={onClear} className="ml-2 text-red-400 hover:text-red-300 text-xs">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
