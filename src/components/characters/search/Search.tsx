interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

function Search({ value, onChange }: SearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search or filter results"
        className="w-full p-3 pl-10 rounded-lg bg-gray-100 border border-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}

export default Search;