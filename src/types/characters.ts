export enum StatusEnum {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}

export enum SpeciesEnum {
  Human = "Human",
  Alien = "Alien",
  Robot = "Robot",
  MythologicalCreature = "Mythological Creature",
  Animal = "Animal",
  Disease = "Disease",
  Unknown = "unknown",
}

export interface Character {
  id: number;
  name: string;
  status: StatusEnum;
  species: SpeciesEnum;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
