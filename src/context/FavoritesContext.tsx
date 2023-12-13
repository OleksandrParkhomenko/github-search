// src/context/FavoritesContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';
import { IFavoriteGitHubRepository } from '../models/IFavoriteGitHubRepository';
import { IGitHubRepository } from '../models/IGitHubRepository';

interface FavoritesContextProps {
  favorites: IFavoriteGitHubRepository[];
  addFavorite: (repository: IGitHubRepository) => void;
  removeFavorite: (id: string) => void;
  rateFavorite: (id: string, rating: number) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<IFavoriteGitHubRepository[]>([]);

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

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, rateFavorite }}>
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
