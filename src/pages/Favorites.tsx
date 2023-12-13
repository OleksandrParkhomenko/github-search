// src/pages/Favorites/Favorites.tsx
import React from 'react';
import FavoritesList from '../components/FavoritesList/FavoritesList';
import { useFavorites } from '../context/FavoritesContext';
import styles from '../styles/common.module.css';
import Typography from '@mui/material/Typography';

const Favorites: React.FC = () => {
  const { favorites, rateFavorite, removeFavorite } = useFavorites();

  return (
    <div className={styles.container}>
      <Typography variant="h1" gutterBottom>
        Favorites
      </Typography>
      <FavoritesList favorites={favorites} onRate={rateFavorite} onRemove={removeFavorite} />
    </div>
  );
};

export default Favorites;
