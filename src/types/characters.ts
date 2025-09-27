export enum CharacterListEnum {
  FIRST = "character1",
  SECOND = "character2",
}

export enum StatusEnum {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
export interface CharacterType {
  id: number;
  name: string;
  status: StatusEnum;
  species: string;
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

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: any[];
}