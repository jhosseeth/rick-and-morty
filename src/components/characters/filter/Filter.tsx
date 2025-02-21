import { useState, Dispatch, SetStateAction } from 'react';
import {
  CharacterType,
  FilterOption,
  Species
} from '../../../types/character';

interface FilterProps {
  isOpen: boolean;
  onApplyFilters: (filters: { species: Species; characterType: CharacterType }) => void;
}

function Filter({ isOpen, onApplyFilters }: FilterProps) {
  const [selectedCharacterType, setSelectedCharacterType] = useState<CharacterType>('all');
  const [selectedSpecies, setSelectedSpecies] = useState<Species>('all');

  if (!isOpen) return null;

  const renderFilterButtons = <T extends FilterOption>(
    options: T[],
    selectedValue: T,
    onChange: Dispatch<SetStateAction<T>>
  ) => {
    return options.map((option) => (
      <button
        key={option}
        className={`px-4 py-2 rounded-md text-sm capitalize ${
          selectedValue === option
            ? 'bg-gray-100' 
            : 'border border-gray-200'
        }`}
        onClick={() => onChange(option)}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-lg p-4 z-10">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-2">Character</p>
          <div className="flex gap-2">
            {renderFilterButtons<CharacterType>(
              ['all', 'starred', 'others'],
              selectedCharacterType,
              setSelectedCharacterType
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Specie</p>
          <div className="flex gap-2">
            {renderFilterButtons<Species>(
              ['all', 'human', 'alien'],
              selectedSpecies,
              setSelectedSpecies
            )}
          </div>
        </div>

        <button
          className="w-full py-3 bg-gray-300 text-white rounded-lg cursor-pointer"
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
    </div>
  );
}

export default Filter;