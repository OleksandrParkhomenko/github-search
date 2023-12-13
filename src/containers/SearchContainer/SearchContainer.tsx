// src/containers/SearchContainer/SearchContainer.tsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import useSearchContainer from './hooks/useSearchContainer';
import styles from '../../styles/SearchContainer.module.css';

const SearchContainer: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults, loading, error, handleSearch } = useSearchContainer({
    onSearch: (query, repositories) => {
      console.log(`Search query from parent component: ${query}`);
      console.log('Repositories:', repositories);
    },
  });

  return (
    <div>
      <SearchBar onSearch={handleSearch} value={searchQuery} onChange={setSearchQuery} loading={loading}/>
      <SearchResults loading={loading} error={error} searchResults={searchResults} />
    </div>
  );
};

export default SearchContainer;
