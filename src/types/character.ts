export type Species = 'human' | 'alien' | 'all';
export type CharacterType = 'all' | 'starred' | 'others';
export type FilterOption = Species | CharacterType;

export interface Character {
  id: string;
  name: string;
  image: string;
  species: Species;
}

export interface CharactersResponse {
  characters: {
    results: Character[];
  };
}