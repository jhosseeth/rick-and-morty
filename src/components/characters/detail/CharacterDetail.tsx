import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import { useViewport } from '../../../hooks/useViewport';
import { useFavorites } from '../../../context/FavoritesContext';
import { Character, CharacterResponse } from '../../../types/character';
import favoriteIcon from '../../../assets/icons/heart-fill.svg';
import heartIcon from '../../../assets/icons/heart.svg';
import backIcon from '../../../assets/icons/back.svg';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
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
  const { loading, error, data } = useQuery<CharacterResponse>(GET_CHARACTER, {
    variables: { id }
  });
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character: Character = data?.character as Character;
  const isCharacterFavorite = isFavorite(character.id);

  const DetailItem = ({ label, value }: { label: string, value: string }) => (
    <div className="border-b border-gray-100 m-0 py-4">
      <h3 className="font-medium">{label}</h3>
      <p className="text-gray-500">{value}</p>
    </div>
  );

  return (
    <div className="p-8">
      {!isDesktop && (
        <Link to="/" className="inline-flex items-center justify-center w-8 h-8 mb-4">
          <img 
            src={backIcon} 
            alt="Filter" 
            className="w-5 h-5"
          />
        </Link>
      )}
      
      <div id="avatar" className="flex flex-col items-center md:items-start text-center md:text-left mb-8">
        <div className="relative mb-4">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-32 h-32 rounded-full" 
          />
          <button 
            onClick={() => toggleFavorite(character.id)}
            className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full cursor-pointer"
          >
            <img 
              src={isCharacterFavorite? favoriteIcon : heartIcon} 
              alt="Favorite" 
              className={`w-6 h-6`}
            />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{character.name}</h1>
      </div>

      <div className="space-y-6">
        <DetailItem label="Specie" value={character.species} />
        <DetailItem label="Status" value={character.status} />
        <DetailItem label="Gender" value={character.gender} />
        <DetailItem label="Origin" value={character.origin.name} />
        <DetailItem label="Location" value={character.location.name} />
      </div>
    </div>
  );
}

export default CharacterDetail;