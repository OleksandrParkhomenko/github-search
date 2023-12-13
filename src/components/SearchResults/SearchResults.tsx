// src/components/SearchResults/SearchResults.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { IGitHubRepository } from '../../models/IGitHubRepository';
import RepositoryListItem from '../RepositoryListItem/RepositoryListItem';
import styles from '../../styles/SearchResults.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

interface SearchResultsProps {
  searchResults: IGitHubRepository[];
  loading: boolean;
  loaded: boolean;
  error: Error | undefined;
  hasMore: boolean;
  onLoadMore: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, loading, loaded, error, hasMore, onLoadMore }) => {
  return (
    <div>
      {error && <Alert severity="error" className={styles.alertContainer}>Error: {error.message}</Alert>}
      {searchResults.length > 0 && (
        <>
          <Typography variant="h5" className={styles.resultsTitle}>
            Search Results
          </Typography>
          {searchResults.map((repository) => (
            <RepositoryListItem key={repository.id} repository={repository} />
          ))}
          {hasMore && (
            <div className={styles.loadMoreButtonContainer}>
              <Button
                variant="outlined"
                color="primary"
                onClick={onLoadMore}
                disabled={loading}
                className={styles.loadMoreButton}
              >
                {loading && <CircularProgress size={20} color="primary" />}
                {!loading && 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
      {!error && !loading && loaded && searchResults.length === 0 && (
        <Alert severity="info" className={styles.alertContainer}>
          No results found.
        </Alert>
      )}
    </div>
  );
};

export default SearchResults;
