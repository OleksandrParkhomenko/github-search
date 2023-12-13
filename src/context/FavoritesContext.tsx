// src/context/FavoritesContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface FavoritesContextProps {
  favorites: string[];
  addFavorite: (repository: string) => void;
  removeFavorite: (repository: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (repository: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, repository]);
  };

  const removeFavorite = (repository: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== repository));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
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
