export type Species = 'human' | 'alien' | 'all';
export type CharacterType = 'all' | 'starred' | 'others'; // Favorito
export type FilterOption = Species | CharacterType;

export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: 'Human' | 'Alien' ;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
}

export type CharacterItem = Pick<Character, "id" | "name" | "image" | "species">;

export interface CharacterResponse {
  character: Character;
}

export interface CharactersListResponse {
  characters: {
    results: CharacterItem[];
  };
}