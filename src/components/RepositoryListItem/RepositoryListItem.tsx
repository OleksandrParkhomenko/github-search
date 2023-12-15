// src/components/RepositoryListItem/RepositoryListItem.tsx
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useFavorites } from 'context/FavoritesContext';
import { IGitHubRepository } from 'models/IGitHubRepository';
import { IFavoriteGitHubRepository } from 'models/IFavoriteGitHubRepository';
import styles from 'styles/RepositoryListItem.module.css';

interface RepositoryListItemProps {
  repository: IGitHubRepository | IFavoriteGitHubRepository;
}

const RepositoryListItem: React.FC<RepositoryListItemProps> = ({
  repository,
}) => {
  const { rateFavorite, getRating, isFavorite, toggleFavorite } = useFavorites();

  const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
    if (value !== null) {
      rateFavorite(repository.id, value);
    }
  };

  return (
    <Paper className={styles.resultItem} elevation={3}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.repositoryName}>
          {repository.name}
        </Typography>
        {isFavorite(repository.id) && (
          <div className={styles.ratingContainer}>
            <Rating
              name={`rating-${repository.id}`}
              value={getRating(repository.id)}
              precision={1}
              onChange={handleRatingChange}
              icon={<StarIcon fontSize="inherit" />}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </div>
        )}
      </div>
      <Typography variant="body2" color="textSecondary" className={styles.owner}>
        Owner: {repository.owner?.login || 'Unknown'}
      </Typography>
      <Typography variant="body1" className={styles.repositoryDescription}>
        {repository.description || 'No description available.'}
      </Typography>
      <Typography variant="body1" className={styles.repositoryDescription}>
        ID: {repository.id || 'No description available.'}
      </Typography>
      <div className={styles.footer}>
        {repository.primaryLanguage && (
          <Chip
            label={repository.primaryLanguage.name}
            style={{
              backgroundColor: repository.primaryLanguage.color,
              color: 'white',
            }}
          />
        )}
      
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color={isFavorite(repository.id) ? 'error' : 'primary'}
            onClick={() => toggleFavorite(repository)}
          >
            {isFavorite(repository.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default RepositoryListItem;
