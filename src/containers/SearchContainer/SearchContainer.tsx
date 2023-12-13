// src/containers/SearchContainer/SearchContainer.tsx
import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import useSearchContainer from './useSearchContainer';

const SearchContainer: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults, handleSearch } = useSearchContainer({
    onSearch: (query) => {
      console.log(`Search query from parent component: ${query}`);
    },
  });

  return (
    <div>
      <SearchBar onSearch={handleSearch} value={searchQuery} onChange={setSearchQuery} />
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default SearchContainer;
