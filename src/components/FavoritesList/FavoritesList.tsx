// src/components/FavoritesList/FavoritesList.tsx
import React from 'react';
import { IFavoriteGitHubRepository } from '../../models/IFavoriteGitHubRepository';
import RepositoryListItem from '../RepositoryListItem/RepositoryListItem';

interface FavoritesListProps {
  favorites: IFavoriteGitHubRepository[];
  onRate: (id: string, rating: number) => void;
  onRemove: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRate, onRemove }) => {
  return (
    <div>
      {favorites.map((favorite) => (
        <RepositoryListItem key={favorite.id} repository={favorite} isFavorite={true} />
      ))}
    </div>
  );
};

export default FavoritesList;
