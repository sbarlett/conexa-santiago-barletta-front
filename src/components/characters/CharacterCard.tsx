import Image from "next/image";
import StatusDot from "@/components/ui/StatusDot";
import { CharacterType } from "@/types/characters";

interface Props {
  character: CharacterType;
  selected?: boolean;
  onSelect: () => void;
}

export default function CharacterCard({ character, selected, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-card text-card-foreground w-full
        ${selected ? "border-2 border-blue-400 " : "border-border hover:border-primary/50"}`}
    >
      <div className="relative w-full aspect-square max-h-[300px]">
        <Image src={character.image} alt={character.name} className="object-cover" priority={false} fill />
      </div>
      <div className="p-3 text-left flex-grow">
        <h4 className="font-medium text-sm mb-1 text-foreground line-clamp-2">{character.name}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <StatusDot status={character.status} />
          <span className="truncate">
            {character.status} - {character.species}
          </span>
        </div>
      </div>
    </button>
  );
}
