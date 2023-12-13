// src/components/RepositoryListItem/RepositoryListItem.tsx
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { IGitHubRepository } from '../../models/IGitHubRepository';
import { useFavorites } from '../../context/FavoritesContext';
import styles from '../../styles/RepositoryListItem.module.css';

interface RepositoryListItemProps {
  repository: IGitHubRepository;
}

const RepositoryListItem: React.FC<RepositoryListItemProps> = ({ repository }) => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleFavoriteToggle = () => {
    const isFavorite = isRepositoryInFavorites();
    if (isFavorite) {
      removeFavorite(repository.id);
    } else {
      addFavorite(repository);
    }
  };

  const isRepositoryInFavorites = () => {
    return favorites.some((favorite) => favorite.id === repository.id);
  };

  return (
    <Paper className={styles.resultItem} elevation={3}>
      <div className={styles.header}>
        <Typography variant="h6" className={styles.repositoryName}>
          {repository.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={styles.owner}>
          Owner: {repository.owner.login}
        </Typography>
      </div>
      <Typography variant="body1" className={styles.repositoryDescription}>
        {repository.description || 'No description available.'}
      </Typography>
      <div className={styles.footer}>
        {repository.primaryLanguage && <Chip
          label={repository.primaryLanguage.name}
          style={{ backgroundColor: repository.primaryLanguage.color, color: 'white' }}
        />}
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color={isRepositoryInFavorites() ? 'error' : 'primary'}
            onClick={handleFavoriteToggle}
          >
            {isRepositoryInFavorites() ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default RepositoryListItem;
