// src/pages/Search.tsx
import React from 'react';
import Typography from '@mui/material/Typography';

import SearchResults from 'components/SearchResults/SearchResults';
import SearchBar from 'components/SearchBar/SearchBar';
import useSearch from 'hooks/useSearch';
import styles from 'styles/common.module.css';

const Search: React.FC = () => {
  const { searchQuery, setSearchQuery, repositories, loading, hasMore, loadMore, called } = useSearch();
  
  return (
    <div className={styles.container}>
      <Typography variant="h1" gutterBottom>
        Search
      </Typography>
      <SearchBar value={searchQuery} onChange={setSearchQuery} loading={loading} />
      <SearchResults loading={loading} repositories={repositories} hasMore={hasMore} onLoadMore={loadMore} called={called} />
    </div>
  );
};

export default Search;
