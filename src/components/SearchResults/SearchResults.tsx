// src/components/SearchResults/SearchResults.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { IGitHubRepository } from 'models/IGitHubRepository';
import RepositoryList from 'components/RepositoryList/RepositoryList';
import styles from 'styles/SearchResults.module.css';

interface SearchResultsProps {
  repositories: IGitHubRepository[];
  loading: boolean;
  called: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}
const SearchResults: React.FC<SearchResultsProps> = ({ repositories, loading, called, hasMore, onLoadMore }) => {
  return (
    <div>
      {repositories.length > 0 && (
        <>
          <Typography variant="h5" className={styles.resultsTitle}>
            Search Results
          </Typography>
          <RepositoryList repositories={repositories}/>
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
      {called && !loading && repositories.length === 0 && (
        <Alert severity="info" className={styles.alertContainer}>
          No results found.
        </Alert>
      )}
    </div>
  );
};

export default SearchResults;
