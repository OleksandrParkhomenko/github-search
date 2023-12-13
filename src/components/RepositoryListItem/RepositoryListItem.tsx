// src/components/RepositoryListItem/RepositoryListItem.tsx
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IGitHubRepository } from '../../models/IGitHubRepository';
import { IFavoriteGitHubRepository } from '../../models/IFavoriteGitHubRepository';
import { useFavorites } from '../../context/FavoritesContext';
import styles from '../../styles/RepositoryListItem.module.css';

interface RepositoryListItemProps {
  repository: IGitHubRepository | IFavoriteGitHubRepository;
}

const RepositoryListItem: React.FC<RepositoryListItemProps> = ({
  repository,
}) => {
  const { addFavorite, removeFavorite, rateFavorite, isFavorite, repositoryRating } = useFavorites();
  const [rating, setRating] = useState<number>(repositoryRating(repository.id));
  const isRepositoryFavorite = isFavorite(repository.id);

  const handleRatingChange = (event: React.ChangeEvent<{}>, value: number | null) => {
    if (value !== null) {
      setRating(value);
      rateFavorite(repository.id, value);
    }
  };

  const handleFavoriteToggle = () => {
    if (isRepositoryFavorite) {
      removeFavorite(repository.id);
    } else {
      addFavorite(repository);
    }
  };

  return (
    <Paper className={styles.resultItem} elevation={3}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.repositoryName}>
          {repository.name}
        </Typography>
        {isRepositoryFavorite && (
          <div className={styles.ratingContainer}>
            <Rating
              name={`rating-${repository.id}`}
              value={rating}
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
            color={isRepositoryFavorite ? 'error' : 'primary'}
            onClick={handleFavoriteToggle}
          >
            {isRepositoryFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default RepositoryListItem;
