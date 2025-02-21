import { useState } from 'react';
import { CharacterType, Species } from '../../../types/character';
import filterIcon from '../../../assets/icons/filter.svg';
import searchIcon from '../../../assets/icons/search.svg';
import Filter from '../filter/Filter';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onApplyFilters: (filters: { species: Species; characterType: CharacterType }) => void;
}

function Search({ value, onChange, onApplyFilters }: SearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search or filter results"
        className="w-full p-3 px-10 rounded-lg bg-gray-100 border border-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <img 
          src={searchIcon} 
          alt="Search" 
          className="w-5 h-5"
        />
      </div>
      <button
        className="absolute right-3 bottom-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <img 
          src={filterIcon} 
          alt="Filter" 
          className="w-5 h-5"
        />
      </button>
      <Filter 
        isOpen={isFilterOpen} 
        onApplyFilters={(filters) => {
          onApplyFilters(filters);
          setIsFilterOpen(false);
        }} 
      />
    </div>
  );
}

export default Search;