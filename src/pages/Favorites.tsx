// src/pages/Favorites/Favorites.tsx
import React from 'react';
import RepositoryList from '../components/RepositoryList/RepositoryList';
import { useFavorites } from '../context/FavoritesContext';
import styles from '../styles/common.module.css';
import Typography from '@mui/material/Typography';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.container}>
      <Typography variant="h1" gutterBottom>
        Favorites
      </Typography>
      <RepositoryList repositories={favorites} />
    </div>
  );
};

export default Favorites;
