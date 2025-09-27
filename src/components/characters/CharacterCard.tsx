import Image from "next/image";
import StatusDot from "@/components/ui/StatusDot";
import { Character } from "@/types/characters";

interface Props {
  character: Character;
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
      <Image src={character.image} alt={character.name} width={200} height={200} className="object-cover w-full h-32 flex-shrink-0" />
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
