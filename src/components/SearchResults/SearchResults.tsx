// src/components/SearchResults/SearchResults.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { IGitHubRepository } from '../../models/IGitHubRepository';
import { useFavorites } from '../../context/FavoritesContext';
import RepositoryListItem from '../RepositoryListItem/RepositoryListItem';
import styles from '../../styles/SearchResults.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

interface SearchResultsProps {
  searchResults: IGitHubRepository[];
  loading: boolean;
  error: Error | undefined;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, loading, error }) => {
  return (
    <div>
      {error && <Alert severity="error" className={styles.alertContainer}>Error: {error.message}</Alert>}
      {searchResults.length > 0 && <>
        <Typography variant="h5" className={styles.resultsTitle}>
          Search Results
        </Typography>
        {searchResults.map((repository) => (
          <RepositoryListItem key={repository.id} repository={repository} />
        ))}
      </>}
      {!loading && searchResults.length === 0 && 
        <Alert severity="info" className={styles.alertContainer}>
          No results found.
        </Alert>}
    </div>
  );
};

export default SearchResults;
