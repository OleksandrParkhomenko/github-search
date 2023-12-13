// src/containers/SearchContainer/SearchContainer.tsx
import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import useSearchContainer from './hooks/useSearchContainer';

const SearchContainer: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults, loading, error, handleSearch, hasMore, onLoadMore } = useSearchContainer();

  return (
    <div>
      <SearchBar onSearch={handleSearch} value={searchQuery} onChange={setSearchQuery} loading={loading} />
      <SearchResults loading={loading} error={error} searchResults={searchResults} hasMore={hasMore} onLoadMore={onLoadMore} />
    </div>
  );
};

export default SearchContainer;
