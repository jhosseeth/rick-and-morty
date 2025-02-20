import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { useFavorites } from '../../../context/FavoritesContext';
import { Character, CharactersResponse } from '../../../types/character';
import Item from '../item/Item';

const GET_CHARACTERS = gql`
  query GetCharacters($name: String) {
    characters(page: 1, filter: { name: $name }) {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

function Characters() {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery<CharactersResponse>(GET_CHARACTERS, {
    variables: { name: searchTerm }
  });
  const { favorites } = useFavorites();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const characters = data?.characters.results || [];
  const favoriteCharacters = characters.filter(char => favorites.includes(char.id));
  const nonFavoriteCharacters = characters.filter(char => !favorites.includes(char.id));

  const characterList = (items: Character[]) => (
    <>
      {items.map(character => (
        <Item key={character.id} character={character} />
      ))}
    </>
  );

  return (
    <div className="p-4">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search characters..."
          className="w-full p-2 rounded-lg bg-white border border-gray-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Favorites Section */}
      {favoriteCharacters.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-primary-700">Starred Characters ({favoriteCharacters.length})</h2>
          {characterList(favoriteCharacters)}
        </div>
      )}

      {/* Non-Favorites Section */}
      <div className="">
        <h2 className="text-lg font-semibold text-primary-700">Characters ({nonFavoriteCharacters.length})</h2>
        {characterList(nonFavoriteCharacters)}
      </div>
    </div>
  );
}

export default Characters;