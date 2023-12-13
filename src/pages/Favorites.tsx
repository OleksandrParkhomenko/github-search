// src/pages/Favorites/Favorites.tsx
import React from 'react';
import FavoritesList from '../components/FavoritesList/FavoritesList';
import { useFavorites } from '../context/FavoritesContext';

const Favorites: React.FC = () => {
  const { favorites, rateFavorite, removeFavorite } = useFavorites();

  return (
    <div>
      <FavoritesList favorites={favorites} onRate={rateFavorite} onRemove={removeFavorite} />
    </div>
  );
};

export default Favorites;
