import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { useFavorites } from '../../../context/FavoritesContext';
import { Character, CharactersResponse } from '../../../types/character';
import Search from '../search/Search';
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
  const { favorites } = useFavorites();
  const { loading, error, data } = useQuery<CharactersResponse>(GET_CHARACTERS, {
    variables: { name: searchTerm }
  });

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
    <div className="py-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mx-4 mb-4">Rick and Morty list</h1>
      
      <div className="mx-4 mb-8">
        <Search value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div id='scroll' className='overflow-y-auto flex-1 px-4'>
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
          { error 
            ? <p>Error: {error.message}</p>
            : loading
              ? <p>Loading...</p>
              : characterList(nonFavoriteCharacters)
          }
        </div>
      </div>
    </div>
  );
}

export default Characters;