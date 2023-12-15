// src/components/repositories/SearchResults.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import styles from '../../styles/SearchResults.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import RepositoryListItem from '../RepositoryListItem/RepositoryListItem';
import { IGitHubRepository } from '../../models/IGitHubRepository';

interface SearchResultsProps {
  repositories: IGitHubRepository[];
  loading: boolean;
  // called: boolean;
  // error: Error | undefined;
  hasMore: boolean;
  onLoadMore: () => void;
}
const SearchResults: React.FC<SearchResultsProps> = ({ repositories, loading, hasMore, onLoadMore }) => {
  // const { repositories, loading, called, error, hasMore, onLoadMore } = useSearch();
  return (
    <div>
      {/* {error && <Alert severity="error" className={styles.alertContainer}>Error: {error.message}</Alert>} */}
      {repositories.length > 0 && (
        <>
          <Typography variant="h5" className={styles.resultsTitle}>
            Search Results
          </Typography>
          {/* <RepositoryList repositories={repositories}/> */}
          {repositories.map((repository) => (
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
      {/* {!error && !loading && called && repositories.length === 0 && (
        <Alert severity="info" className={styles.alertContainer}>
          No results found.
        </Alert>
      )} */}
    </div>
  );
};

export default SearchResults;
