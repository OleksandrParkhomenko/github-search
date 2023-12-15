// src/pages/Favorites.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { useFavorites } from 'context/FavoritesContext';
import RepositoryList from 'components/RepositoryList/RepositoryList';
import styles from 'styles/common.module.css';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.container}>
      <Typography variant="h1" gutterBottom>
        Favorites
      </Typography>
      <RepositoryList repositories={favorites} />
      {favorites.length === 0 && (
        <Alert severity="info" className={styles.alertContainer}>
          No favorites repositories yet.
        </Alert>
      )}
    </div>
  );
};

export default Favorites;
