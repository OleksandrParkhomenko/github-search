// src/containers/SearchContainer/SearchContainer.tsx
import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import useSearchContainer from './useSearchContainer';

const SearchContainer: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults, loading, error, handleSearch } = useSearchContainer({
    onSearch: (query, repositories) => {
      console.log(`Search query from parent component: ${query}`);
      console.log('Repositories:', repositories);
    },
  });

  return (
    <div>
      <SearchBar onSearch={handleSearch} value={searchQuery} onChange={setSearchQuery} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default SearchContainer;
