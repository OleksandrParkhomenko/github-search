// src/context/FavoritesContext.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { IFavoriteGitHubRepository } from '../models/IFavoriteGitHubRepository';
import { IGitHubRepository } from '../models/IGitHubRepository';

interface FavoritesContextProps {
  favorites: IFavoriteGitHubRepository[];
  addFavorite: (repository: IGitHubRepository) => void;
  removeFavorite: (id: string) => void;
  rateFavorite: (id: string, rating: number) => void;
  isFavorite: (id: string) => boolean;
  repositoryRating: (id: string) => number;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<IFavoriteGitHubRepository[]>(
    () => {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
  );

  const addFavorite = (repository: IGitHubRepository) => {
    setFavorites((prevFavorites) => [...prevFavorites, { ...repository, rating: 0 }]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
  };

  const rateFavorite = (id: string, rating: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((fav) => (fav.id === id ? { ...fav, rating } : fav))
    );
  };

  const isFavorite = (repositoryId: string) => {
    return favorites.some((favorite) => favorite.id === repositoryId);
  }

  const repositoryRating = (repositoryId: string) => {
    return favorites.find((favorite) => favorite.id === repositoryId)?.rating || 0;
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, rateFavorite, isFavorite, repositoryRating }}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export { FavoritesProvider, useFavorites };
