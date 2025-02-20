import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { useFavorites } from '../../../context/FavoritesContext';
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
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name: searchTerm }
  });
  const { favorites } = useFavorites();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const characters = data.characters.results;
  const favoriteCharacters = characters.filter(char => favorites.includes(char.id));
  const nonFavoriteCharacters = characters.filter(char => !favorites.includes(char.id));

  return (
    <div className="space-y-6">
      <div className="mb-4">
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
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-primary-700">Favorite Characters</h2>
          <div className="space-y-2">
            {favoriteCharacters.map(character => (
              <Item key={character.id} character={character} />
            ))}
          </div>
        </div>
      )}

      {/* Non-Favorites Section */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-primary-700">All Characters</h2>
        <div className="space-y-2">
          {nonFavoriteCharacters.map(character => (
            <Item key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Characters;