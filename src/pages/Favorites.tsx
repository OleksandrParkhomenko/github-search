// src/pages/Favorites/Favorites.tsx
import React from 'react';
import RepositoryList from '../components/RepositoryList/RepositoryList';
import { useFavorites } from '../context/FavoritesContext';
import styles from '../styles/common.module.css';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

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
