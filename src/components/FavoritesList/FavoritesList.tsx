// src/components/FavoritesList/FavoritesList.tsx
import React from 'react';
import { IFavoriteGitHubRepository } from '../../models/IFavoriteGitHubRepository';

interface FavoritesListProps {
  favorites: IFavoriteGitHubRepository[];
  onRate: (id: string, rating: number) => void;
  onRemove: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRate, onRemove }) => {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((favorite) => (
        <div key={favorite.id}>
          <p>{favorite.name}</p>
          <p>Rating: {favorite.rating}</p>
          <button onClick={() => onRate(favorite.id, favorite.rating + 1)}>Rate +1</button>
          <button onClick={() => onRemove(favorite.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
