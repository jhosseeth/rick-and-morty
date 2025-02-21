import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  CharacterType,
  FilterOption,
  Species
} from '../../../types/character';
import backIcon from '../../../assets/icons/back.svg';

interface FilterProps {
  isOpen: boolean;
  onApplyFilters: (filters: { species: Species; characterType: CharacterType }) => void;
}

function Filter({ isOpen, onApplyFilters }: FilterProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<Species>('all');
  const [selectedCharacterType, setSelectedCharacterType] = useState<CharacterType>('all');
  const [initialState, setInitialState] = useState({
    species: 'all' as Species,
    characterType: 'all' as CharacterType
  });

  // Store initial state when filter opens
  useEffect(() => {
    if (isOpen) {
      setInitialState({
        species: selectedSpecies,
        characterType: selectedCharacterType
      });
    }
  }, [isOpen]);

  // Check if current values are different from initial state
  const hasChanges = selectedSpecies !== initialState.species || 
                    selectedCharacterType !== initialState.characterType;

  if (!isOpen) return null;

  const renderFilterButtons = <T extends FilterOption>(
    options: T[],
    selectedValue: T,
    onChange: Dispatch<SetStateAction<T>>
  ) => {
    return options.map((option) => (
      <button
        key={option}
        className={`py-2 rounded-md text-sm capitalize cursor-pointer ${
          selectedValue === option
            ? 'bg-primary-100 text-primary-700' 
            : 'border border-gray-200'
        }`}
        onClick={() => onChange(option)}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="fixed md:absolute left-0 top-0 md:top-14 w-screen md:w-full h-screen md:h-auto bg-white md:border md:border-gray-100 md:rounded-lg md:shadow-lg p-8 md:p-6 z-10 grid grid-rows-[auto_1fr_auto]">
      <div className="flex items-center mb-6 md:hidden">
        <button
          onClick={() => onApplyFilters({ species: selectedSpecies, characterType: selectedCharacterType })}
          className="p-2 -ml-2"
        >
          <img src={backIcon} alt="Back" className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold flex-1 text-center mr-7">Filters</h1>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-2">Character</p>
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-2">
            {renderFilterButtons<CharacterType>(
              ['all', 'starred', 'others'],
              selectedCharacterType,
              setSelectedCharacterType
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Specie</p>
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-2">
            {renderFilterButtons<Species>(
              ['all', 'human', 'alien'],
              selectedSpecies,
              setSelectedSpecies
            )}
          </div>
        </div>
      </div>

      <button
        className={`w-full py-2 md:mt-6 rounded-lg ${
          hasChanges 
            ? 'bg-primary-600 text-white cursor-pointer' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!hasChanges}
        onClick={() => {
          onApplyFilters({
            species: selectedSpecies,
            characterType: selectedCharacterType
          });
        }}
      >
        Filter
      </button>
    </div>
  );
}

export default Filter;