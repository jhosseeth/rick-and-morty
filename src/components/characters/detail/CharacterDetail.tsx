import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import { useViewport } from '../../../hooks/useViewport';
import { useFavorites } from '../../../context/FavoritesContext';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
`;

function CharacterDetail() {
  const { id } = useParams();
  const { isDesktop } = useViewport();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id }
  });
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data.character;
  const isCharacterFavorite = isFavorite(character.id);

  return (
    <div className="p-4">
      {!isDesktop && (
        <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 block">
          ← Back to Characters
        </Link>
      )}
      
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <img src={character.image} alt={character.name} className="rounded-lg w-full md:w-1/3" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
              <button 
                onClick={() => toggleFavorite(character.id)}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                {isCharacterFavorite ? (
                  <span className="text-2xl">❤️</span>
                ) : (
                  <span className="text-2xl">🤍</span>
                )}
              </button>
            </div>
            <div className="space-y-2">
              <p><span className="text-gray-400">Status:</span> {character.status}</p>
              <p><span className="text-gray-400">Species:</span> {character.species}</p>
              <p><span className="text-gray-400">Gender:</span> {character.gender}</p>
              <p><span className="text-gray-400">Origin:</span> {character.origin.name}</p>
              <p><span className="text-gray-400">Location:</span> {character.location.name}</p>
              {character.type && (
                <p><span className="text-gray-400">Type:</span> {character.type}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;