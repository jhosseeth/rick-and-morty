import { useState } from 'react';

type Species = 'human' | 'alien' | 'all';
type CharacterType = 'all' | 'starred' | 'others';

interface FilterProps {
  isOpen: boolean;
}

function Filter({ isOpen }: FilterProps) {
  const [selectedCharacterType, setSelectedCharacterType] = useState('all');
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  if (!isOpen) return null;

  const speciesBtn = (options: Species[]) => {
    return options.map((option) => (
      <button
        key={option}
        className={`px-4 py-2 rounded-md text-sm capitalize ${
          selectedSpecies === option
            ? 'bg-gray-100' 
            : 'border border-gray-200'
        }`}
        onClick={() => setSelectedSpecies(option)}
      >
        {option}
      </button>
    ));
  };

  const charTypesBtn = (options: CharacterType[]) => {
    return options.map((option) => (
      <button
        key={option}
        className={`px-4 py-2 rounded-md text-sm capitalize ${
          selectedCharacterType === option
            ? 'bg-gray-100' 
            : 'border border-gray-200'
        }`}
        onClick={() => setSelectedCharacterType(option)}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-lg p-4 z-10">
      <div className="space-y-6">
        {/* Character Type Filter */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Character</p>
          <div className="flex gap-2">
            {charTypesBtn(['all', 'starred', 'others'])}
          </div>
        </div>

        {/* Species Filter */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Specie</p>
          <div className="flex gap-2">
            {speciesBtn(['all', 'human', 'alien'])}
          </div>
        </div>

        {/* Filter Button */}
        <button
          className="w-full py-3 bg-gray-300 text-white rounded-lg cursor-pointer"
          onClick={() => {
            // Handle filter logic here
            console.log('Filtered by:', selectedCharacterType, selectedSpecies);
          }}
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export default Filter;