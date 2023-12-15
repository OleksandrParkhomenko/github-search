// src/containers/SearchContainer/SearchContainer.tsx
import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import useSearch from '../../hooks/useSearch';

const SearchContainer: React.FC = () => {
  const { searchQuery, setSearchQuery, repositories, loading, hasMore, onLoadMore } = useSearch();

  return (
    <div>
      <SearchBar value={searchQuery} onChange={setSearchQuery} loading={loading} />
      <SearchResults loading={loading} repositories={repositories} hasMore={hasMore} onLoadMore={onLoadMore} />
    </div>
  );
};

export default SearchContainer;
