import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { useFavorites } from '../../../context/FavoritesContext';
import { 
  Species,
  CharacterType,
  CharacterItem,
  CharactersListResponse,
} from '../../../types/character';
import Search from '../search/Search';
import Item from '../item/Item';

const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $species: String) {
    characters(page: 1, filter: { name: $name, species: $species }) {
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
  const [activeFilters, setActiveFilters] = useState({
    species: 'all',
    characterType: 'all'
  });
  const { favorites } = useFavorites();
  const { loading, error, data } = useQuery<CharactersListResponse>(GET_CHARACTERS, {
    variables: { 
      name: searchTerm,
      species: activeFilters.species === 'all' ? null : activeFilters.species
    }
  });

  const characters = data?.characters.results || [];
  const favoriteCharacters = characters.filter(char => favorites.includes(char.id));
  const nonFavoriteCharacters = characters.filter(char => !favorites.includes(char.id));

  const handleFilters = (filters: { species: Species; characterType: CharacterType }) => {
    setActiveFilters(filters);
  };

  console.log('activeFilters', activeFilters);

  const characterList = (items: CharacterItem[]) => (
    <>
      {items.map(character => (
        <Item key={character.id} character={character} />
      ))}
    </>
  );

  return (
    <div className="py-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mx-4 mb-4">Rick and Morty list</h1>
      
      <div className="mx-4 mb-4">
        <Search 
          value={searchTerm} 
          onChange={setSearchTerm}
          onApplyFilters={handleFilters}
        />
      </div>

      <div id='scroll' className='overflow-y-auto flex-1 px-4 custom-scroll'>
        {/* Favorites Section */}
        {favoriteCharacters.length > 0 && activeFilters.characterType !== 'others' && (
          <div className="mb-8">
            <h2 className="uppercase text-xs px-4 my-6">Starred Characters ({favoriteCharacters.length})</h2>
            {characterList(favoriteCharacters)}
          </div>
        )}

        {/* Non-Favorites Section */}
        {activeFilters.characterType !== 'starred' && (
          <div>
            <h2 className="uppercase text-xs px-4 my-6">Characters ({nonFavoriteCharacters.length})</h2>
            { error 
              ? <p>Error: {error.message}</p>
              : loading
                ? <p>Loading...</p>
                : characterList(nonFavoriteCharacters)
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default Characters;