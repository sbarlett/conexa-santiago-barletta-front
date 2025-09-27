import { Episode } from "@/types/episodes";


export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="p-3 border border-border bg-card rounded-lg hover:bg-accent transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm text-foreground line-clamp-2">{episode.name}</h4>
        <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{episode.episode}</span>
      </div>
      <p className="text-xs text-muted-foreground">{episode.air_date}</p>
    </div>
  );
}
