import { Link } from 'react-router-dom';
import { useFavorites } from '../../../context/FavoritesContext';

interface Character {
    id: string;
    name: string;
    image: string;
    species: string;
}

interface ItemProps {
    character: Character;
}

function Item({ character }: ItemProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isCharacterFavorite = isFavorite(character.id);
    
    return (
        <div className="flex items-center justify-between bg-white hover:bg-gray-100 p-3 rounded-lg transition">
            <Link to={`/character/${character.id}`} key={character.id}>          
                <div className="flex items-center gap-3">
                    <img src={character.image} alt={character.name} className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="text-md font-semibold text-gray-800">{character.name}</h2>
                        <p className="text-sm text-gray-500">{character.species}</p>
                    </div>
                </div>
            </Link>

            <button onClick={(e) => {
                e.preventDefault();
                toggleFavorite(character.id);
            }}>
                {isCharacterFavorite ? (
                    <span className="text-green-500 text-lg">❤️</span>
                ) : (
                    <span className="text-gray-300 text-lg">🤍</span>
                )}
            </button>
        </div>
    );
}

export default Item;