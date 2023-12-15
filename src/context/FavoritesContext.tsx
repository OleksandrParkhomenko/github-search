// src/context/FavoritesContext.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

import { IFavoriteGitHubRepository } from 'models/IFavoriteGitHubRepository';
import { IGitHubRepository } from 'models/IGitHubRepository';

interface FavoritesContextProps {
  favorites: IFavoriteGitHubRepository[];
  toggleFavorite: (repository: IGitHubRepository) => void;
  rateFavorite: (id: string, rating: number) => void;
  getRating: (id: string) => number;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<IFavoriteGitHubRepository[]>(
    () => {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
  );

  const isFavorite = (id: string) => favorites.some((favorite) => favorite.id === id);

  const toggleFavorite = (repository: IGitHubRepository) => {
    if (isFavorite(repository.id)) {
      removeFavorite(repository.id);
    } else {
      addFavorite(repository);
    }
  };

  const addFavorite = (repository: IGitHubRepository) => {
    setFavorites((prevFavorites) => [{ ...repository, rating: 0 }, ...prevFavorites]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.id !== id));
  };

  const rateFavorite = (id: string, rating: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((favorite) => (favorite.id === id ? { ...favorite, rating } : favorite))
    );
  };

  const getRating = (id: string) => favorites.find((favorite) => favorite.id === id)?.rating || -1;

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, rateFavorite, getRating, toggleFavorite, isFavorite }}>
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
