import { Link } from 'react-router-dom';
import { useFavorites } from '../../../context/FavoritesContext';
import { CharacterItem } from '../../../types/character';
import heartIcon from '../../../assets/icons/heart.svg';
import favoriteIcon from '../../../assets/icons/heart-fill.svg';

interface ItemProps {
    character: CharacterItem;
}

function Item({ character }: ItemProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isCharacterFavorite = isFavorite(character.id);
    
    return (
        <div className="px-4 rounded-lg hover:bg-[#EEE3FF] transition">
            <div className='grid grid-cols-[1fr_40px] py-3 border-t border-gray-100'>
                <Link to={`/character/${character.id}`} key={character.id}>          
                    <div className="flex items-center gap-3">
                        <img src={character.image} alt={character.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <h2 className="text-md font-semibold text-gray-800">{character.name}</h2>
                            <p className="text-sm text-gray-500">{character.species}</p>
                        </div>
                    </div>
                </Link>

                <div className='flex items-center'>
                    <button
                        className="flex justify-center items-center w-8 h-8 pt-0.5 bg-white rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(character.id);
                        }}
                    >
                        <img 
                            src={isCharacterFavorite? favoriteIcon : heartIcon} 
                            alt="Toogle favorite" 
                            className={`w-5 h-5 cursor-pointer`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Item;