// src/components/SearchBar/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <div>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      <button onClick={() => onSearch()}>Search</button>
    </div>
  );
};

export default SearchBar;
